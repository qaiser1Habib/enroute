//  import { LottieIcon } from "../icons/LottieIcon";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import ModalButton from "../buttons/ModalButton";
 

const ActionModalWithAnimatedIcon = (props) => {
	return (
		<Transition.Root show={props?.isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={() => props?.setIsOpen(true)}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity" />
				</Transition.Child>
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel
								className={clsx(
									"relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left transition-all w-auto sm:max-w-lg",
									props?.dark && "dark:bg-dark-400"
								)}
							>
								{/* <div className="flex w-full items-center justify-between border-b py-4">
									<h4 className="text-base sm:text-xl font-bold">{props?.title}</h4>
									<button
										type="button"
										className={clsx(
											"text-gray-400 hover:text-gray-500",
											props?.dark && "dark:hover:text-white transition duration-200",
										)}
										onClick={props?.isOpen}>
										<span className="sr-only">Close</span>
										<i className="fa fa-times me-2 text-lg"></i>
									</button>
								</div> */}
								<div className="py-8 px-2 sm:px-4 space-y-8 max-h-[500px] overflow-y-auto scrollbar-webkit">
									<div className="flex flex-col items-center mb-2">
										<div className="flex flex-col w-full items-center justify-center">
											<div className="w-48">
												{/* <LottieIcon iconType={props?.icon} /> */}
											</div>
											<h3 className="text-3xl font-bold">{props?.heading}</h3>
										</div>
										<label className="font-medium text-lg">{props?.description}</label>
									</div>

									{props?.alert && (
										<div className="flex w-full border border-yellow-200 bg-yellow-200 rounded-lg p-4 items-start gap-4">
											<i className="fa fa-info text-2xl" />
											<p>{props?.alert}</p>
										</div>
									)}
								</div>
								<div className="mt-5 sm:mt-4 flex border-t pt-4 justify-between">
									<ModalButton disabled={props?.isSubmittingRequest} secondary onClick={() => props?.setIsOpen(false)}>
										Close
									</ModalButton>
									{props?.handleSubmit && (
										<ModalButton primary onClick={props.handleSubmit} disabled={props?.isSubmittingRequest}>
											{props?.title}
										</ModalButton>
									)}
									{props?.handleDelete && (
										<ModalButton danger onClick={props.handleDelete} disabled={props?.isSubmittingRequest}>
											<p className="text-white">{props?.title}</p>
										</ModalButton>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default ActionModalWithAnimatedIcon;
