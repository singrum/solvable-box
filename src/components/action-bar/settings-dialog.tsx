"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { getRandomSeed, useGameStore } from "@/stores/game-store";
import { range } from "lodash";
import { ChevronDown, MoveRight, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = !useIsMobile();
  const size = useGameStore((e) => e.size);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center">
            {size}
            <X />
            {size}
            <ChevronDown className="stroke-muted-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-auto max-h-4/5">
          <DialogHeader>
            <DialogTitle>크기 설정</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <ProfileForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {size}
          <X />
          {size}
          <ChevronDown className="stroke-muted-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>크기 설정</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="h-full overflow-auto">
          <ProfileForm className="px-4" setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  className,
  setOpen,
}: { setOpen: (open: boolean) => void } & React.ComponentProps<"div">) {
  const setSize = useGameStore((e) => e.setSize);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // size, seed 둘 다 받아서 한꺼번에 반영
  const updateParams = (size: string, seed: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", size);
    params.set("seed", seed);
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className={cn("grid items-start gap-6", className)}>
      {range(5, 20).map((e) => (
        <Button
          key={e}
          size="lg"
          className="flex justify-between text-base"
          onClick={() => {
            const seed = getRandomSeed();
            setOpen(false);
            setSize(e, seed);
            updateParams(String(e), seed);
          }}
        >
          <div className="flex items-center justify-center">
            {e}
            <X />
            {e}
          </div>
          <MoveRight />
        </Button>
      ))}
    </div>
  );
}
