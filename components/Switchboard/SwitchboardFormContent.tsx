"use client";

import { AiResponse, generateSwitchesAction } from "@/server/actions";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { usePathname, useRouter } from "next/navigation";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 0;

export const SwitchboardContent = ({
  initResponse,
  initState,
}: {
  initResponse: AiResponse;
  initState?: boolean[];
}) => {
  const [result, setResult] = useState<AiResponse>(initResponse);
  const [input, setInput] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const [switches, setSwitches] = useState([
    initState?.[0] ?? true,
    initState?.[1] ?? true,
    initState?.[2] ?? false,
  ]);

  useEffect(() => {
    if (result) {
      // when a user generates a new response or flips a switch set the search params to the new response
      const searchParams = new URLSearchParams();
      // searchParams.set("", "");
      if (result.userPhrase)
        searchParams.append(result.userPhrase, switches[0].toString());
      if (result.phrase1)
        searchParams.append(result.phrase1, switches[1].toString());
      if (result.phrase2)
        searchParams.append(result.phrase2, switches[2].toString());

      const queryString = searchParams.toString();

      router.push(pathname + "?" + queryString);
    }
  }, [result, switches, router, pathname]);

  const handleToggle = (index: number) => {
    setSwitches((prevSwitches) => {
      const newSwitches = [...prevSwitches];
      newSwitches[index] = !newSwitches[index];

      const onIndices = newSwitches
        .map((isOn, i) => (isOn ? i : null))
        .filter((i) => i !== null);

      if (newSwitches[index]) {
        // If the toggled switch is turned on
        if (onIndices.length > 2) {
          const activeIndices = onIndices.filter((i) => i !== index); // to avoid toggling the current switch
          const randomIndexToTurnOff =
            activeIndices[Math.floor(Math.random() * activeIndices.length)];
          newSwitches[randomIndexToTurnOff as number] = false;
        }
      } else {
        // If the toggled switch is turned off
        if (onIndices.length < 2) {
          const offIndices = newSwitches
            .map((isOn, i) => (!isOn ? i : null))
            .filter((i) => i !== null);
          const randomIndexToTurnOn =
            offIndices[Math.floor(Math.random() * offIndices.length)];
          newSwitches[randomIndexToTurnOn as number] = true;
        }
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
          placeholder="tell us what you want or want to be..."
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
