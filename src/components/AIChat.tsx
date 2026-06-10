"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "Which exchange has the lowest fees for a $5,000 BTC trade?",
  "I'm in the US — what's the best exchange for me?",
  "Ledger or Trezor — which should I buy?",
  "What's the cheapest crypto tax software?",
  "Which VPN is best for crypto traders?",
  "How do I set up a trading bot for beginners?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "10px 0" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="typing-dot" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

function MessageBubble({ message, isStreaming }: { message: Message; isStreaming?: boolean }) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        gap: "10px",
        alignItems: "flex-start",
        animation: "fadeUp .25s ease both",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "28px",
          height: "28px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "9px",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          background: isUser ? "#FF5722" : "#111111",
          color: isUser ? "#111111" : "#F4F4F0",
          borderRadius: 0,
          letterSpacing: ".06em",
          border: "2px solid #111111",
        }}
      >
        {isUser ? "YOU" : "AI"}
      </div>

      <div
        className={isUser ? "msg-bubble-user" : "msg-bubble-ai"}
        style={{ position: "relative", whiteSpace: "pre-wrap" }}
      >
        {message.content}
        {isStreaming && <span className="caret" style={{ marginLeft: 3 }} />}
      </div>
    </div>
  );
}

interface AIChatProps {
  compact?: boolean;
  initialMessage?: string;
  placeholder?: string;
}

export function AIChat({ compact = false, placeholder = "Ask anything about crypto…" }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, streamingContent, scrollToBottom]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    setShowSuggestions(false);
    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    try {
      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("API error");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      let fullContent = "";
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const evt of events) {
          const line = evt.split("\n").find((l) => l.startsWith("data: "));
          if (!line) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "delta" && typeof parsed.text === "string") {
              fullContent += parsed.text;
              setStreamingContent(fullContent);
            } else if (parsed.type === "error") {
              fullContent += `\n\n_⚠ ${parsed.message || "AI service error"}_`;
              setStreamingContent(fullContent);
            }
          } catch {
            /* ignore malformed chunk */
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullContent || "AI service returned no content. Please try again." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — could not reach the AI advisor. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
      setStreamingContent("");
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      data-testid="ai-chat-widget"
      style={{
        display: "flex",
        flexDirection: "column",
        height: compact ? "460px" : "600px",
        background: "#FFFFFF",
        border: "2px solid #111111",
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
        boxShadow: "8px 8px 0 #111111",
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          background: "#111111",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          borderBottom: "2px solid #111111",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ width: 8, height: 8, background: "#D50000", border: "1px solid #555555" }} />
            <span style={{ width: 8, height: 8, background: "#FFD600", border: "1px solid #555555" }} />
            <span style={{ width: 8, height: 8, background: "#00C853", border: "1px solid #555555" }} />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#9A9A9A" }}>
            CRYPTOFFILIATE :: AI-ADVISOR v1.0
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#FF5722", fontWeight: 700, letterSpacing: ".1em" }}>
          ● LIVE
        </span>
      </div>

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          background: "#FAFAFA",
        }}
        data-testid="ai-chat-messages"
      >
        {/* Empty state */}
        {isEmpty && (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 14px",
                background: "#111111",
                color: "#F4F4F0",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              READY
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "#4A4A4A", lineHeight: 1.6, maxWidth: "300px", margin: "0 auto" }}>
              Ask anything about crypto exchanges, wallets, fees, or tax software.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            isStreaming={false}
          />
        ))}

        {/* Streaming message */}
        {streamingContent && (
          <MessageBubble
            message={{ role: "assistant", content: streamingContent }}
            isStreaming
          />
        )}

        {/* Typing indicator */}
        {isLoading && !streamingContent && (
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{ width: "28px", height: "28px", background: "#111111", border: "2px solid #111111", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, color: "#F4F4F0" }}>AI</div>
            <TypingDots />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {showSuggestions && isEmpty && (
        <div style={{ padding: "12px 18px 4px", flexShrink: 0, borderTop: "2px solid #EAEAEA", background: "#F4F4F0" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#4A4A4A", letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
            &gt; Try asking
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {SUGGESTED_QUESTIONS.slice(0, compact ? 3 : 6).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                data-testid={`ai-suggested-q-${q.slice(0, 16).replace(/[^a-z]+/gi, "-").toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "#111111",
                  padding: "6px 12px",
                  borderRadius: 0,
                  border: "2px solid #111111",
                  background: "#FFFFFF",
                  cursor: "pointer",
                  transition: "background .1s, transform .1s, box-shadow .1s",
                  textAlign: "left",
                  fontWeight: 600,
                  boxShadow: "2px 2px 0 #111111",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#FFD600";
                  el.style.transform = "translate(-1px,-1px)";
                  el.style.boxShadow = "3px 3px 0 #111111";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#FFFFFF";
                  el.style.transform = "none";
                  el.style.boxShadow = "2px 2px 0 #111111";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "2px solid #111111",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexShrink: 0,
          background: "#FFFFFF",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#FF5722", fontWeight: 800 }}>&gt;_</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={isLoading}
          data-testid="ai-chat-input"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "#111111",
            caretColor: "#FF5722",
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          data-testid="ai-chat-send"
          style={{
            width: "40px",
            height: "36px",
            borderRadius: 0,
            background: input.trim() && !isLoading ? "#FF5722" : "#EAEAEA",
            border: "2px solid #111111",
            cursor: input.trim() && !isLoading ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background .1s, box-shadow .1s, transform .1s",
            flexShrink: 0,
            color: "#111111",
            boxShadow: input.trim() && !isLoading ? "2px 2px 0 #111111" : "none",
          }}
          onMouseEnter={(e) => {
            if (input.trim() && !isLoading) {
              (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #111111";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = input.trim() && !isLoading ? "2px 2px 0 #111111" : "none";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
