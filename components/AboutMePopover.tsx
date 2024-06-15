import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { BriefcaseBusiness, HeartHandshake, Info, Sun } from "lucide-react";

const inlineIconStyles = "h-3 w-3 mx-1 mb-1 inline";

export const AboutMePopover = () => {
  return (
    <Popover>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <span className="sr-only">about me</span>
              <Info className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-4">
          about me
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-80" side="top">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">who am I?</h4>
            <p className="text-sm text-muted-foreground">
              I am a mexican engineer and designer based in the Coachella
              Valley, CA <Sun className={inlineIconStyles} />. I create apps,
              websites and do work with brands for money{" "}
              <BriefcaseBusiness className={inlineIconStyles} />. I also play
              around with software, music and art for the culture{" "}
              <HeartHandshake className={inlineIconStyles} />. if you want to
              connect feel free to{" "}
              <a href="mailto:dceballos1991@gmail.com" className="underline">
                {" "}
                reach out{" "}
              </a>
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
