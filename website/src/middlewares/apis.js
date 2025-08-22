import { getToken } from "./auth";
import axiosHandler from "./axiosHandler";

let defaultHeaders = {};
let multipartHeaders = {};

async function refreshAuthToken() {
	const authToken = await getToken();

	defaultHeaders = { Authorization: `Bearer ${authToken}`, "ngrok-skip-browser-warning": "69420" };
	multipartHeaders = { ...defaultHeaders, "Content-Type": "multipart/form-data" };
}

const apiMethods = {
	get: async (endpoint, formData) => {
		await refreshAuthToken();
		return axiosHandler.get(endpoint, { params: formData, headers: defaultHeaders });
	},
	post: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.post(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	put: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.put(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	patch: async (endpoint, formData, isMultipart = false, uploadProgress) => {
		await refreshAuthToken();
		return axiosHandler.patch(endpoint, formData, {
			headers: isMultipart ? multipartHeaders : defaultHeaders,
			onUploadProgress: uploadProgress,
		});
	},
	delete: async (endpoint, formData) => {
		await refreshAuthToken();
		return axiosHandler.delete(endpoint, { params: formData, headers: defaultHeaders });
	},
};

// RTK query APIs
export const axiosRtkBaseQuery = async ({ url, method = "get", body, params, headers = false, uploadProgress }) => {
	try {
		const response = await apiMethods[method](url, body || params, headers, uploadProgress);
		return { data: response };
	} catch (error) {
		return {
			error: {
				status: error?.httpCode || 500,
				data: error?.payload || [],
				message: error?.message || "An unexpected error occurred.",
			},
		};
	}
};

// Users APIs
export const getUsers = (formData) => apiMethods.get("/v1/users", formData);
export const registerUser = (formData) => apiMethods.post("/v1/users", formData, true);
export const loginUser = (formData) => apiMethods.post("/v1/users/login", formData);
export const updateUser = (formData) => apiMethods.put("/v1/users", formData, true);
export const updatePassword = (formData) => apiMethods.post("/v1/users/password", formData);
export const sendPasswordResetEmail = (formData) => apiMethods.post("/v1/users/send-password-reset-email", formData);
export const resetPassword = (formData) => apiMethods.patch("/v1/users/password", formData);
export const sendUserVerificationEmail = (formData) => apiMethods.get("/v1/users/verify/email", formData);
export const verifyUserEmailByOTP = (formData) => apiMethods.post("/v1/users/verify/otp", formData);
export const submitContactRequest = (formData) => apiMethods.post("/v1/guests/contact/request", formData);
export const submitNewsLetterRequest = (formData) => apiMethods.post("/v1/guests/news-letter/request", formData);

// chats reports APIs
export const generateChatReport = (formData) => apiMethods.get("/v1/chats-reports", formData);
export const deleteChatReport = (formData) => apiMethods.delete("/v1/chats-reports", formData);

// client APIs
export const createClientByTherapist = (formData) => apiMethods.post("/v1/clients", formData);
export const addToClients = (formData) => apiMethods.post("/v1/clients/add-client", formData);
export const removeClientByTherapist = (formData) => apiMethods.delete("/v1/clients", formData);

// Subscriptions APIs
export const getSubscriptions = (formData) => apiMethods.get("/v1/subscriptions", formData);
export const getSubscriptionFeatures = (formData) => apiMethods.get("/v1/subscriptions/features", formData);

// Questions APIs
export const getQuestions = (formData) => apiMethods.get("/v1/questions", formData);

// Payment Apis
export const getPaymentCheckoutSession = (formData) => apiMethods.get("/v1/payments/session", formData);
export const cancelSubscriptionPlan = (formData) => apiMethods.delete("/v1/payments/subscription", formData);

// services APIs
export const getServices = (formData) => apiMethods.get("/v1/services", formData);
export const createService = (formData) => apiMethods.post("/v1/services", formData);
export const updateService = (formData) => apiMethods.put("/v1/services", formData);
export const deleteService = (formData) => apiMethods.delete("/v1/services", formData);

// Therapist Availability APIs
export const getSlots = (formData) => apiMethods.get("/v1/therapist-availability", formData);
export const createSlot = (formData) => apiMethods.post("/v1/therapist-availability", formData);
export const updateSlot = (formData) => apiMethods.put("/v1/therapist-availability", formData);
export const deleteSlot = (formData) => apiMethods.delete("/v1/therapist-availability", formData);

// User Goals APIs
export const createGoal = (formData) => apiMethods.post("/v1/goals/set-goal", formData);
export const updateGoal = (formData) => apiMethods.put("/v1/goals/update-goal", formData);
export const deleteGoal = (formData) => apiMethods.delete("/v1/goals/delete-goal", formData);

// User Report APIs
export const createReport = (formData) => apiMethods.post("/v1/reports", formData);
export const updateReport = (formData) => apiMethods.put("/v1/reports", formData);
export const deleteReport = (formData) => apiMethods.delete("/v1/reports", formData);

// track Mood Report API
export const createUpdateMoodEntry = (formData) => apiMethods.post("/v1/track-mood", formData);

// Reviews Report API
export const createTherapistReview = (formData) => apiMethods.post("/v1/reviews/therapist-review", formData);
export const updateTherapistReview = (formData) => apiMethods.put("/v1/reviews/therapist-review", formData);
export const deleteTherapistReview = (formData) => apiMethods.delete("/v1/reviews/therapist-review", formData);
