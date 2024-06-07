import { dmMono } from "./fonts";
import { Switchboard } from "@/components/Switchboard/Switchboard";
import { SvgBackground } from "@/components/SvgBackground";

const parseSharedResponse = (searchParams: Record<string, string>) => {
  const paramsArray = Object.keys(searchParams);
  if (paramsArray.length !== 3) {
    return { initData: undefined, initState: undefined };
  }
  const initData = {
    userPhrase: paramsArray[0],
    phrase1: paramsArray[1],
    phrase2: paramsArray[2],
  };

  const initState = [];

  // forces two switches to be always on
  if (searchParams[paramsArray[0]] === "true") {
    initState.push(true);
    if (searchParams[paramsArray[1]] === "true") {
      initState.push(true);
      initState.push(false);
    } else {
      initState.push(false);
      initState.push(true);
    }
  } else {
    initState.push(false);
    initState.push(true, true);
  }

  return { initData, initState };
};

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { initData, initState } = parseSharedResponse(searchParams);

  return (
    <main className="flex w-screen h-screen items-center justify-center p-2 relative">
      <div className="flex flex-col items-center justify-between max-w-md max-h-[480px] w-full h-full p-2 md:p-4 md:mb-14 backdrop-blur-[2px] bg-transparent z-10 rounded-sm shadow-sm">
        <Switchboard initDataFromParams={initData} initState={initState} />
        <h1 className={`text-sm font-bold ${dmMono.className}`}>
          {"cant have it all :("}
        </h1>
      </div>
      <SvgBackground />
    </main>
  );
}
