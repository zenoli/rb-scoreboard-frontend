import * as Rb from "@/lib/rb-types"

export async function getScores(server?: boolean) {
  const backendUri = process.env.BACKEND_URI || "http://localhost:3001"
  const res = await fetch(`${server ? backendUri : ""}/api/scores`, {
    next: { revalidate: 30 },
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return (await res.json()) as Rb.ScoreMap
}

export async function get(route: string, server?: boolean) {
  const backendUri = process.env.BACKEND_URI || "http://localhost:3001"
  const res = await fetch(`${server ? backendUri : ""}/api/${route}`, {
    next: { revalidate: 30 },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return await res.json()
}
