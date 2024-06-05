import Image from "next/image";
import { dmMono } from "./fonts";
import AISwitchboard from "@/components/AISwitchboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AISwitchboard />
      <h1 className={`text-sm font-bold ${dmMono.className}`}>
        {"cant have it all :("}
      </h1>
    </main>
  );
}
