"use client"
import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import StarRating from "@/components/StarRating"
import { Download, MessageCircle, User } from "lucide-react"
import Image from "next/image"

export default function NovelDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [novel, setNovel] = useState<any | null>(null)
  const [comments, setComments] = useState<any[]>([])
  const [userName, setUserName] = useState("")
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [novelRes, commentsRes] = await Promise.all([
        supabase.from("novels").select("*").eq("id", id).single(),
        supabase.from("comments").select("*").eq("novel_id", id).order("created_at", { ascending: false })
      ])
      if (novelRes.data) setNovel(novelRes.data)
      if (commentsRes.data) setComments(commentsRes.data)
      setLoading(false)
    }
    fetchData()
  }, [id])

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userName || !newComment) return
    const { data, error } = await supabase.from("comments").insert([{ novel_id: id, user_name: userName, comment: newComment }]).select()
    if (!error && data) { setComments([data[0], ...comments]); setUserName(""); setNewComment("") }
  }

  if (loading) return <div className="p-20 text-center">جاري التحميل...</div>
  if (!novel) return <div className="p-20 text-center text-stardust">الرواية غير موجودة</div>

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 text-stardust">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image src={novel.cover_url || "/placeholder.jpg"} alt={novel.title} fill className="object-cover" />
          </div>
          <div className="md:col-span-2 flex flex-col justify-center text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">{novel.title}</h1>
            <p className="text-xl text-purple-400 mb-6">الكاتب: {novel.author}</p>
            <StarRating rating={novel.rating} className="mb-8" />
            <p className="text-stardust text-lg leading-relaxed mb-10 bg-white/5 p-6 rounded-xl">{novel.description}</p>
            <a href={novel.pdf_url} target="_blank" rel="noopener noreferrer" className="space-button inline-flex items-center gap-2 self-start"><Download size={20} />تحميل ملف PDF</a>
          </div>
        </div>
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><MessageCircle size={24} className="text-purple-500" />آراء القراء</h2>
          <form onSubmit={handleCommentSubmit} className="luxury-card p-6 rounded-2xl mb-12 space-y-4">
            <input placeholder="اسمك المستعار" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:border-purple-500" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            <textarea placeholder="شاركنا رأيك في هذه الرواية..." className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:border-purple-500" rows={4} value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
            <button type="submit" className="space-button">نشر التعليق</button>
          </form>
          <div className="space-y-6">
            {comments.map((c) => (
              <div key={c.id} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-3 text-purple-400"><User size={18} /><span className="font-bold">{c.user_name}</span></div>
                <p className="text-stardust leading-relaxed">{c.comment}</p>
                <span className="text-xs text-lunar mt-4 block">{new Date(c.created_at).toLocaleDateString('ar-EG')}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
