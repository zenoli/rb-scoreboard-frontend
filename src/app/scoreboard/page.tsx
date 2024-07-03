import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Scoreboard from "./scoreboard"
import { getScores } from "@/lib/api/scores"
import uefaEuro2024Icon from "../../../public/UEFA_Euro_2024_logo.svg"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function ScoreboardPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["scores"],
    queryFn: () => getScores(true),
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center gap-8">
        <div className="text-white pt-8">
          <Image priority src="/UEFA_Euro_2024_logo.svg" width={100} height={100} alt="Uefa Euro 2024 Logo" />
        </div>
        <Scoreboard />
      </div>
    </HydrationBoundary>
  )
}
