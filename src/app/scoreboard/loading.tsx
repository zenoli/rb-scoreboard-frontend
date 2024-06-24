"use client"
import { BarLoader, BeatLoader } from "react-spinners"

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <BarLoader loading={true} color="#ffffff" />
    </div>
  )
}
