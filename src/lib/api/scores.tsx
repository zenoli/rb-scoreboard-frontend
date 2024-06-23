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
