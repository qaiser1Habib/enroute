import BreadCrumb from "@/views/partials/BreadCrumb";

const page = () => {
	return (
		<>
			<BreadCrumb title="Terms of Service" />
			<div className="w-full xl:container py-16 px-3 sm:px-8 2xl:px-0 animate-fadeIn">
				<div className="w-full space-y-8">
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">En Route Terms of Service</p>
						<p className="text-base font-medium text-[#595959]">Effective Date: 10th February 2025</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">1. Acceptance of Terms</p>
						<p className="text-base font-medium text-[#595959]">
							By accessing and using En Route, the AI-powered travel tool, you agree to these Terms of Service ("TOS"),
							forming a binding agreement between you and A Small Enterprise Ltd ("ASE"), the parent company of En Route.
							These terms also apply to any related policies and additional terms.
						</p>
						<p className="text-base font-medium text-[#595959]">
							If any provisions within these TOS contradict other ASE policies, the TOS will control. By accepting these
							terms, you confirm that you have reached the age of majority in your jurisdiction or have obtained approval
							from your legal representative to use En Route.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">2. Definitions</p>
						<ul className="list-disc ml-6 mb-4 text-base font-medium text-[#595959] space-y-3">
							<li>
								<span className="text-black font-bold">En Route:</span> The AI-powered travel assistant provided by ASE.
							</li>
							<li>
								<span className="text-black font-bold">User:</span> Any individual or entity interacting with En Route.
							</li>
							<li>
								<span className="text-black font-bold">Data:</span> Information provided by users or collected during
								their interaction with En Route.
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">3. User Conduct and Content</p>
						<p className="text-base font-medium text-[#595959]">
							Users must engage with En Route in a respectful and lawful manner. Prohibited conduct includes harassment,
							spreading harmful software, committing fraudulent activities, or distributing illegal content. Users are
							responsible for the accuracy and legality of the content they provide.{" "}
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">4. Third-Party Links and Services</p>
						<p className="text-base font-medium text-[#595959]">
							En Route integrates with third-party services, such as Booking.com, GetYourGuide, and other travel platforms.
							ASE disclaims responsibility for the practices, policies, or content of these third-party services.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">5. Data Collection and Log Files</p>{" "}
						<li>
							<span className="text-black font-bold">Collection Methods:</span> ASE uses tools like Google Analytics and
							other similar technologies to track usage, including IP addresses, to analyze user interactions with En
							Route.
						</li>
						<li>
							<span className="text-black font-bold">Purpose and Use:</span> Any individual or entity interacting with En
							Route.
						</li>
						<li>
							<span className="text-black font-bold">Privacy Compliance:</span> Information provided by users or collected
							during their interaction with En Route.
						</li>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">6. Updates and Modifications to TOS</p>
						<p className="text-base font-medium text-[#595959]">
							ASE reserves the right to update these TOS. Users will be notified of significant changes. Continued use of
							En Route after any changes constitutes acceptance of the revised TOS.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">7. End-User License Agreement (EULA)</p>
						<p className="text-base font-medium text-[#595959]">
							Users are granted a limited, non-exclusive, non-transferable license to access and use En Route under these
							TOS. This license does not extend to En Route’s underlying technology or intellectual property.{" "}
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">8. Feedback and Suggestions</p>
						<p className="text-base font-medium text-[#595959]">
							ASE values user feedback, but retains the right to determine how such feedback is used. Feedback submitted
							becomes the property of ASE, with no obligation to the user.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">9. Termination of Use</p>
						<p className="text-base font-medium text-[#595959]">
							ASE may restrict or terminate access to En Route for violations of these TOS. Users may discontinue use of En
							Route at any time.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">10. Limitation of Liability</p>
						<p className="text-base font-medium text-[#595959]">
							ASE's liability in connection with En Route is limited to the extent permissible by law. ASE is not liable
							for indirect damages or issues arising from third-party integrations.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">11. Governing Law and Dispute Resolution</p>
						<li>
							<span className="text-black font-bold">Governing:</span> These TOS are governed by the laws of the United
							Kingdom.
						</li>
						<li>
							<span className="text-black font-bold">Dispute Resolution:</span> Disputes arising from these TOS will be
							resolved through arbitration in the UK, except for matters relating to data privacy and retention, which may
							fall under the jurisdiction of the user's location.
						</li>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">12. Data Privacy and Retention Compliance</p>
						<p className="text-base font-medium text-[#595959]">
							ASE adheres to applicable data privacy laws and retains user data only for as long as necessary to fulfill
							the purposes of this agreement. Users have rights under applicable privacy laws regarding their data.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">13. Contact Information</p>
						<p className="text-base text-black font-bold">En Route</p>
						<p className="text-base font-medium text-[#595959]">
							A Small Enterprise Ltd <br />1 Kingsbury Mews, Windsor, Berkshire, SL4 5GS <br />
							<span className="text-black font-bold">Email:</span> info@enroute2.co
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">14. Accessibility and Inclusivity</p>
						<p className="text-base font-medium text-[#595959]">
							ASE is committed to making En Route accessible to all users in accordance with recognized accessibility
							standards.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">15. Additional Provisions</p>
						<p className="text-base font-medium text-[#595959]">
							These TOS represent the entire agreement between the User and ASE. If any provision of these TOS is deemed
							unenforceable, the remaining provisions will remain in effect. ASE may transfer its rights and obligations
							under these TOS to another entity.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">16. No Contractual Agreements</p>
						<p className="text-base font-medium text-[#595959]">
							En Route is an AI tool and not a natural person or entity with legal authority to enter into binding
							agreements. ASE makes no representations regarding the accuracy of information provided by En Route. En Route
							cannot bind any other person or entity to any contractual terms, other than those outlined in this TOS and
							related policies.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
