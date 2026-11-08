// Draft wording copied from the Figma design; bracketed items still need legal confirmation before launch.
// A string is a paragraph; a string[] is a bullet list.
export type LegalBlock = string | string[];
export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalDoc = {
  slug: "privacy" | "terms" | "refund";
  name: string;
  heading: string;
  intro: string;
  sections: LegalSection[];
};

export const SUPPORT_EMAIL = "info@chopbaze.com";

const privacy: LegalDoc = {
  slug: "privacy",
  name: "Privacy Policy",
  heading: "Your information. Handled with care.",
  intro:
    "From your first browse to your next bulk food order, your privacy matters. Here is how information supports your Chopbaze experience, who it may be shared with and the choices available to you.",
  sections: [
    {
      title: "About this policy",
      blocks: [
        "Chopbaze is a bulk food ordering platform connecting offices, event planners and caterers with authentic Nigerian cuisine. This policy explains how personal information is handled when you browse our website, use the app, place an order, become a vendor or contact support.",
        "The organisation responsible for your information is [Legal entity name and business address — to be confirmed]. The final notice should identify its privacy contact and explain which services and users it covers.",
      ],
    },
    {
      title: "Information we collect",
      blocks: [
        "We collect information you provide and information needed to operate the service. The final policy must reflect the data actually collected by the website, app and vendor tools. This may include:",
        [
          "Account and contact details, such as your name, email address, phone number and organisation.",
          "Order details, delivery addresses, recipient instructions, food preferences and correspondence with support. Share another person’s details only when you are authorised to do so.",
          "Payment confirmations, transaction references and technical information such as device type, IP address and service activity. [Confirm payment provider and card-data handling.]",
        ],
      ],
    },
    {
      title: "How we use your information",
      blocks: [
        "We use relevant information to create and manage accounts, process bulk food orders, coordinate vendors and deliveries, confirm payments, respond to complaints and improve the service. We may also use it to detect misuse, secure accounts and meet applicable record-keeping obligations.",
        "Where required, promotional messages and optional tracking should rely on your consent. [Confirm the lawful basis for each purpose under applicable data protection law before publication.]",
      ],
    },
    {
      title: "When information is shared",
      blocks: [
        "Order information may be shared with the vendor preparing your food and delivery partners fulfilling your order. They should receive only the details needed for that task. Service providers may support payments, hosting, communications, analytics and customer support.",
        "Information may also be disclosed where required by law or to address fraud and safety concerns. [Confirm provider categories, any advertising arrangements and safeguards in vendor and service-provider agreements.]",
      ],
    },
    {
      title: "Cookies and your preferences",
      blocks: [
        "Our website and app may use cookies or similar technologies to keep you signed in, remember preferences and understand how the service is used. [Insert the actual cookie and SDK list, purposes, providers and expiry periods.]",
        "Where consent is required, optional technologies should remain off until you choose them. You can manage available choices through [Cookie settings location] and your browser or device settings. Disabling essential storage may affect some features.",
      ],
    },
    {
      title: "Retention and security",
      blocks: [
        "Personal information should be retained only as long as necessary for the purpose it was collected, including order support, accounting, legal obligations and resolving disputes. [Insert verified retention periods or criteria by data category.]",
        "Appropriate technical and organisational measures should protect information against unauthorised access, loss or misuse. No online service is completely risk-free. Keep your sign-in details private and tell support if you suspect unauthorised account activity.",
      ],
    },
    {
      title: "Your privacy choices and rights",
      blocks: [
        "Depending on applicable law, you may be able to access, correct or delete your personal information, object to or restrict certain processing, request portability, or withdraw consent. Some records may need to be kept for legal reasons.",
        `Send a request through Contact Us or ${SUPPORT_EMAIL}. We may need to verify your identity before acting. [Confirm request procedure and applicable response periods.] You may also complain to [Relevant data protection authority and contact details].`,
      ],
    },
    {
      title: "International processing",
      blocks: [
        "Service providers may process information outside the country where you use Chopbaze. [Confirm processing locations, any cross-border transfers and the safeguards required by applicable law.] The final notice should explain how to obtain information about those safeguards.",
      ],
    },
    {
      title: "Children and sensitive information",
      blocks: [
        "This service is intended for people able to place orders under applicable law. [Confirm minimum account age and any parental consent process.] If a child has provided information without appropriate permission, contact us so the matter can be reviewed.",
        "Avoid sharing unnecessary sensitive information in delivery notes or support messages. Dietary or allergy information can reveal health details; provide only what is necessary and confirm food suitability directly with the vendor.",
      ],
    },
    {
      title: "Updates to this policy",
      blocks: [
        "We may update this policy as the service or legal requirements change. The current version and effective date will appear on this page. Where required, material changes should be communicated before they take effect. [Confirm the notification method and final effective date.]",
      ],
    },
  ],
};

