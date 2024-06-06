import { generateSwitchesAction } from "@/server/actions";
import { SwitchboardContent } from "./SwitchboardFormContent";

export const dynamic = "force-dynamic";
export const maxDuration = 0;

export const Switchboard = async () => {
  const initResult = await generateSwitchesAction();
  return (
    <div className="flex flex-col w-full mx-auto stretch gap-6">
      <SwitchboardContent initResponse={initResult} />
    </div>
  );
};
