"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Loader2, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Welcome to Novus Solutions. Pick a question below to begin, or type your own.",
};

const STARTER_QUESTIONS = [
  "What services does Novus offer?",
  "How does the free audit work?",
  "How long does a build take?",
  "How do I get started?",
];

/** Renders assistant text with light markdown support (bold + bullet lists). */
function FormattedText({ text }: { text: string }) {
  const withBold = (line: string) =>
    line.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
      chunk.startsWith("**") && chunk.endsWith("**") ? (
        <strong key={i} className="font-semibold text-white">
          {chunk.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{chunk}</span>
      )
    );

  const lines = text.split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
        if (bullet) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-electric-500" />
              <span>{withBold(bullet[1])}</span>
            </div>
          );
        }
        return <p key={i}>{withBold(line)}</p>;
      })}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showStarters = messages.length === 1 && !loading;
  const showCta = messages.length > 1 && !loading;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setErrored(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data?.error ?? "Chat request failed");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setErrored(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry — something went wrong on my end. You can reach us directly at contact@novussolutions.co in the meantime.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[72vh] max-h-[560px] w-[92vw] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/90 shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(77,139,255,0.12)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="border-b border-white/[0.07] bg-white/[0.03] px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="chip-dot" />
                  <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white">
                    Ask Novus
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="p-1 text-silver-400 transition-colors hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-silver-500">
                Technology & Growth · Chicago
              </p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] px-4 py-2.5 text-[14px] leading-relaxed ${
                      m.role === "user"
                        ? "rounded-2xl rounded-br-md bg-gradient-to-b from-electric-400 to-electric-500 font-medium text-ink-950"
                        : "rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] text-silver-200"
                    }`}
                  >
                    {m.role === "assistant" ? <FormattedText text={m.content} /> : m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-2.5 text-silver-400">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-[13px]">Thinking…</span>
                  </div>
                </div>
              )}

              {/* Starter question chips */}
              {showStarters && (
                <div className="space-y-2 pt-1">
                  {STARTER_QUESTIONS.map((q, i) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="flex w-full items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.02] px-4 py-2.5 text-left text-[13px] text-silver-300 transition-all hover:border-electric-500/60 hover:bg-white/[0.06] hover:text-white"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric-500/15 text-[10px] font-semibold text-electric-400">
                        {i + 1}
                      </span>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Next steps CTA */}
              {showCta && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-silver-500">
                    Next steps
                  </p>
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-electric-400 to-electric-500 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-950 shadow-[0_6px_20px_rgba(77,139,255,0.3)] transition-transform hover:-translate-y-px"
                  >
                    <CalendarCheck size={14} /> Book a free consultation
                  </Link>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.07] p-3.5">
              {/* One rounded well holding field + send, rather than two boxes side by side. */}
              <div className="flex items-end gap-2 rounded-[22px] border border-white/12 bg-white/[0.04] p-1.5 pl-4 transition-colors focus-within:border-electric-500/60">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Type your inquiry…"
                  className="max-h-24 flex-1 resize-none border-0 bg-transparent py-2.5 text-[14px] text-white placeholder:text-silver-500 focus:outline-none focus:ring-0"
                />
                <button
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-electric-400 to-electric-500 text-ink-950 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
                >
                  <Send size={15} />
                </button>
              </div>
              {errored && (
                <p className="mt-2 text-[11.5px] text-silver-500">
                  Having trouble connecting — email contact@novussolutions.co if this keeps up.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-electric-400 to-electric-500 text-ink-950 shadow-[0_0_0_1px_rgba(77,139,255,0.5),0_10px_34px_rgba(77,139,255,0.4)] transition-transform hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
