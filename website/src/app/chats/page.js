"use client";
import { useCreateChatThreadMutation, useGetChatThreadsQuery } from "@/actions/botChat";
import useToast from "@/store/hooks/useToast";
import ChatForm from "@/styles/forms/ChatForm";
import ChatMenu from "@/styles/sidebars/ChatMenu";
import ChatSlider from "@/styles/sliders/ChatSlider";
import Text from "@/styles/text/Text";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { convertToDate } from "@/utils/helpers";
import { apiErrorHandler } from "@/actions/apiErrorHandler";
import { sendMessageInThread } from "@/actions/chatMessage";
import { useRouter } from "next/navigation";
import ScrollToBottom from "react-scroll-to-bottom";

const Chats = () => {
	const [currentActiveThread, setCurrentActiveThread] = useState(null);
	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState(null);
	const [isAnyNewChatCreated, setIsAnyNewChatCreated] = useState(false);
	const [messageIDToGenerateResponse, setMessageIDToGenerateResponse] = useState(null);
	const [isSendingMessage, setIsSendingMessage] = useState(false);

	const dispatch = useDispatch();
	const { notify } = useToast();
	const router = useRouter();

	const searchParams = useSearchParams();
	const chatIDFromURL = searchParams.get("chat");
	const prompt = searchParams.get("prompt") ? JSON.parse(searchParams.get("prompt")) : null;
	const query = searchParams.get("query") ? JSON.parse(searchParams.get("query")) : null;

	let chatIDs = null;

	if (typeof window !== "undefined") {
		chatIDs = JSON.parse(localStorage.getItem("chatIDs") || "[]");
	}

	const [createChatThread, { isLoading: isCreatingThread }] = useCreateChatThreadMutation({});

	const {
		data: chatThreads,
		isLoading: isChatThreadsFetching,
		refetch: refetchChats,
	} = useGetChatThreadsQuery(chatIDs?.length > 0 ? chatIDs : [], {
		skip: chatIDs?.length === 0,
	});

	useEffect((e) => {
		if (prompt) {
			handleSendMessage(e, prompt);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (query) {
			setMessage(query);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (chatThreads?.length) {
			if (chatIDFromURL) {
				setCurrentActiveThread(chatThreads.find((chatThread) => chatThread?._id === chatIDFromURL));
			} else setCurrentActiveThread(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatIDFromURL, chatThreads]);

	useEffect(() => {
		if (isAnyNewChatCreated && chatThreads?.length) {
			router.push(`/chats?chat=${chatThreads[0]?._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAnyNewChatCreated, chatThreads]);

	useEffect(() => {
		if (currentActiveThread?._id && chatThreads?.length) {
			setChatMessages(chatThreads.find((chatThread) => chatThread?._id === currentActiveThread?._id)?.messages);
		} else {
			setChatMessages([]);
		}
	}, [chatThreads, currentActiveThread]);

	const handleSendMessage = async (e, prompt) => {
		e?.preventDefault();
		try {
			setIsSendingMessage(true);
			const response = await createChatThread({
				message: prompt ? prompt : message,
				thread: currentActiveThread?.thread,
			}).unwrap();
			const { payload } = response;

			if (response?.httpCode !== 200) throw response;

			if (payload) {
				setMessage(null);
				if (!currentActiveThread?._id) setIsAnyNewChatCreated(true);

				setMessageIDToGenerateResponse(payload?.messages?.[payload?.messages?.length - 1]?._id);

				let chatIDs = JSON.parse(localStorage.getItem("chatIDs")) || [];

				if (payload?._id && !chatIDs.includes(payload._id)) {
					chatIDs.push(payload._id);
					localStorage.setItem("chatIDs", JSON.stringify(chatIDs));
				}

				await sendMessageInThread(payload, setChatMessages, setIsSendingMessage).then(() => {
					refetchChats();
				});
			}
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	};

	return (
		<section className="w-full h-full sm:h-[calc(100vh-62px)] animate-fadeIn">
			<div className="grid lg:grid-cols-2 w-full h-full">
				<div className="w-full h-full px-3 sm:ps-8 sm:pe-4 py-4">
					<ChatSideBar
						isChatThreadsFetching={isChatThreadsFetching}
						currentActiveThread={currentActiveThread}
						chatThreads={chatThreads}
						setMessage={setMessage}
						setCurrentActiveThread={setCurrentActiveThread}
					/>
					<div className="w-full h-full sm:h-[calc(100vh-150px)] overflow-hidden flex items-center">
						{currentActiveThread?._id && chatMessages?.length > 0 ? (
							<div className="w-full h-full pt-2 lg:py-6 lg:flex flex-col transition-all duration-300">
								<div className="h-[calc(100vh-200px)] sm:h-[calc(100%-80px)]">
									<ScrollToBottom className="h-full overflow-y-auto px-2 space-y-5 chat-scrollbar-webkit scrollbar-thin">
										{chatMessages?.length > 0 &&
											chatMessages?.map((message) => (
												<div className="w-full" key={message?._id}>
													<div className="flex justify-end mb-5 mr-3">
														<div className="max-w-2xl py-2 px-3 bg-[#F1F1F1] dark:bg-dark-300 dark:border dark:border-gray-500 rounded-t-xl rounded-bl-xl">
															<h3 className="text-lg font-bold text-secondary dark:text-white my-2">You</h3>
															<p className="text-base text-normal mb-2">{message?.message}</p>
															<time className="text-sm font-medium t">
																{convertToDate(message?.createdAt, "hh:mm a")}
															</time>
														</div>
													</div>

													{isSendingMessage && messageIDToGenerateResponse === message?._id ? (
														<div className="flex me-3">
															<div className="w-2/3 max-w-2xl py-2 px-3 bg-[#F1F1F1] dark:bg-dark-300 dark:border dark:border-gray-500 rounded-t-xl rounded-br-xl">
																<h3 className="text-lg font-bold text-secondary dark:text-white my-2">
																	En Route
																</h3>

																<div className="flex items-start justify-start animate-pulse dark:border dark:border-gray-500 gap-1 rounded-2xl w-full">
																	<div className="rounded-md w-full mx-auto">
																		<div className="animate-pulse flex space-x-4">
																			<div className="flex-1 space-y-6 py-1">
																				<div className="h-2 bg-slate-200 rounded"></div>
																				<div className="space-y-5">
																					<div className="grid grid-cols-3 gap-4">
																						<div className="h-2 bg-slate-200 rounded col-span-1"></div>
																						<div className="h-2 bg-slate-200 rounded col-span-2"></div>
																					</div>
																					<div className="h-2 w-12 bg-slate-200 rounded"></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													) : (
														<div className="flex me-3 mb-5">
															<div className="max-w-2xl py-2 px-3 bg-[#E3E2E2] dark:bg-dark-400 dark:border dark:border-gray-500  rounded-t-xl rounded-br-xl">
																<h3 className="text-lg font-bold text-secondary dark:text-white my-2">
																	En Route
																</h3>
																<ReactMarkdown>{message?.reply}</ReactMarkdown>

																<time className="text-sm font-medium">
																	{convertToDate(message?.createdAt, "hh:mm a")}
																</time>
															</div>
														</div>
													)}
												</div>
											))}
									</ScrollToBottom>
								</div>
								{isCreatingThread ? (
									<div className="py-3 px-4 bg-white dark:bg-dark-400 dark:border dark:border-gray-500 flex items-center gap-2 lg:gap-4 w-full shadow-md rounded-xl mt-5 sm:mt-10 border">
										<p className="text-md tracking-tighter text-success">Creating Chat</p>
									</div>
								) : (
									<ChatForm message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
								)}
							</div>
						) : (
							<div className="w-full">
								<h4 className="font-medium text-[34px]">
									Hi there
									<div>
										What would <span className="text-success">like to know?</span>
									</div>
								</h4>
								<Text bold={false}>
									<span className="text-[#8C8C8C]">
										Use one of the most common prompts below or use your own to begin
									</span>
								</Text>
								<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
									<a
										onClick={(e) => handleSendMessage(e, "Create a new Trip")}
										className="border rounded-md p-2 cursor-pointer"
									>
										<Text bold={false}>
											<span className="text-[#8C8C8C]">Create a new Trip</span>
										</Text>
										<div className="mt-4">
											<i className="bi bi-chat-text-fill text-secondary"></i>
										</div>
									</a>
									<a
										onClick={(e) => handleSendMessage(e, "Find family hotels")}
										className="border rounded-md p-2 cursor-pointer"
									>
										<Text bold={false}>
											<span className="text-[#8C8C8C]">Find family hotels</span>
										</Text>
										<div className="mt-4">
											<i className="bi bi-chat-text-fill text-secondary "></i>
										</div>
									</a>
									<a
										onClick={(e) => handleSendMessage(e, "Build 7 day island hopping")}
										className="border rounded-md p-2 cursor-pointer"
									>
										<Text bold={false}>
											<span className="text-[#8C8C8C]">Build 7 day island hopping</span>
										</Text>
										<div className="mt-4">
											<i className="bi bi-chat-text-fill text-secondary"></i>
										</div>
									</a>
									<a
										onClick={(e) => handleSendMessage(e, "Inspire me where to go")}
										className="border rounded-md p-2 cursor-pointer"
									>
										<Text bold={false}>
											<span className="text-[#8C8C8C]">Inspire me where to go</span>
										</Text>
										<div className="mt-4">
											<i className="bi bi-chat-text-fill text-secondary "></i>
										</div>
									</a>
								</div>
								{isCreatingThread ? (
									<div className="py-3 px-4 bg-white dark:bg-dark-400 dark:border dark:border-gray-500 flex items-center gap-2 lg:gap-4 w-full shadow-md rounded-xl mt-5 sm:mt-10 border">
										<p className="text-md tracking-tighter text-success">Creating Chat</p>
									</div>
								) : (
									<ChatForm message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
								)}
							</div>
						)}
					</div>
					<div className="hidden md:block w-full text-center">
						<p className="text-[12px] sm:text-[14px] font-light">
							Copyright © {new Date().getFullYear().toString() + " "}
							<span className="hover:text-secondary transition-all duration-200 font-medium cursor-pointer">
								EN ROUTE.
							</span>
						</p>
					</div>
				</div>
				<div className="relative w-full h-full hidden lg:block">
					<ChatSlider />
				</div>
			</div>
		</section>
	);
};

const ChatSideBar = ({ isChatThreadsFetching, chatThreads, setMessage, currentActiveThread, setCurrentActiveThread }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<>
			<ChatMenu
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				setDrawerOpen={setDrawerOpen}
				isChatThreadsFetching={isChatThreadsFetching}
				chatThreads={chatThreads}
				setMessage={setMessage}
				currentActiveThread={currentActiveThread}
				setCurrentActiveThread={setCurrentActiveThread}
			/>
			<a
				onClick={() => setDrawerOpen((prev) => !prev)}
				className="w-fit bg-secondary hover:bg-success dark:bg-[#2F63BA] dark:hover:bg-[#1E53AC] transition duration-200 px-4 py-2 rounded-lg text-white text-base 2x:text-lg font-medium flex justify-center items-center cursor-pointer"
			>
				New Chat <i className="bi bi-layout-sidebar ms-2 text-base"></i>
			</a>
		</>
	);
};

export default Chats;
