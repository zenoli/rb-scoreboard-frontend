import * as Rb from "@/lib/rb-types"
import Image from "next/image"
import { TeamIcon } from "./TeamIcon"

interface TeamIconsProps {
  team: Rb.Team
  opponent: Rb.Team
}

export function TeamIcons({ team, opponent }: TeamIconsProps) {
  return (
    <div className="flex gap-3">
      <TeamIcon team={team} />
      <TeamIcon team={opponent} />
    </div>
  )
}
