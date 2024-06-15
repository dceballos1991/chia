import { AiResponse, generateSwitchesAction } from "@/server/actions";
import { SwitchboardContent } from "./SwitchboardFormContent";

export const dynamic = "force-dynamic";
export const maxDuration = 0;

export const Switchboard = async ({
  initDataFromParams,
  initState,
}: {
  initDataFromParams?: AiResponse;
  initState?: boolean[];
}) => {
  let initData: AiResponse;

  if (initDataFromParams) {
    initData = initDataFromParams;
  } else {
    initData = await generateSwitchesAction();
  }

  return (
    <div className="flex flex-col w-full mx-auto stretch gap-6">
      <SwitchboardContent initResponse={initData} initState={initState} />
    </div>
  );
};
