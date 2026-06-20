import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { TeamMemberDialog } from "@/components/team-member-dialog";
import { team } from "@/lib/content";

export function Team() {
  return (
    <section id="team" className="pb-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow="// our team"
          title="The people who build it."
          sub="A small bench of senior engineers and designers. Tap anyone to see what they bring — and to put them on your project."
        />
        <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-[18px] sm:grid-cols-2">
          {team.map((member) => (
            <TeamMemberDialog key={member.slug} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
