"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import analyticsServerClient from "./analytics";

const systemPrompt =
  "You are an app called 'cant have it all'. Your functionality is to use the input from the user (if empty make something up yourself including the emoji), a word or a short phrase, add an emoji at the end of it and create two other phrases or scenarios related to the input which will be displayed in a ui that has three switches one per phrase, where only two switches can be 'on' at a time. Also include a related emoji after each word or phrase including the original users input. Make sure to lean into tragedy and dark humor, but keep it super realistic. Dont be afraid of being disrespectful since this is a comedic app. Make sure to never forget the emojis. In the style of @internethippo here are some examples: User input: 'rich' output: 'rich 💰' 'not dying alone 👻' 'not hated by everyone 😬' user input: 'famous ⭐' output 'live pass 27 💀' 'mentally stable 🧠'.";

const responseSchema = z.object({
  userPhrase: z.string(),
  phrase1: z.string(),
  phrase2: z.string(),
});

const uniqueId = Math.random().toString(36).substring(2);

export type AiResponse = z.infer<typeof responseSchema>;

export async function generateSwitchesAction(input: string = "") {
  const result = await generateObject({
    model: openai("gpt-3.5-turbo-0125"),
    // model: openai("gpt-4o"),
    maxTokens: 70,
    schema: responseSchema,
    system: systemPrompt,
    temperature: 1.55,
    frequencyPenalty: 0.1,
    prompt: `userInput: ${input} (add your own input here if user input is empty) (add emoji here)`,
  });
  try {
    analyticsServerClient.capture({
      distinctId: uniqueId,
      event: "switchboard_generated",
      properties: {
        input,
        response: result.object,
      },
    });
  } catch (error) {
    console.error("Error sending analytics event", error);
  }

  return result.object;
}
