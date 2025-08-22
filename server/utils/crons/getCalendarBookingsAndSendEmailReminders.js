require("dotenv").config({ path: __dirname + "../../.env" }); //get secret keys from env files
const mongoose = require("mongoose");
const moment = require("moment");
const users = require("../../models/users");
const eventBookings = require("../../models/eventBookings");
const { sendEmail } = require("../helpers");

// connect database
mongoose
	.connect(process.env.MONGO_DB_CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.info(`-> Database connected::success\t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n\n`);

		await getCalendarBookingsAndSendEmailReminders();
	})
	.catch((error) => {
		console.error("Database connection error:", error);
		process.exit(1);
	});

const getCalendarBookingsAndSendEmailReminders = async () => {
	try {
		const dbEventBookings = await eventBookings.find({ "schedule.date": { $gte: new Date() } }).lean();
		console.info("Total Event Bookings -> " + dbEventBookings?.length);

		if (dbEventBookings?.length) {
			for (let eventBooking of dbEventBookings) {
				const user = await users.findOne({ _id: eventBooking?.userID });

				console.info(`->User Found With Email\t->${user?.email} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`);

				const eventDate = new Date(eventBooking?.schedule?.date);
				const currentDate = new Date();
				const timeDifference = eventDate.getTime() - currentDate.getTime();
				const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days and round up

				console.info(
					`->Days Remaining For Current Booking\t->${
						daysRemaining > 1 ? `${daysRemaining} Days` : "1 Day"
					} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
				);

				if ([7, 3, 1].includes(daysRemaining)) {
					console.info(
						`->Sending Reminder To\t->${user?.email.slice(0, 5)}...${user?.email.slice(-5)} \t-> ${moment().format(
							"YYYY-MM-D, HH:mm:ss",
						)}\n`,
					);

					const emailReplacements = {
						subject: `PicFan Calendar Booking Reminder`,
						user: `${user?.firstName} ${user?.lastName}`,
						description: `You have ${daysRemaining > 1 ? `${daysRemaining} Days` : "1 Day"} left for your booking.`,
						client: eventBooking?.client?.name,
						bookingDate: moment(eventBooking?.schedule?.startTime).format("YYYY-MM-D"),
						startTime: moment(eventBooking?.schedule?.startTime).format("HH:mm:ss"), // Format start time
						endTime: moment(eventBooking?.schedule?.endTime).format("HH:mm:ss"), // Format end time
						totalSessionTime: moment
							.duration(moment(eventBooking?.schedule?.endTime).diff(moment(eventBooking?.schedule?.startTime)))
							.asHours(), // Calculate session time in hours
						totalCost: eventBooking?.eventBudget,
						totalPeople: eventBooking?.totalPeople,
						shootLocation: eventBooking?.location,
						bookingDescription: eventBooking?.description,
					};

					console.info(
						`->Sending Email:\t->${emailReplacements?.description} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
					);

					const emailPayload = await sendEmail(user?.email, emailReplacements, "bookingReminder.html");

					if (emailPayload?.accepted?.[0]) {
						console.info(
							`-> Reminder sent to email:${emailPayload?.accepted?.[0].slice(0, 5)}...${emailPayload?.accepted?.[0].slice(
								-5,
							)}\t-> Fetched-at: ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
						);
					} else {
						console.info(
							`-> Reminder failed to email:${user?.email.slice(0, 5)}...${user?.email.slice(
								-5,
							)}\t-> Fetched-at: ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
						);
					}
				}
			}
		} else {
			console.info(`->No Bookings Found To Send Reminder\t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`);
		}

		// Close MongoDB connection
		await mongoose.connection.close();
		process.exit(0);
	} catch (error) {
		console.error("An error occurred:", error);
		await mongoose.connection.close();
		process.exit(1);
	}
};
