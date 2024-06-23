import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Scoreboard from "./scoreboard"
import * as Rb from "@/lib/rb-types"

export async function getScores(server?: boolean) {
  const backendUri = process.env.BACKEND_URI || "http://localhost:3001"
  const res = await fetch(`${server ? backendUri : ""}/api/scores`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return (await res.json()) as Rb.ScoreMap
}

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
      <Scoreboard />
    </HydrationBoundary>
  )
}
