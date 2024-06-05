"use client";

import { type CoreMessage } from "ai";
import { useState } from "react";
import { continueConversation } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import { Input } from "./ui/input";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function AISwitchboard() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content as string}
        </div>
      ))}

      <form
        action={async () => {
          const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: "user" },
          ];

          setMessages(newMessages);
          setInput("");

          const result = await continueConversation(newMessages);

          for await (const content of readStreamableValue(result)) {
            setMessages([
              ...newMessages,
              {
                role: "assistant",
                content: content as string,
              },
            ]);
          }
        }}
      >
        <Input
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
