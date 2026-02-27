"use client"

import Link from "next/link";
import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import NovelCard from "@/components/NovelCard"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

interface Novel {
  id: string
  title: string
  author: string
  description: string
  cover_url: string
  pdf_url: string
  rating: number
}

export default function Home() {
  const [novels, setNovels] = useState<Novel[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNovels() {
      const { data, error } = await supabase
        .from("novels")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setNovels(data)
      }
      setLoading(false)
    }

    fetchNovels()
  }, [])

  const filteredNovels = novels.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 glow-text"
          >
            استكشف عوالم من الخيال والغموض
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lunar text-lg max-w-2xl mx-auto"
          >
            مكتبة حصرية لأرقى الروايات العربية الممزوجة بعبق الفضاء وسحر الكلمات
          </motion.p>
        </section>

        {/* Search Bar - already in Header but let's add a main one for better UX */}
        <div className="max-w-xl mx-auto mb-16">
           <div className="relative group">
              <input
                type="text"
                placeholder="ابحث عن عنوان الرواية أو الكاتب..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-12 focus:outline-none focus:border-purple-500 transition-all text-lg shadow-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-4 top-4 text-lunar">🔍</span>
            </div>
        </div>

        {/* Novels Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredNovels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredNovels.map((novel) => (
              <Link href={`/novel/${novel.id}`} key={novel.id}>
                <NovelCard novel={novel} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lunar text-xl">لا توجد روايات تطابق بحثك حالياً...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
