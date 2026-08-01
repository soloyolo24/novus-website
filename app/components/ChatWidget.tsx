"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Search, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_URL } from "../lib/data";

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
              <span className="mt-[7px] h-1 w-1 shrink-0 bg-electric-500" />
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
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[72vh] max-h-[560px] w-[92vw] max-w-[390px] flex-col overflow-hidden border border-white/10 bg-navy-900 shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-white/10 bg-navy-800/60 px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Search size={15} className="text-electric-500" />
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
                AI Solutions · Chicago
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
                        ? "bg-electric-500 text-white"
                        : "border border-white/10 bg-navy-800/60 text-silver-200"
                    }`}
                  >
                    {m.role === "assistant" ? <FormattedText text={m.content} /> : m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 border border-white/10 bg-navy-800/60 px-4 py-2.5 text-silver-400">
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
                      className="flex w-full items-center gap-2.5 border border-white/15 px-3.5 py-2.5 text-left text-[13px] text-silver-300 transition-all hover:border-electric-500 hover:text-white"
                    >
                      <span className="text-[11px] font-semibold text-electric-500">
                        {i + 1}
                      </span>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Next steps CTA */}
              {showCta && (
                <div className="border border-white/10 bg-navy-800/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-silver-500">
                    Next steps
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 bg-electric-500 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
                  >
                    <CalendarCheck size={14} /> Book a free consultation
                  </a>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3.5">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Type your inquiry…"
                  className="max-h-24 flex-1 resize-none border border-white/15 bg-navy-800/50 px-3.5 py-2.5 text-[14px] text-white placeholder:text-silver-500 focus:border-electric-500 focus:outline-none"
                />
                <button
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-[42px] w-[42px] shrink-0 items-center justify-center bg-electric-500 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={16} />
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-500 text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
