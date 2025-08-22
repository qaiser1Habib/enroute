import BreadCrumb from "@/views/partials/BreadCrumb";

const page = () => {
	return (
		<>
			<BreadCrumb title="Privacy Policy" />
			<div className="w-full xl:container py-16 px-3 sm:px-8 2xl:px-0 animate-fadeIn">
				<div className="w-full space-y-8">
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">Privacy Policy for En Route</p>
						<p className="text-base font-medium text-[#595959] ">Effective Date: 10th February 2025</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">1. Introduction</p>
						<p className="text-base font-medium text-[#595959]">
							Welcome to En Route, a service provided by A Small Enterprise Ltd ("we", "our", or "us"), a company based in
							the United Kingdom. This Privacy Policy explains how we collect, use, and protect your personal information
							when you use our website (the "Site") and services.{" "}
						</p>
						<p className="text-base font-medium text-[#595959]">
							By accessing or using the Site, you agree to the collection and use of your personal data as outlined in this
							Privacy Policy. If you do not agree with any part of this Privacy Policy, please do not use our Site.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">2. Information We Collect</p>
						<p className="text-base font-medium text-[#595959]">We may collect the following types of information:</p>
						<ul className="list-disc ml-6 mb-4 text-base font-medium text-[#595959] space-y-3">
							<li>
								<span className="text-black font-bold">Personal Information:</span> Name, email address, phone number, and
								other contact details when you register, sign up, or interact with our services.
							</li>
							<li>
								<span className="text-black font-bold">Usage Data:</span> Information about how you access and use our
								Site, such as IP addresses, browser types, pages viewed, and actions taken.
							</li>
							<li>
								<span className="text-black font-bold">Cookies and Tracking Technologies:</span> We use cookies to track
								your activity on our Site and enhance user experience. You can modify your cookie settings at any time
								through your browser settings.
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">3. How We Use Your Information</p>
						<p className="text-base font-medium text-[#595959]">
							We use the information we collect for the following purposes:
						</p>
						<ul className="list-disc ml-6 mb-4 text-base font-medium text-[#595959] space-y-3">
							<li>To provide and improve our services.</li>
							<li>To communicate with you, including sending updates and promotional materials (if you have consented)</li>
							<li>To respond to your inquiries and support requests</li>
							<li>To analyze usage patterns and improve the functionality of our Site</li>
							<li>To comply with legal obligations under UK law</li>
						</ul>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">4. Legal Basis for Processing Personal Data</p>
						<p className="text-base font-medium text-[#595959]">
							We implement security measures to protect your information from unauthorized access, alteration, or
							disclosure. However, no method of transmission over the internet is 100% secure.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">Third Party Links</p>
						<p className="text-base font-medium text-[#595959]">
							We process your personal data under the following legal grounds:
						</p>
						<ul className="list-disc ml-6 mb-4 text-base font-medium text-[#595959] space-y-3">
							<li>
								<span className="text-black font-bold">Consent:</span> Where you have provided explicit consent to process
								your data (e.g., signing up for newsletters).
							</li>
							<li>
								<span className="text-black font-bold">Contractual Necessity:</span> To fulfil contracts with you, such as
								providing services or processing bookings.
							</li>
							<li>
								<span className="text-black font-bold">Legitimate Interests:</span> To improve our services, prevent
								fraud, and ensure the security of our Site.
							</li>
							<li>
								<span className="text-black font-bold">Legal Obligation:</span> To comply with UK laws and regulations.
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">5. Sharing Your Information</p>
						<p className="text-base font-medium text-[#595959]">
							We do not sell, rent, or lease your personal information to third parties. However, we may share your data
							with trusted third parties in the following circumstances:
						</p>
						<li>
							With service providers who assist us in running our business (e.g., payment processors, marketing services).
						</li>
						<li>When required by law, such as to comply with a legal obligation or protect our rights. </li>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">6. Data Security</p>
						<p className="text-base font-medium text-[#595959]">
							We take the security of your personal information seriously and implement appropriate technical and
							organizational measures to protect it from unauthorized access, alteration, or destruction. However, no data
							transmission over the internet is completely secure, and we cannot guarantee the absolute security of your
							information.{" "}
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">7. Your Rights</p>
						<p className="text-base font-medium text-[#595959]">
							As a resident of the UK, you have certain rights regarding your personal data, including:
						</p>
						<li>The right to access your personal data. </li>
						<li>The right to request corrections to any inaccurate or incomplete data.</li>
						<li>The right to request the deletion of your data (subject to certain limitations).</li>
						<li>The right to object to or restrict processing of your data.</li>
						<li>The right to withdraw consent, where applicable.</li>
						<p className="text-base font-medium text-[#595959]">
							To exercise any of these rights, please contact us at info@enroute2.co.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">8. Retention of Data</p>
						<p className="text-base font-medium text-[#595959]">
							We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy
							Policy, including for legal, accounting, or reporting requirements.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">9. International Transfers</p>
						<p className="text-base font-medium text-[#595959]">
							If you are located outside the UK, please note that your data may be transferred to and stored in the UK or
							other countries. We take steps to ensure your data is protected, including using appropriate safeguards as
							required by applicable law.
						</p>
					</div>

					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">10. Changes to this Privacy Policy</p>
						<p className="text-base font-medium text-[#595959]">
							We may update this Privacy Policy from time to time. When we make changes, we will update the "Effective
							Date" at the top of this policy. We encourage you to review this Privacy Policy periodically to stay informed
							about how we are protecting your information.
						</p>
					</div>
					<div className="space-y-3">
						<p className="text-base sm:text-xl font-bold text-black">11. Contact Us</p>
						<p className="text-base font-medium text-[#595959]">
							If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your rights,
							please contact us at:
						</p>
						<p className="text-base text-black font-bold">En Route</p>
						<p className="text-base font-medium text-[#595959]">
							A Small Enterprise Ltd <br />1 Kingsbury Mews, Windsor, Berkshire, SL4 5GS <br />
							<span className="text-black font-bold">Email:</span> info@enroute2.co
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
