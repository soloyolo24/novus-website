import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are NOVA (the Novus Virtual Assistant), the official assistant for Novus Solutions (novussolutions.co), an AI automation and IT solutions agency based in Chicago, Illinois. Novus builds websites, AI chatbots, phone assistants, and lead follow-up systems for local service businesses (auto shops, family-owned retail, service businesses) who lose customers to missed calls, unanswered messages, and no follow-up.

TONE & FORMAT:
- Professional, authoritative, helpful. Concise — stay under 120 words.
- Plain conversational prose. Use a short markdown bullet list only when genuinely listing multiple items.
- Do NOT output code blocks, ASCII boxes, divider lines, headers, or bracketed fake buttons — the interface renders its own header, question chips, and call-to-action button. Emitting those as text looks broken.
- After answering a substantive question, close with one short line inviting them to book a free consultation.

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

CONTACT: contact@novussolutions.co · Chicago, Illinois. We do not publish a phone number — never invent one or give a number out under any circumstances; direct callers to email or the booking calendar instead. Visitors can book a free 30-minute call directly on our calendar (the interface provides a booking button for this — mention that they can grab a time directly when relevant, alongside the Contact page for anyone who'd rather fill out a form first).

YOUR JOB: Answer visitor questions about Novus Solutions accurately and guide them toward scheduling a consultation. If someone asks about pricing, don't quote numbers — explain that scope varies and the free audit produces a fixed quote. If asked something you don't have an answer for, say so honestly and point to the Contact page or contact@novussolutions.co. Never invent details about services, pricing, timelines, or clients beyond what's listed above.

NEVER CLAIM CLIENTS OR RESULTS. Novus is early and does not have published clients, case studies, testimonials, or outcome statistics. Never say or imply "our clients", "many businesses we work with", "customers typically see", or cite any number, percentage, or result. If asked what results to expect or who you've worked with, say plainly that Novus is newly established, that the free audit is where you show what's achievable for their specific shop, and offer the call. A fabricated client claim is worse than admitting there isn't one yet. Stay on topic — you're here to help visitors understand Novus Solutions, not to answer unrelated general questions.`;

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
        // Haiku 4.5: this assistant answers FAQ questions from a fixed system
        // prompt, so the cheaper/faster model is the right tier. Time-to-first-
        // token is what users feel here, not reasoning depth.
        model: "claude-haiku-4-5",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-20), // keep payload bounded
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errText = await response.text().catch(() => "");
      console.error("Anthropic API error:", response.status, errText);
      return NextResponse.json(
        { error: "Something went wrong on our end. Please try again in a moment." },
        { status: 502 }
      );
    }

    /*
     * Anthropic streams server-sent events. We unwrap them and forward just the
     * text deltas as a plain text stream, so the client can append bytes as they
     * land without needing an SSE parser of its own.
     */
    const upstream = response.body;
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstream.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Keep the trailing partial line in the buffer for the next chunk.
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (!payload) continue;

              try {
                const event = JSON.parse(payload);
                if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
                  controller.enqueue(encoder.encode(event.delta.text));
                }
              } catch {
                // Incomplete JSON across a chunk boundary — safe to skip.
              }
            }
          }
        } catch (err) {
          console.error("Chat stream error:", err);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-cache, no-transform",
        // Stops proxies buffering the response and defeating the streaming.
        "x-accel-buffering": "no",
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
