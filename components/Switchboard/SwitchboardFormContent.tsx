"use client";

import { AiResponse, generateSwitchesAction } from "@/app/actions";
import { useState } from "react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 0;

export const SwitchboardContent = ({
  initResponse,
}: {
  initResponse: AiResponse;
}) => {
  const [result, setResult] = useState<AiResponse>(initResponse);
  const [input, setInput] = useState("");

  const [switches, setSwitches] = useState([true, false, false]);

  const handleToggle = (index: number) => {
    setSwitches((prevSwitches) => {
      const newSwitches = [...prevSwitches];
      newSwitches[index] = !newSwitches[index];

      const onIndices = newSwitches
        .map((isOn, i) => (isOn ? i : null))
        .filter((i) => i !== null);

      if (onIndices.length > 2) {
        const activeIndices = onIndices.filter((i) => i !== index); // to avoid toggling the current switch
        const randomIndexToTurnOff =
          activeIndices[Math.floor(Math.random() * activeIndices.length)];
        newSwitches[randomIndexToTurnOff as number] = false;
      }

      return newSwitches;
    });
  };

  return (
    <>
      <form
        action={async () => {
          setInput("");

          const result = await generateSwitchesAction(input);

          setResult(result);
        }}
      >
        <Input
          value={input}
          placeholder="Type your dream or goals..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div className="flex flex-col gap-5 ">
        <div className="flex items-center space-x-2">
          <Switch
            id="user-phrase"
            checked={switches[0]}
            onCheckedChange={() => handleToggle(0)}
          />
          <Label htmlFor="user-phrase">{result.userPhrase}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="phrase-1"
            checked={switches[1]}
            onCheckedChange={() => handleToggle(1)}
          />
          <Label htmlFor="phrase-1">
            {result.phrase1 || "live pass 27 💀"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="phrase-2"
            checked={switches[2]}
            onCheckedChange={() => handleToggle(2)}
          />
          <Label htmlFor="phrase-2">
            {result.phrase2 || "mentally stable 🧠"}
          </Label>
        </div>
      </div>
    </>
  );
};
