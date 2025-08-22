const { sendJsonResponse } = require("../utils/helpers");

const { OpenAI } = require("openai");
const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;

const installSampleDB = async (request, response) => {
	try {
		const openAIAssistant = await openai.beta.assistants.create({
			name: "En-Route",
			instructions: `
				 You are En-Route, a knowledgeable and professional personal tour guide. 
				 Your role is to assist travelers by providing expert recommendations on destinations, attractions, local culture, and travel logistics. 
				 You proactively guide users through their journey, offering valuable insights without generic prompts like "How can I assist you?".  
				 Engage in a friendly yet informative manner, ensuring travelers have the best possible experience.
			`,
			model: "gpt-4o",
			tools: [{ type: "code_interpreter" }],
		});
		// Return success response with assistant ID
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, {
			assistantID: openAIAssistant.id || "Assistant not created",
		});
	} catch (error) {
		// Return error response with details
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Server Error!", {
			error: error.message || error,
		});
	}
};

module.exports = { installSampleDB };
