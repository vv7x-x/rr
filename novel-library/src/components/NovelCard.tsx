"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import StarRating from "./StarRating"
export default function NovelCard({ novel }: { novel: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="luxury-card group overflow-hidden rounded-2xl flex flex-col h-full">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image src={novel.cover_url || "/placeholder-cover.jpg"} alt={novel.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-5 flex flex-col flex-grow text-right">
        <div className="mb-2">
          <h3 className="text-xl font-bold glow-text mb-1">{novel.title}</h3>
          <p className="text-lunar text-sm">{novel.author}</p>
        </div>
        <StarRating rating={novel.rating} className="mb-3" />
        <p className="text-stardust/80 text-sm line-clamp-3 mb-5 leading-relaxed">{novel.description}</p>
        <div className="mt-auto flex flex-col gap-2">
          <span className="space-button flex items-center justify-center gap-2 text-sm">
            <Download size={18} />
            تفاصيل وتحميل
          </span>
        </div>
      </div>
    </motion.div>
  )
}
