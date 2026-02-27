"use client"

import Link from "next/link"
import { Rocket } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-midnight/50 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Rocket className="text-white" size={20} />
          </div>
          <span className="text-2xl font-bold glow-text hidden sm:block">مجرة الروايات</span>
        </Link>

        {/* Auth Link */}
        <Link href="/login" className="text-sm font-medium hover:text-purple-400 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
          دخول الأدمن
        </Link>
      </div>
    </header>
  )
}
