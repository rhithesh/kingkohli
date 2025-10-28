"use client";

import React, { useEffect, useRef, useState } from "react";
import { loadConversations, saveConversation } from "../lib/storage";
import BirdsOfParadiseScene from "./ui/BirdsOfParadise";
import { motion, AnimatePresence } from "framer-motion";

import { GlassmorphicStickyHeader } from "./ui/sticky-header";
import BackgroundImage from "./BackgroundImage";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  ts: string;
};

const VIRAT_KOHLI_API = "/api/proxy/chat";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Chat() {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(1); // 0-5 scale
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Load saved sessions
  useEffect(() => {
    const loaded = loadConversations();
    setConversations(loaded);
    const first = Object.keys(loaded)[0] || uid();
    if (!loaded[first]) {
      loaded[first] = [
        {
          id: uid(),
          role: "system",
          content: "Session started.",
          ts: new Date().toISOString(),
        },
      ];
      saveConversation(first, loaded[first]);
    }
    setConversations(loaded);
    setActiveId(first);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations, activeId]);

  // Reset
  function clearConversation() {
    if (!activeId) return;
    const copy = { ...conversations };
    copy[activeId] = [
      {
        id: uid(),
        role: "system",
        content: "Session reset.",
        ts: new Date().toISOString(),
      },
    ];
    setConversations(copy);
    saveConversation(activeId, copy[activeId]);
    setActiveId(null);
  }

  // Send message
  async function send() {
    const convId = activeId ?? uid();
    if (!activeId) setActiveId(convId);
    if (!input.trim()) return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: input,
      ts: new Date().toISOString(),
    };

    const updated = [...(conversations[convId] || []), userMsg];
    const newConvos = { ...conversations, [convId]: updated };
    setConversations(newConvos);
    saveConversation(convId, updated);
    setInput("");
    setIsWaiting(true);

    const placeholderId = uid();
    const placeholderMsg: Message = {
      id: placeholderId,
      role: "assistant",
      content: "Thinking...",
      ts: new Date().toISOString(),
    };
    setConversations((prev) => {
      const copy = { ...prev, [convId]: [...(prev[convId] || []), placeholderMsg] };
      saveConversation(convId, copy[convId]);
      return copy;
    });

    const requestBody = {
      model: "./models/kingkohliv3.gguf",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are Virat Kohli — confident, focused, and inspirational. Respond with clarity, discipline, and depth.",
        },
        { role: "user", content: input },
      ],
    };

    try {
      const res = await fetch(VIRAT_KOHLI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      const assistantId = uid();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") break;

          try {
            const event = JSON.parse(payload);
            const chunk = event?.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantText += chunk;
              const assistantMsg: Message = {
                id: assistantId,
                role: "assistant",
                content: assistantText,
                ts: new Date().toISOString(),
              };
              setConversations((prev) => {
                const filtered = (prev[convId] || []).filter(
                  (m) => m.id !== placeholderId && m.id !== assistantId
                );
                const merged = [...filtered, assistantMsg];
                const copy = { ...prev, [convId]: merged };
                saveConversation(convId, merged);
                return copy;
              });
            }
          } catch {
            continue;
          }
        }
      }

      const finalAssistant: Message = {
        id: assistantId,
        role: "assistant",
        content: assistantText || "No response generated.",
        ts: new Date().toISOString(),
      };
      setConversations((prev) => {
        const filtered = (prev[convId] || []).filter(
          (m) => m.id !== placeholderId && m.id !== assistantId
        );
        const final = [...filtered, finalAssistant];
        const copy = { ...prev, [convId]: final };
        saveConversation(convId, final);
        return copy;
      });
    } catch (err) {
      const errMsg: Message = {
        id: uid(),
        role: "assistant",
        content: `Error: ${String(err)}`,
        ts: new Date().toISOString(),
      };
      setConversations((prev) => {
        const filtered = (prev[convId] || []).filter((m) => m.id !== placeholderId);
        const final = [...filtered, errMsg];
        const copy = { ...prev, [convId]: final };
        saveConversation(convId, final);
        return copy;
      });
    } finally {
      setIsWaiting(false);
    }
  }

  const current = activeId ? conversations[activeId] ?? [] : [];

  return (
    <>
    {/* <GlassmorphicStickyHeader /> */}
     <div className="relative min-h-screen w-full overflow-hidden">
       {/* background animation */}
     
       <BackgroundImage />

       {/* Controls */}
    

       <div className="flex flex-col h-screen min-h-0">

    
         {/* Chat Box Container */}
         <div className="flex flex-col flex-1 mx-6 mt-6 mb-4 bg-[url('https://noeawrojjd.ufs.sh/f/hhi7TjKirdIgsw461qU2PMmcntxhTqy9rGa2BdoOKCXDLUHl')] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden min-h-0">

{    !activeId  ?       <div className="flex flex-col z-50 flex-wrap    absolute top-40 left-120 justify-center gap-3 px-6 mb-4">
  {[
    "Hey Virat, what did you eat today?",
    "How do you stay so disciplined?",
    "What advice would you give to young cricketers?",
  ].map((prompt) => (
    <button
      key={prompt}
      onClick={() => {
        setInput(prompt);
        send();
      }}
      className="text-sm cursor-pointer md:text-base px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-gray-900 font-medium backdrop-blur-md transition-all"
      disabled={isWaiting}
    >
      {prompt}
    </button>
  ))}
</div> : null}
           <main
             ref={scrollRef}
             className="flex-1 bg-transparent overflow-y-scroll p-4 space-y-5 pb-[calc(96px+env(safe-area-inset-bottom))] min-h-0"
             style={{ WebkitOverflowScrolling: "touch" }}
                    >

<button
              onClick={(e) => {
                e.preventDefault();
                clearConversation();
              }}
              disabled={isWaiting}
              className="px-6 py-3 bg-white cursor-pointer text-black rounded-xl font-medium border border-white/30 transition-all"
            >
              reset
            </button>
              <div 
              >
              </div>
             <AnimatePresence>
               {current.map((m) => (
                 <motion.div
                   key={m.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.25 }}
                   className={`flex ${
                     m.role === "user" ? "justify-end" : "justify-start"
                   }`}
                 >
                   <div
                     className={`max-w-[80%] md:max-w-[65%] p-4 rounded-2xl text-sm md:text-base leading-relaxed  border border-white/20 ${
                       m.role === "user"
                         ? "backdrop-blur-2xl border-2 opacity-80 bg-white text-gray-900"
                         : m.role === "assistant"
                         ? "backdrop-blur-xl bg-white  border-2  opacity-80 rounded-2xl text-black"
                         : "backdrop-blur-md bg-white/5 text-black italic"
                     }`}
                   >
                     {m.content}
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
           </main>
         </div>




        {/* Floating Input Bar */}
        <footer className="px-6 pb-6">
          <form className="flex gap-3 items-end  bg-transparent border border-white/20 rounded-2xl backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              rows={2}
              className="flex-1 p-3 rounded-xl bg-transparent text-gray-900 placeholder-gray-500 resize-none outline-none focus:ring-0"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                send();
              }}
              disabled={isWaiting}
              className={`px-6  bg-blue-500/30  text-black cursor-pointer border-2 border-black  p-5 mb-2 rounded-xl font-medium transition-all ${
                isWaiting
                  ? "bg-white/20 text-gray-500 cursor-not-allowed"
                  : "bg-white/30 text-gray-900 backdrop-blur-xl"
              }`}
            >
              {isWaiting ? "Sending…" : "Send"}
            </button>
          </form>
        </footer>
      </div>
    </div>
    </>
  );
}
