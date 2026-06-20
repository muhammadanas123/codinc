"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { TeamMember } from "@/lib/content";

export function TeamMemberDialog({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);

  function handleHire() {
    setOpen(false);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.history.replaceState(
      null,
      "",
      `#contact?member=${encodeURIComponent(member.name)}`,
    );

    document.getElementById("contact")?.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
    });

    window.dispatchEvent(
      new CustomEvent("codinc:hire", { detail: { member: member.name } }),
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          role="button"
          tabIndex={0}
          aria-label={`View ${member.name}'s profile`}
          className="reveal group cursor-pointer text-center transition-all duration-[250ms] hover:-translate-y-1 hover:border-peacock focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <CardContent className="flex flex-col items-center">
            <Image
              src={member.avatar}
              alt={member.name}
              width={96}
              height={96}
              className="mb-5 h-24 w-24 rounded-full border border-line object-cover"
            />
            <h3 className="font-display text-[21px] font-semibold tracking-[-0.01em]">
              {member.name}
            </h3>
            <p className="mt-1 font-mono text-xs tracking-[0.1em] text-peacock">
              {member.role}
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="text-center">
        <div className="flex flex-col items-center">
          <Image
            src={member.avatar}
            alt={member.name}
            width={120}
            height={120}
            className="mb-5 h-[120px] w-[120px] rounded-full border border-line object-cover"
          />
          <DialogTitle>{member.name}</DialogTitle>
          <p className="mt-2 font-mono text-xs tracking-[0.1em] text-peacock">
            {member.role}
          </p>
          <p className="mt-1 font-mono text-xs tracking-[0.04em] text-mist">
            {member.yearsExperience}+ yrs experience
          </p>
          <DialogDescription className="mt-5 text-left">
            {member.bio}
          </DialogDescription>
          <div className="mt-[18px] flex flex-wrap justify-center gap-[7px]">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-[7px] border border-line px-[9px] py-1 font-mono text-[11px] text-mist-dim"
              >
                {skill}
              </span>
            ))}
          </div>
          <Button
            variant="primary"
            className="mt-7 w-full"
            onClick={handleHire}
          >
            Hire me →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
