import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the site assistant for Novus Solutions, an AI automation agency based in Chicago, Illinois. Novus builds websites, AI chatbots, phone assistants, and lead follow-up systems for local service businesses (auto shops, family-owned retail, service businesses) who lose customers to missed calls, unanswered messages, and no follow-up.

SERVICES OFFERED (only source of truth — do not invent details beyond this):
- Website + AI Chatbot — modern, mobile-friendly site with an AI assistant that answers questions and books appointments 24/7, grounded strictly in the business's real info. Timeline: 2–4 weeks.
- AI Phone Assistant — answers calls, takes messages, books appointments, even after hours; hands off to a human rather than guessing. Timeline: 2–4 weeks.
- Lead Follow-Up & Re-Engagement — instant response to new leads, timed follow-ups if they don't book, and re-engagement for past customers. Timeline: 1–3 weeks.
- Missed-Call Text-Back — automatic text within seconds of a missed call. Timeline: about 1 week.
- Review Generation & Response — automated review requests after service, plus AI-assisted response drafting. Timeline: 1–2 weeks.
- Booking & Scheduling — online booking wired into the business's calendar, chatbot, and phone assistant. Timeline: 1–2 weeks.
- Unified Inbox — texts, Messenger, Instagram, and Google messages brought into one place. Timeline: 1–2 weeks.
- Backup & Foundations — automatic backups, secured business/guest WiFi separation, business email set up properly. Timeline: 1–2 weeks.

HOW WE WORK: Free, no-pressure initial audit of the business's current setup. We follow up within one working day. We work with a limited number of clients at a time so each build gets proper attention.

CONTACT: contact@novussolutions.co · (312) 555-0000 · Chicago, Illinois. Full project inquiries go through the Contact page.

YOUR JOB: Answer visitor questions about Novus Solutions accurately and conversationally — a sentence or two unless more detail is genuinely asked for. If someone asks about pricing or wants to get started, don't quote numbers; point them to the Contact page for a free audit and a real quote. If asked something you don't have an answer for, say so honestly and suggest the Contact page or email. Never invent details about services, pricing, timelines, or clients beyond what's listed above. Stay on topic — you're here to help visitors understand Novus Solutions, not to answer unrelated general questions.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json({ error: "No message provided." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat isn't configured yet — missing API key." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-20), // keep payload bounded
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return NextResponse.json(
        { error: "Something went wrong on our end. Please try again in a moment." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply: string =
      data?.content?.find((block: { type: string }) => block.type === "text")?.text ??
      "Sorry, I couldn't put together a response there — could you try rephrasing?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
