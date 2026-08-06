import {
  Globe,
  Phone,
  MessageSquareText,
  PhoneMissed,
  Star,
  CalendarCheck,
  Inbox,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* BOOKING                                                             */
/* ------------------------------------------------------------------ */

// Google Calendar Appointment Schedule — update here if the link ever changes.
export const BOOKING_URL = "https://calendar.app.google/4KWk6hrffNyhHPZu9";

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  deliverables: string[];
  timeline: string;
}

export const services: Service[] = [
  {
    slug: "website-ai-chatbot",
    title: "Website + AI Chatbot",
    short: "A fast, modern site with an AI assistant built in that answers and books 24/7.",
    description:
      "We build a fast, mobile-friendly site and put an AI assistant on it that actually knows your business — answering questions about hours, services, and pricing, capturing leads, and booking appointments around the clock. It only answers from information you give us, and hands off to you for anything it can't answer accurately.",
    icon: Globe,
    bullets: [
      "Modern, mobile-friendly site that loads fast",
      "AI chatbot grounded strictly in your real business info",
      "Captures name and contact before the visitor leaves",
      "Books appointments or routes to you automatically",
      "Analytics and conversion tracking built in",
    ],
    deliverables: ["Production website", "Configured AI assistant", "Analytics dashboard", "Handover docs"],
    timeline: "2–4 weeks",
  },
  {
    slug: "ai-phone-assistant",
    title: "AI Phone Assistant",
    short: "Answers when you can't — takes messages and books appointments, even after hours.",
    description:
      "A phone assistant that picks up when you're under a car, with a customer, or closed for the night. It greets callers, answers common questions, collects booking details, and passes everything back to you — so a missed call stops being a lost customer. It never guesses at pricing; anything it can't answer goes straight to you.",
    icon: Phone,
    bullets: [
      "Answers calls during busy hours and after close",
      "Handles common questions in a natural voice",
      "Collects name, number, and reason for the call",
      "Books appointments or takes a detailed message",
      "Hands off to you rather than guessing",
    ],
    deliverables: ["Configured voice assistant", "Call handling logic", "Booking integration", "Message delivery setup"],
    timeline: "2–4 weeks",
  },
  {
    slug: "lead-follow-up",
    title: "Lead Follow-Up & Re-Engagement",
    short: "Automatic texts and emails so leads don't go cold and past customers come back.",
    description:
      "Most leads go cold because nobody followed up on day two. We build the system that handles it — an instant response when someone reaches out, timed follow-ups if they don't book, and re-engagement for past customers due to come back. Every lead lands in one place your whole team can see, with replies and opt-outs tracked automatically.",
    icon: MessageSquareText,
    bullets: [
      "Instant response the moment a lead comes in",
      "Timed follow-up sequence if they don't book",
      "Re-engagement for past customers due to return",
      "Reply and opt-out detection built in",
      "Every lead logged to one shared pipeline",
    ],
    deliverables: ["Follow-up sequences", "Lead pipeline sheet", "Automation logic", "Performance reporting"],
    timeline: "1–3 weeks",
  },
  {
    slug: "missed-call-text-back",
    title: "Missed-Call Text-Back",
    short: "Every unanswered call gets an instant text before the caller moves on.",
    description:
      "When a call goes unanswered, an automatic text goes out within seconds — so the customer hears from you before they dial the next business on the list. It's one of the cheapest, highest-return systems a automotive business can add.",
    icon: PhoneMissed,
    bullets: [
      "Automatic text within seconds of a missed call",
      "Customisable message in your voice",
      "Captures the conversation so it doesn't get lost",
      "Works alongside the phone assistant",
    ],
    deliverables: ["Text-back setup", "Message templates", "Routing to your pipeline"],
    timeline: "About 1 week",
  },
  {
    slug: "review-generation",
    title: "Review Generation & Response",
    short: "Automated review requests after service, plus AI-assisted responses.",
    description:
      "Reviews are how automotive businesses get found and trusted. We set up automatic review requests after a job is done, and AI-assisted drafting for responses — especially the tricky negative ones that need a careful, professional reply.",
    icon: Star,
    bullets: [
      "Automatic review requests after service",
      "AI-assisted response drafting",
      "Private feedback capture before public reviews",
      "Google Business Profile optimisation",
    ],
    deliverables: ["Review request flow", "Response templates", "Google Business setup"],
    timeline: "1–2 weeks",
  },
  {
    slug: "booking-scheduling",
    title: "Booking & Scheduling",
    short: "Online booking wired into your calendar, chatbot, and phone assistant.",
    description:
      "Let customers book themselves in without a phone tag marathon. We connect online booking directly to your calendar and to your chatbot and phone assistant, so appointments self-schedule and land where you'll actually see them.",
    icon: CalendarCheck,
    bullets: [
      "Online booking connected to your calendar",
      "Wired into your chatbot and phone assistant",
      "Automatic confirmations and reminders",
      "Drop-off and scheduling options",
    ],
    deliverables: ["Booking system", "Calendar integration", "Confirmation flow"],
    timeline: "1–2 weeks",
  },
  {
    slug: "unified-inbox",
    title: "Unified Inbox",
    short: "Texts, Messenger, Instagram, and Google messages in one place.",
    description:
      "Inquiries arrive across half a dozen apps, and the one on the least-checked channel dies quietly. We bring texts, Messenger, Instagram, and Google messages into a single inbox so nothing gets buried and nothing gets missed.",
    icon: Inbox,
    bullets: [
      "All message channels in one place",
      "Nothing buried across separate apps",
      "Shared visibility for your whole team",
      "Feeds directly into lead follow-up",
    ],
    deliverables: ["Unified inbox setup", "Channel connections", "Team access"],
    timeline: "1–2 weeks",
  },
  {
    slug: "backup-foundations",
    title: "Backup & Foundations",
    short: "Automatic backups, secured networks, and business email done properly.",
    description:
      "The groundwork everything else sits on. Automatic backups so a dead computer doesn't erase your customer records, a secured network that separates business from guest WiFi, and business email set up properly for deliverability. Unglamorous, and exactly the stuff that bites businesses that skip it.",
    icon: ShieldCheck,
    bullets: [
      "Automatic, tested data backups",
      "Network and WiFi security",
      "Business email with proper deliverability (SPF, DKIM, DMARC)",
      "Documentation so nothing lives only in one person's head",
    ],
    deliverables: ["Backup system", "Network configuration", "Business email setup", "Documentation"],
    timeline: "1–2 weeks",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* WORK                                                                */
/* ------------------------------------------------------------------ */

export type WorkCategory = "Website" | "AI Chatbot" | "Phone AI" | "Automation";

export interface Project {
  slug: string;
  client: string;
  industry: string;
  year: string;
  category: WorkCategory;
  summary: string;
  challenge: string;
  approach: string[];
  tags: string[];
  status: "Concept" | "Prototype" | "In progress";
}

export const projects: Project[] = [
  {
    slug: "alba-auto-service",
    client: "Alba Auto Service",
    industry: "Auto Repair",
    year: "2026",
    category: "AI Chatbot",
    summary:
      "Full site rebuild for a family-owned Chicago repair shop, with a live AI assistant handling questions on hours, services, and estimates.",
    challenge:
      "An eighteen-year-old business running on a template site builder, with no way for customers to get an answer outside of shop hours.",
    approach: [
      "Rebuilt the site around the shop's actual identity rather than a generic auto template",
      "Wired in an AI assistant grounded strictly in the shop's real service and hours data",
      "Configured the assistant to hand off to the owner for anything it couldn't answer accurately",
    ],
    tags: ["Website", "AI Chatbot", "Brand"],
    status: "Concept",
  },
  {
    slug: "voice-assistant-prototype",
    client: "Phone Assistant",
    industry: "Voice AI",
    year: "2026",
    category: "Phone AI",
    summary:
      "A working phone assistant that greets callers, answers common questions, and collects booking details before handing off.",
    challenge:
      "Small shops miss calls during service hours and after close — and a missed call is usually a customer who dialled the next business on the list.",
    approach: [
      "Built the conversation logic against real shop data, not a generic script",
      "Designed handoff rules so the assistant never guesses at pricing",
      "Structured for telephony integration via Twilio or Vapi",
    ],
    tags: ["Voice AI", "Booking", "After-hours"],
    status: "Prototype",
  },
  {
    slug: "follow-up-engine",
    client: "Follow-Up Engine",
    industry: "Retail & E-commerce",
    year: "2026",
    category: "Automation",
    summary:
      "Automated re-engagement for leads and past customers — instant response, timed follow-ups, and review requests after service.",
    challenge:
      "Leads that arrive on a Friday afternoon go cold by Monday because there's no system watching them.",
    approach: [
      "Built a status-driven pipeline with defined stages rather than one-off sends",
      "Added reply and opt-out detection so sequences stop when they should",
      "Logged everything to a shared sheet the whole team can read at a glance",
    ],
    tags: ["Automation", "SMS", "Reviews"],
    status: "In progress",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const workCategories: ("All" | WorkCategory)[] = ["All", "Website", "AI Chatbot", "Phone AI", "Automation"];

/* ------------------------------------------------------------------ */
/* PRICING                                                             */
/* ------------------------------------------------------------------ */

export interface Tier {
  name: string;
  price: string;
  retainer: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

export const tiers: Tier[] = [
  {
    name: "Foundation",
    price: "$1,500 – $3,500",
    retainer: "+ $150–300 / month",
    tagline: "Get found and never miss an inquiry. The right starting point for most businesses.",
    featured: true,
    features: [
      "Website development",
      "AI chatbot",
      "AI phone answering",
      "Missed-call text-back",
      "Online booking",
      "Google Business setup",
      "Review generation",
      "Data backup",
    ],
  },
  {
    name: "Growth",
    price: "$3,500 – $8,000",
    retainer: "+ $400–800 / month",
    tagline: "Everything in Foundation, plus the tools that turn inquiries into booked work faster.",
    features: [
      "Everything in Foundation",
      "Instant quote tool",
      "Speed-to-lead response",
      "Unified inbox",
      "Lead routing and follow-up",
      "Email and SMS marketing",
      "Online payments (Stripe)",
      "Call tracking and KPI dashboard",
    ],
  },
  {
    name: "Partnership",
    price: "Custom",
    retainer: "Scoped to the business",
    tagline: "The full system, for businesses ready to hand over the whole growth engine.",
    features: [
      "Everything in Growth",
      "Paid ads management",
      "Retargeting",
      "Referral automation",
      "Invoicing and digital records",
      "Client portal",
      "Shop software integration",
      "Ongoing consulting",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* INSIGHTS                                                            */
/* ------------------------------------------------------------------ */

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "missed-calls-cost",
    title: "What a missed call actually costs a automotive business",
    category: "Operations",
    date: "2026-07-12",
    readTime: "4 min",
    excerpt:
      "Most owners think of a missed call as a minor annoyance. Run the arithmetic on a single week and it stops looking minor.",
    body: [
      "A missed call is rarely a customer who calls back. It's a customer who calls the next business on the search results page, and the one after that if they have to.",
      "The arithmetic is uncomfortable. If your average job is worth $400 and you miss four calls a week, half of which would have booked, that's roughly $800 a week walking out the door — before you've spent a dollar on advertising to replace them.",
      "The fix isn't hiring a receptionist. It's making sure something answers, captures the details, and gets them back to you before the caller has moved on.",
    ],
  },
  {
    slug: "ai-chatbots-that-dont-lie",
    title: "Why most business chatbots make things up (and how to stop it)",
    category: "AI",
    date: "2026-06-28",
    readTime: "6 min",
    excerpt:
      "A chatbot that invents a price is worse than no chatbot at all. The difference comes down to how it's grounded.",
    body: [
      "The failure mode everyone worries about is real: a customer asks what a brake job costs, the assistant guesses, and now you're arguing about a number nobody at your business ever quoted.",
      "The fix is unglamorous. You constrain the assistant to a defined set of information about the business, and you give it explicit instructions to hand off rather than guess when a question falls outside that set.",
      "Tested properly, this is more reliable than a busy human answering the phone mid-repair — because it never improvises to fill an awkward silence.",
    ],
  },
  {
    slug: "local-seo-basics",
    title: "The local SEO work that actually moves the needle",
    category: "SEO",
    date: "2026-06-15",
    readTime: "5 min",
    excerpt:
      "Skip the keyword theatre. Four unglamorous fixes account for most of the ranking gains a automotive business will ever see.",
    body: [
      "Claim and fully complete the Google Business Profile. Not partially — every field, real photos, correct categories, accurate hours.",
      "Make your name, address, and phone identical everywhere they appear. Inconsistencies across Yelp, Apple Maps, and Bing quietly suppress rankings.",
      "Ask every satisfied customer for a review, and respond to all of them. Recency and response rate both count.",
      "Everything after that is refinement. Most businesses never finish the first four.",
    ],
  },
  {
    slug: "one-inbox",
    title: "Your leads are scattered across six apps",
    category: "Operations",
    date: "2026-05-30",
    readTime: "3 min",
    excerpt:
      "Instagram DMs, texts, Google messages, email, voicemail, and a sticky note. Here's what consolidating them is worth.",
    body: [
      "The problem isn't that any single channel is broken. It's that no one place shows you everything, so the lead that arrives on the least-checked channel dies quietly.",
      "A unified inbox isn't a productivity nicety — it's the difference between a lead being worked and a lead being lost.",
      "Start by counting where inquiries arrived last month. Most owners are surprised by at least one channel.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* PROCESS + STATS                                                     */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    n: "01",
    title: "Audit",
    body: "We walk your setup end to end — website, calls, messages, reviews, follow-up — and show you exactly where customers are slipping through.",
  },
  {
    n: "02",
    title: "Roadmap",
    body: "A plain-English breakdown of what's costing you business and what fixing it is worth. No jargon, no pressure.",
  },
  {
    n: "03",
    title: "Build",
    body: "We build the systems and test everything live before it ever touches a real customer.",
  },
  {
    n: "04",
    title: "Maintain",
    body: "Monthly monitoring, tuning, and reporting. You see what's working in numbers, not adjectives.",
  },
];

export const stats = [
  { value: "24/7", label: "Coverage" },
  { value: "<5 min", label: "Lead response" },
  { value: "90+", label: "Lighthouse target" },
  { value: "Chicago", label: "Based & growing" },
];

export const capabilities = [
  "Website Development",
  "AI Chatbots",
  "Phone Assistants",
  "Lead Follow-Up",
  "Missed-Call Text-Back",
  "Review Automation",
  "Booking Systems",
  "Unified Inbox",
];