const terms: LegalDoc = {
  slug: "terms",
  name: "Terms of Service",
  heading: "Clear terms for every Chopbazer.",
  intro:
    "These terms set out how to use Chopbaze, what to check before placing a bulk food order and where to turn for support. Please read them carefully before using the service.",
  sections: [
    {
      title: "About these terms",
      blocks: [
        "These draft terms cover access to Chopbaze’s website and app and the use of its bulk food ordering services. Chopbaze connects offices, event planners and caterers with food vendors offering authentic Nigerian cuisine. Read these terms alongside the Privacy Policy, Refund Policy and the details shown for your order.",
        "The operator is [Legal entity name and registered address — to be confirmed]. [Confirm whether the operator acts as a marketplace, agent or food seller and identify the contracting party for each service.] Do not publish these terms until those roles are clear.",
      ],
    },
    {
      title: "Accounts and eligibility",
      blocks: [
        "You must be legally able to enter into the relevant agreement and provide accurate account and contact details. [Confirm minimum age and eligibility requirements.] If you order for a company or event, you must have permission to act for that organisation or customer.",
        "Keep your sign-in details secure and do not share verification codes. Tell support promptly if you suspect unauthorised use. You are responsible for information and instructions you submit, subject to applicable law and the circumstances of any account misuse.",
      ],
    },
    {
      title: "Orders, prices and payment",
      blocks: [
        "Review the menu, quantities, delivery address, requested date, total price and any fees before paying. Prices, availability and order requirements may vary by vendor. Any applicable taxes, minimum quantities, delivery fees or service charges should be disclosed before you confirm an order.",
        "Submitting an order is a request for fulfilment. [Confirm the point of acceptance, payment authorisation process and treatment of unavailable items or pricing errors.] An order confirmation should set out what has been accepted. Substitutions or material changes should be communicated for your agreement where required.",
      ],
    },
    {
      title: "Food information and allergies",
      blocks: [
        "Menu descriptions, portions, ingredients and allergen details should be checked before ordering. Images may be illustrative. If you have an allergy or dietary requirement, contact the vendor through the available support channel before placing the order; do not assume that a preference note guarantees suitability.",
        "Food may be prepared in kitchens handling multiple allergens. [Confirm vendor allergen obligations and how dietary requests are verified.] Follow any storage, reheating and consumption instructions supplied with your food, especially for bulk or event catering.",
      ],
    },
    {
      title: "Delivery and collection",
      blocks: [
        "Provide complete delivery details, a reachable contact and any access instructions. Arrange for an authorised person to receive a bulk delivery and check it on arrival. Delivery availability and estimates should be shown during ordering; delays can arise from preparation, traffic or other events.",
        "Report missing items, damage, non-delivery or a significant delay through support. [Confirm delivery responsibilities, proof of delivery, failed-delivery arrangements and any disclosed charges.] An estimate does not remove any rights you have where food is not delivered as agreed.",
      ],
    },
    {
      title: "Cancellations and refunds",
      blocks: [
        "Cancellation and change requests depend on order status, preparation and any terms disclosed before payment. Bulk and scheduled orders may require advance preparation, so contact support promptly. Do not assume a cancellation has been accepted until you receive confirmation.",
        "Read the Refund Policy for reporting an issue, the review process and possible resolutions. No refund processing timeline is guaranteed by this draft. Any order-specific conditions must be clear before purchase and must not override rights that cannot lawfully be excluded.",
      ],
    },
    {
      title: "Acceptable use and content",
      blocks: [
        "Use the service lawfully and respectfully. Do not place fraudulent orders, misuse promotions, interfere with the website or app, access another person’s account, or submit abusive, misleading or unlawful material. Reviews and other submissions should be relevant and reflect a genuine experience.",
        "Chopbaze’s branding, software and site content, and material owned by vendors or other licensors, remain the property of their respective owners. [Confirm permitted use and any licence needed to display user submissions.] These terms do not transfer ownership of that material to you.",
      ],
    },
    {
      title: "Availability and account restrictions",
      blocks: [
        "Features may be updated, interrupted for maintenance or unavailable in some locations. Where reasonably possible, important service changes should be communicated. We may restrict an account where necessary to address suspected fraud, security risks or serious misuse, subject to applicable law.",
        "[Confirm notice, review and account-closure procedures.] Restrictions should not remove valid claims relating to an existing order. Contact support if you believe a restriction was applied in error or need help with an outstanding order.",
      ],
    },
    {
      title: "Responsibility and disputes",
      blocks: [
        "The final terms must explain the responsibilities of Chopbaze, vendors and delivery partners, including who supplies food and handles fulfilment. Nothing here excludes liability or consumer protections that cannot be excluded under applicable law. [Insert legally reviewed liability wording consistent with the actual service model.]",
        "Raise a complaint with support first so the issue can be reviewed. [Confirm escalation process, governing law and competent courts or other dispute-resolution route.] No jurisdiction or mandatory dispute procedure is specified in this draft.",
      ],
    },
    {
      title: "Changes and contacting us",
      blocks: [
        "The current terms should be available on this page with a confirmed effective date. Material changes should be notified as required by law, with their effect on existing orders clearly explained. [Confirm notice method and how acceptance of updated terms will be obtained where needed.]",
        `For questions about these terms or an order, use Contact Us or email ${SUPPORT_EMAIL}. Any separate agreement with a business customer or vendor should clearly explain how it relates to these terms.`,
      ],
    },
  ],
};

