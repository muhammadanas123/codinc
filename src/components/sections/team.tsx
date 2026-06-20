import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { TeamMemberDialog } from "@/components/team-member-dialog";
import type { TeamMember } from "@/lib/content";

export async function Team() {
  const t = await getTranslations("team");
  const members = t.raw("members") as TeamMember[];

  return (
    <section id="team" className="pb-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow={t("eyebrow")}
          title={t("title")}
          sub={t("sub")}
        />
        <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-[18px] sm:grid-cols-2">
          {members.map((member) => (
            <TeamMemberDialog key={member.slug} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
