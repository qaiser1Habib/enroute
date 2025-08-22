"use client";
import { useEffect, useRef } from "react";

const ChatForm = ({ handleSendMessage, message, setMessage }) => {
	const textareaRef = useRef(null);

	useEffect(() => {
		const textarea = textareaRef.current;
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
		if (textarea.scrollHeight > 200) {
			textarea.style.overflowY = "auto";
			textarea.style.height = "200px";
		} else {
			textarea.style.overflowY = "hidden";
		}
	}, [message]);

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (message) {
				handleSendMessage(e);
			}
		}
	};
	return (
		<form
			onSubmit={handleSendMessage}
			className="py-1 px-4 bg-white dark:bg-dark-400 dark:border dark:border-gray-500 flex items-center gap-2 lg:gap-4 w-full shadow-md rounded-xl mt-5 border"
		>
			<textarea
				name="message"
				value={message || ""}
				ref={textareaRef}
				placeholder="Ask anything, the more you share the better i can help..."
				onChange={(e) => setMessage(e?.target?.value)}
				onKeyDown={handleKeyPress}
				className="w-full py-3 text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-300 dark:text-white dark:bg-dark-400 focus:outline-none sm:text-base sm:leading-6"
				rows={1}
				style={{ resize: "none" }}
				dir="auto"
				tabIndex={0}
			></textarea>
			<button type="submit" className="text-gray-500 hover:text-secondary dark:text-white cursor-pointer me-2" title="Send">
				<i className="fa-solid fa-paper-plane text-xl"></i>
			</button>
		</form>
	);
};

export default ChatForm;