const refund: LegalDoc = {
  slug: "refund",
  name: "Refund Policy",
  heading: "An order issue? Let's make it clear.",
  intro:
    "We want every Chopbazer to know what to do when an order does not go as expected. This policy outlines how to report a problem and how cancellation and refund requests are reviewed.",
  sections: [
    {
      title: "About this policy",
      blocks: [
        "This draft explains how to raise an issue with bulk food products, payments or delivery services ordered through Chopbaze. It covers requests for cancellation, replacement, credit or refund, subject to the circumstances of the order and applicable consumer rights.",
        "The service operator is [Legal entity name — to be confirmed]. Any order-specific cancellation terms should be clearly shown before payment. Nothing in this policy is intended to remove rights that cannot lawfully be excluded.",
      ],
    },
    {
      title: "If something is wrong with an order",
      blocks: [
        "Contact us as soon as you notice a problem so we can review it with the vendor or delivery partner. Do not consume food that appears unsafe. Keep packaging and relevant evidence where safe, but do not return perishable food unless support gives appropriate instructions.",
        [
          "Missing or incorrect items: tell us which items and quantities differ from your order confirmation.",
          "Damaged, spoiled or unsafe food: describe the issue and include clear photos where available.",
          "Non-delivery or a significant delay: share your order reference, scheduled delivery details and any messages from the delivery partner.",
        ],
      ],
    },
    {
      title: "Cancellations and order changes",
      blocks: [
        "Bulk orders may involve ingredients purchased and food prepared specifically for you. Whether an order can be changed or cancelled depends on its status, the vendor’s preparation stage and any terms disclosed at checkout. A request is not confirmed until support has acknowledged the outcome.",
        "[Confirm cancellation cut-off, any disclosed charges and how scheduled or event orders are handled.] If preparation or dispatch has begun, a change-of-mind refund may not be available, except where required by law.",
      ],
    },
    {
      title: "How to submit a request",
      blocks: [
        `Use the Contact Us form or email ${SUPPORT_EMAIL}. Explain what happened and the resolution you are requesting. If you are reporting an issue for an office, event or catering order, identify the person authorised to discuss it.`,
        [
          "Include your order reference, the name used for the order and the affected items or quantities.",
          "Attach relevant photos, delivery details and a payment reference if the issue concerns a charge.",
          "Do not send full card numbers, passwords or one-time payment codes. [Confirm the reporting window for each issue type, subject to applicable rights.]",
        ],
      ],
    },
    {
      title: "Review and possible resolutions",
      blocks: [
        "Support will review the order record and information you provide, and may contact the vendor, delivery partner or payment provider. We may ask for additional details that are reasonably needed to understand the issue.",
        "Depending on the findings and applicable law, an appropriate resolution may be a replacement, a refund for affected items, a partial refund or another agreed remedy. Any proposed credit should be explained before you accept it. An unaffected part of an order may be treated separately.",
      ],
    },
    {
      title: "When a refund may not apply",
      blocks: [
        "A change of preference after correctly prepared food has been supplied may not qualify for a refund. The same may apply to issues caused by incorrect delivery details, an unavailable recipient, or food stored or handled incorrectly after delivery, subject to the facts and applicable law.",
        "These examples do not automatically decide a request. Food that is faulty, misdescribed or not supplied as agreed should still be reported for review. [Confirm treatment of delivery fees, service charges, promotions and any non-refundable amounts disclosed before payment.]",
      ],
    },
    {
      title: "Payments and refund processing",
      blocks: [
        "If a refund is approved, we will communicate the amount, the payment route and the expected processing steps. Where supported, it should return to the original payment method; any alternative should be explained and agreed where required.",
        "The time a refund takes to appear can depend on the payment provider and your bank. [Insert verified processing guidance after approval; no guaranteed timeline is set in this draft.] For duplicate or failed-payment charges, share the transaction references so the payment can be traced.",
      ],
    },
    {
      title: "Follow-up and policy changes",
      blocks: [
        "If you disagree with a decision or a refund has not appeared, reply to the support conversation with your order reference and explain what remains unresolved. [Confirm the escalation contact and complaint-review process.] This does not limit any rights to seek a remedy available under applicable law.",
        "Updates to this policy will be shown here with a confirmed effective date. The terms disclosed when an order was placed and applicable consumer protections should guide how that order is handled.",
      ],
    },
  ],
};

export const LEGAL_DOCS = { privacy, terms, refund };
