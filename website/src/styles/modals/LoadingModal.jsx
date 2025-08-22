"use client";
import { Fragment } from "react";
import { Dialog, Transition, DialogPanel, TransitionChild } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
	return (
		<div className="relative">
			<Transition show as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={() => {}}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-100" />
					</TransitionChild>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<DialogPanel>
								<ClipLoader size={40} color="#00B0D7" />
							</DialogPanel>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default LoadingModal;
