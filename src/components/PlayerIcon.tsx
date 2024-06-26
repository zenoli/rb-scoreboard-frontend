import * as Rb from "@/lib/rb-types"
import Image from "next/image"

interface PlayerIconProps {
  player: Rb.Player
}

export function PlayerIcon({ player }: PlayerIconProps) {
  return (
    <div className="relative size-12 overflow-hidden rounded-full border border-white">
      <Image
        src={player.imagePath}
        alt={player.displayName}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}
