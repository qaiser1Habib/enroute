require("dotenv").config({ path: __dirname + "../../.env" }); //get secret keys from env files
const mongoose = require("mongoose");
const moment = require("moment");
const users = require("../../models/users");
const subscriptions = require("../../models/subscriptions");
const { sendEmail } = require("../helpers");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// connect database
mongoose
	.connect(process.env.MONGO_DB_CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.info(`-> Database connected::success\t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n\n`);
		await getUserSubscriptionStatusAndExpiry();
	})
	.catch((error) => {
		console.error("Database connection error:", error);
		process.exit(1);
	});

const getUserSubscriptionStatusAndExpiry = async () => {
	try {
		const dbUsers = await users.find({ userRole: "photographer" }).lean();
		console.info("Total Users Found -> " + dbUsers?.length);

		if (dbUsers?.length > 0) {
			for (let user of dbUsers) {
				console.info(
					`->User Found With subscription\t->${user?.subscription?.paymentID} \t-> ${moment().format(
						"YYYY-MM-D, HH:mm:ss",
					)}\n`,
				);

				if (user?.subscription?.paymentID) {
					const stripeSubscriptionStatus = await stripe.subscriptions.retrieve(user.subscription.paymentID);

					const currentDate = new Date();
					// let currentDate = new Date();
					// currentDate.setFullYear(currentDate.getFullYear() + 1);
					// currentDate.setDate(currentDate.getDate() + 1);
					const expiryDateFromStripe = new Date(stripeSubscriptionStatus?.current_period_end * 1000);
					const expiryDateFromDB = new Date(user.subscription.expiryDate);

					const timeDifference = expiryDateFromStripe.getTime() - currentDate.getTime();
					const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days and round up

					console.info(
						`->Days Remaining For Expiry\t->${
							daysRemaining > 1 ? `${daysRemaining} Days` : `${daysRemaining} Day`
						} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
					);

					if (daysRemaining > 0) {
						// Update the expiry date in the database if the Stripe expiry date is later
						if (expiryDateFromStripe > expiryDateFromDB) {
							await users.findOneAndUpdate(
								{ _id: user?._id },
								{ $set: { "subscription.expiryDate": expiryDateFromStripe } },
								{ new: true },
							);

							console.info(
								`->Updated expiry date for user:${user?.email.slice(0, 5)}...${user?.email.slice(
									-5,
								)} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
							);
						}

						if ([14, 7, 2].includes(daysRemaining)) {
							console.info(
								`->Sending Reminder To\t->${user?.email.slice(0, 5)}...${user?.email.slice(-5)} \t-> ${moment().format(
									"YYYY-MM-D, HH:mm:ss",
								)}\n`,
							);

							const emailReplacements = {
								user: `${user?.firstName} ${user?.lastName}`,
								subject: `PicFan Subscription Expiry Reminder`,
								description: `You have ${
									daysRemaining > 1 ? `${daysRemaining} Days` : `${daysRemaining} Day`
								} left for your subscription. Subscription will expire on ${moment(expiryDateFromStripe).format(
									"MMM DD, yyyy",
								)}`,
							};

							console.info(
								`->Sending Email:\t->${emailReplacements?.description} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
							);

							const emailPayload = await sendEmail(user?.email, emailReplacements, "generalInfo.html");

							if (emailPayload?.accepted?.[0]) {
								console.info(
									`-> Reminder sent to email:${emailPayload?.accepted?.[0].slice(
										0,
										5,
									)}...${emailPayload?.accepted?.[0].slice(-5)}\t-> Fetched-at: ${moment().format(
										"YYYY-MM-D, HH:mm:ss",
									)}\n`,
								);
							} else {
								console.info(
									`-> Reminder failed to email:${user?.email.slice(0, 5)}...${user?.email.slice(
										-5,
									)}\t-> Fetched-at: ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
								);
							}
						}
					} else if (daysRemaining < -7) {
						const freeSubscription = subscriptions.findOne({ type: "free" });

						// Cancel the subscription if the Stripe expiry date is earlier
						await users.findOneAndUpdate(
							{ _id: user?._id },
							{
								$set: {
									"subscription.subscriptionPlanID": freeSubscription?._id,
									"subscription.activationDate": null,
									"subscription.expiryDate": null,
									"subscription.isActive": true,
									"subscription.paymentID": null,
									"subscription.paymentStatus": null,
									"subscription.paymentType": null,
									"subscription.cancelation.status": true,
									"subscription.cancelation.date": Date.now(),
									"subscription.cancelation.reason": "Subscription is Cancelled By cron due to expiration.",
								},
							},
							{ fields: { password: 0 }, new: true },
						);

						console.info(
							`->Cancelled subscription for user:${user?.email.slice(0, 5)}...${user?.email.slice(
								-5,
							)} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
						);

						// Send email notification about subscription cancellation
						const emailReplacements = {
							user: `${user?.firstName} ${user?.lastName}`,
							subject: `PicFan Subscription Cancellation`,
							description: `Your subscription has been cancelled due to expiration. You have been now converted to free member`,
						};

						console.info(
							`->Sending Email:\t->${emailReplacements?.description} \t-> ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
						);

						const emailPayload = await sendEmail(user?.email, emailReplacements, "generalInfo.html");

						if (emailPayload?.accepted?.[0]) {
							console.info(
								`-> Cancellation email sent to:${emailPayload?.accepted?.[0].slice(
									0,
									5,
								)}...${emailPayload?.accepted?.[0].slice(-5)}\t-> Fetched-at: ${moment().format(
									"YYYY-MM-D, HH:mm:ss",
								)}\n`,
							);
						} else {
							console.info(
								`-> Cancellation email failed to:${user?.email.slice(0, 5)}...${user?.email.slice(
									-5,
								)}\t-> Fetched-at: ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
							);
						}
					}
				} else {
					console.info(
						`-> Skipping user as no payment id found:${user?.email.slice(0, 5)}...${user?.email.slice(
							-5,
						)}\t-> Fetched-at: ${moment().format("YYYY-MM-D, HH:mm:ss")}\n`,
					);
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
