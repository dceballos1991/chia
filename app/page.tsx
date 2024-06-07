import { dmMono } from "./fonts";
import { Switchboard } from "@/components/Switchboard/Switchboard";
import { SvgBackground } from "@/components/SvgBackground";
import { CardContainer } from "@/components/CardContainer";
import { DockNav } from "@/components/DockNav";

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
      <CardContainer className="flex-col md:flex-col-reverse md:justify-end justify-between max-h-[480px] h-full md:mb-14 ">
        <Switchboard initDataFromParams={initData} initState={initState} />
        <h1 className={`text-sm font-bold pb-2 md:pb-0 ${dmMono.className}`}>
          {"cant have it all :("}
        </h1>
      </CardContainer>
      <DockNav />
      <p
        className={`text-sm absolute bottom-6 md:bottom-8 z-10 text-gray-300 ${dmMono.className}`}
      >
        Ⓒ 2024 by{" "}
        <a
          className="underline"
          target="_blank"
          href="https://www.x.com/dc1b3l"
        >
          @dc1b3l
        </a>
      </p>
      <SvgBackground />
    </main>
  );
}
