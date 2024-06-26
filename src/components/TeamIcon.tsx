import * as Rb from "@/lib/rb-types"
import Image from "next/image"

interface TeamIconProps {
  team: Rb.Team
}

function getTwOverrideClasses(shortCode: string) {
  if (["GEO"].includes(shortCode)) return "scale-[1.0]"
  if (["ALB", "ROM"].includes(shortCode))
    return "translate-y-[1px] scale-[1.68]"
  return "scale-[1.52]"
}

export function TeamIcon({ team }: TeamIconProps) {
  return (
    <div className="relative size-8 overflow-hidden rounded-full border-2 border-white">
      <Image
        src={team.imagePath}
        alt={team.shortCode}
        fill
        className={getTwOverrideClasses(team.shortCode)}
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}
