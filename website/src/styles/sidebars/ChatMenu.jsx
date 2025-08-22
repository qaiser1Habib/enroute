"use client";
import { Dialog, Transition, TransitionChild, DialogPanel } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import ActionModalWithAnimatedIcon from "../modals/ActionModalWithAnimatedIcon";
import { useDeleteChatThreadMutation } from "@/actions/botChat";
import { apiErrorHandler } from "@/actions/apiErrorHandler";
import { useDispatch } from "react-redux";
import useToast from "@/store/hooks/useToast";
import clsx from "clsx";

const ChatMenu = ({
	isOpen,
	onClose,
	setDrawerOpen,
	isChatThreadsFetching,
	chatThreads,
	setMessage,
	currentActiveThread,
	setCurrentActiveThread,
}) => {
	const router = useRouter();
	const [isDeleteThreadModalOpen, setIsDeleteThreadModalOpen] = useState(false);

	const [deleteChatThread, { isLoading: isDeletingChatThread }] = useDeleteChatThreadMutation({});

	const dispatch = useDispatch();
	const { notify } = useToast();

	const handleDeleteThread = async () => {
		try {
			const response = await deleteChatThread({ chatID: currentActiveThread?._id }).unwrap();

			if (response?.httpCode === 200) {
				router.push("/chats");
				setIsDeleteThreadModalOpen(false);

				const storedChatIDs = JSON.parse(localStorage.getItem("chatIDs") || "[]");

				const updatedChatIDs = storedChatIDs.filter((id) => id !== currentActiveThread?._id);
				localStorage.setItem("chatIDs", JSON.stringify(updatedChatIDs));
			} else {
				throw response;
			}
		} catch (error) {
			dispatch(apiErrorHandler(error, notify));
		}
	};

	const handleDeleteThreadButton = (thread) => {
		router.push("/chats?chat=" + thread?._id);
		setIsDeleteThreadModalOpen(true);
	};

	const handleNewChatButton = () => {
		router.push("/chats");
		setMessage(null);
		setCurrentActiveThread(null);
		setDrawerOpen(false);
	};
	return (
		<>
			<Transition show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={onClose}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-40 w-full" />
					</TransitionChild>

					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10 h-full pt-14">
							<TransitionChild
								as={Fragment}
								enter="transform transition ease-in-out duration-500"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<DialogPanel className="pointer-events-auto w-screen max-w-sm">
									<div className="flex h-full flex-col bg-white py-3 shadow-xl">
										<div className="px-4 sm:px-6">
											<div className="flex items-center justify-end">
												<div className="ml-3 flex h-7 items-center">
													<a
														onClick={onClose}
														type="button"
														className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
													>
														<span className="sr-only">Close panel</span>
														<i className="fa-regular fa-circle-xmark text-2xl"></i>
													</a>
												</div>
											</div>
										</div>
										<div className="relative mt-5 flex-1 px-4 sm:px-6 h-full">
											<div className="h-full" style={{ opacity: 1, transform: "none" }}>
												<h2 className="text-xl font-bold px-2">Chats</h2>
												<div className="mt-4 px-2">
													<a
														onClick={() => handleNewChatButton()}
														className="bg-secondary hover:bg-success transition duration-200 px-8 2x:px-16 py-2 rounded-lg text-white text-base 2x:text-lg font-medium flex justify-center items-center cursor-pointer"
													>
														New Chat <i className="bi bi-plus-circle ms-2 mb-1 text-base" />
													</a>
												</div>
												<div className="mt-10 flex flex-col h-full">
													<h2 className="text-xl font-bold mb-5 px-2">History</h2>
													<div className="h-[70%] overflow-y-auto scrollbar-webkit scrollbar-thin px-2">
														{isChatThreadsFetching ? (
															<div className="flex items-center gap-4">
																<p>Searching For Recent Chats</p>
																<svg className="animate-spin h-5 w-5 mr-3 bg-primary" viewBox="0 0 24 24"></svg>
															</div>
														) : (
															<ul className="space-y-5 mb-16 lg:mb-0">
																{chatThreads?.length > 0 ? (
																	chatThreads.map((thread, index) => (
																		<li
																			onClick={() => {
																				router.push(`/chats?chat=${thread?._id}`);
																				setDrawerOpen(false);
																			}}
																			key={index}
																			className={clsx(
																				"bg-[#F6F6F6] transition duration-200 hover:bg-white rounded-md 2xl:rounded-lg shadow-md ps-3 flex justify-between",
																				thread?._id === currentActiveThread?._id &&
																					"bg-white"
																			)}
																		>
																			<a className="py-2 cursor-pointer text-sm 2xl:text-base font-normal flex items-center w-[90%] lg:w-[80%]">
																				<i className="bi bi-chat-left-text me-2 flex-shrink-0" />
																				<span className="truncate w-full">
																					{thread?.title?.replace(/"/g, "")}
																				</span>
																			</a>
																			<a
																				onClick={() => handleDeleteThreadButton(thread)}
																				title="Delete"
																				className="bg-[#BCBBBB]  hover:bg-success rounded-r-md 2xl:rounded-r-lg px-2 2xl:px-4 flex justify-center items-center text-white cursor-pointer"
																			>
																				<i className="fa-solid fa-trash-can" />
																			</a>
																		</li>
																	))
																) : (
																	<>No Recent Chats</>
																)}
															</ul>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>

			<ActionModalWithAnimatedIcon
				icon={isDeletingChatThread ? "processing" : "delete"}
				title={isDeletingChatThread ? "Deleting" : "Delete"}
				heading={isDeletingChatThread ? "Deleting Chat" : "Delete Chat"}
				alert={
					isDeletingChatThread
						? "Please wait for the process to complete. Do not refresh or close the browser."
						: "Deleting this is a permanent action and can not be recovered."
				}
				isOpen={isDeleteThreadModalOpen}
				setIsOpen={setIsDeleteThreadModalOpen}
				isSubmittingRequest={isDeletingChatThread}
				handleDelete={handleDeleteThread}
			/>
		</>
	);
};

export default ChatMenu;
