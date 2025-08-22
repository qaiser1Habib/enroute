export async function sendMessageInThread(payload, setChatMessages, setIsSendingMessage) {
	const response = await fetch(process.env.VITE_APP_API_URL + "/v1/bot-chats/message", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			messageID: payload?.messages?.[payload?.messages?.length - 1]?._id,
		}),
	});
	if (!response?.body) {
		return;
	}
	const reader = response.body.getReader();
	let done = false;
	setIsSendingMessage(false);
	while (!done) {
		const { value, done: streamDone } = await reader.read();
		done = streamDone;

		if (value) {
			const chunk = new TextDecoder("utf-8").decode(value);

			setChatMessages((prevMessages) => {
				const updatedMessages = [...prevMessages];
				const lastMessageIndex = updatedMessages.length - 1;

				if (lastMessageIndex >= 0) {
					updatedMessages[lastMessageIndex] = {
						...updatedMessages[lastMessageIndex],
						reply: (updatedMessages[lastMessageIndex].reply || "") + chunk,
					};
				}

				return updatedMessages;
			});
		}
	}
}
