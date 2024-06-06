import Image from "next/image";
import { dmMono } from "./fonts";
import { Switchboard } from "@/components/Switchboard/Switchboard";
import { SvgBackground } from "@/components/SvgBackground";

export default function Home() {
  return (
    <main className="flex w-screen h-screen items-center justify-center p-2 relative">
      <div className="flex flex-col items-center justify-between max-w-md max-h-[480px] w-full h-full p-2 md:p-4 md:mb-14 backdrop-blur-[2px] bg-transparent z-10 rounded-sm shadow-sm">
        <Switchboard />
        <h1 className={`text-sm font-bold ${dmMono.className}`}>
          {"cant have it all :("}
        </h1>
      </div>
      <SvgBackground />
    </main>
  );
}
