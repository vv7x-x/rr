"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  className?: string
}

export default function StarRating({ rating, maxRating = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex flex-row-reverse gap-1 justify-end", className)}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            "transition-colors",
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-600"
          )}
        />
      ))}
    </div>
  )
}
