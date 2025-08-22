"use client";
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
	const [message, setMessage] = useState(null);
	const [chatThreadsData, setChatThreadsData] = useState([]);
	const [currentActiveThread, setCurrentActiveThread] = useState(null);
	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const [isAnyNewChatCreated, setIsAnyNewChatCreated] = useState(false);
	const [messageIDToGenerateResponse, setMessageIDToGenerateResponse] = useState(null);
	const [chatMessages, setChatMessages] = useState([]);
	const [storedChatIDs, setStoredChatIDs] = useState([]);

	return (
		<LayoutContext.Provider
			value={{
				chatThreadsData,
				setChatThreadsData,
				message,
				setMessage,
				currentActiveThread,
				setCurrentActiveThread,
				isSendingMessage,
				setIsSendingMessage,
				isAnyNewChatCreated,
				setIsAnyNewChatCreated,
				messageIDToGenerateResponse,
				setMessageIDToGenerateResponse,
				chatMessages,
				setChatMessages,
				storedChatIDs,
				setStoredChatIDs,
			}}
		>
			{children}
		</LayoutContext.Provider>
	);
};

export const useLayoutData = () => useContext(LayoutContext);
