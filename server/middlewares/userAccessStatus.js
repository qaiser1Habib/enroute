const subscriptions = require("../models/subscriptions.js");
const users = require("../models/users.js");
const { sendJsonResponse } = require("../utils/helpers.js");

exports.userAccessStatus = () => {
	return async (request, response, next) => {
		const { userRole, userID } = request.jwtPayload;

		if (userRole === "photographer") {
			const userDBPayload = users?.findOne({ userID: userID }).populate("subscription.subscriptionPlanID");

			if (userDBPayload?._id) {
				if (userDBPayload?.subscription?.subscriptionPlanID) {
					const subscriptionDBPayload = subscriptions?.findOne({ _id: userDBPayload?.subscription?.subscriptionPlanID });
					if (subscriptionDBPayload?.type === "paid") {
						if (new Date(userDBPayload?.subscription?.expiryDate) > new Date()) {
							if (
								(userDBPayload?.subscription?.paymentStatus === "paid" && userDBPayload?.subscription?.isActive) ||
								userDBPayload?.subscription?.isActiveByAdmin
							) {
								next();
							} else {
								return sendJsonResponse(
									response,
									HTTP_STATUS_CODES.NOT_ACCEPTABLE,
									false,
									"Subscription InActive!",
									null,
								);
							}
						} else {
							return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_ACCEPTABLE, false, "Subscription Expired!", null);
						}
					} else if (subscriptionDBPayload?.type === "free") {
						next();
					} else {
						return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_ACCEPTABLE, false, "Invalid Subscription!", null);
					}
				} else {
					return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "Subscription Not Found!", null);
				}
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "No UserID in JWT Payload!", null);
			}
		} else {
			next();
		}
	};
};
