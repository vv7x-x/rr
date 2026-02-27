"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Plus, Trash2, LogOut } from "lucide-react"
export default function AdminPage() {
  const [novels, setNovels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({ title: "", author: "", description: "", rating: 0 })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push("/login")
      else fetchNovels()
    }
    checkUser()
  }, [])

  async function fetchNovels() {
    const { data, error } = await supabase.from("novels").select("*").order("created_at", { ascending: false })
    if (!error && data) setNovels(data)
    setLoading(false)
  }

  async function uploadFile(file: File, bucket: string) {
    const fileName = `${Math.random()}-${file.name}`
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)
    if (error) throw error
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true)
    try {
      let cover_url = ""; let pdf_url = ""
      if (coverFile) cover_url = await uploadFile(coverFile, "novel-covers")
      if (pdfFile) pdf_url = await uploadFile(pdfFile, "novel-pdfs")
      const { error } = await supabase.from("novels").insert([{ ...formData, cover_url, pdf_url }])
      if (error) throw error
      setIsAdding(false); setFormData({ title: "", author: "", description: "", rating: 0 }); setCoverFile(null); setPdfFile(null); fetchNovels()
    } catch (err: any) { alert("Error: " + err.message) } finally { setSubmitting(false) }
  }

  async function handleDelete(id: string) {
    if (confirm("هل أنت متأكد من حذف هذه الرواية؟")) {
      const { error } = await supabase.from("novels").delete().eq("id", id)
      if (!error) fetchNovels()
    }
  }

  if (loading) return <div className="p-20 text-center">جاري التحميل...</div>

  return (
    <div className="min-h-screen p-4 md:p-8 bg-midnight text-stardust">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold glow-text">لوحة التحكم</h1>
          <div className="flex gap-4">
            <button onClick={() => setIsAdding(!isAdding)} className="space-button flex items-center gap-2"><Plus size={18} />إضافة رواية</button>
            <button onClick={async () => { await supabase.auth.signOut(); router.push("/login") }} className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-full flex items-center gap-2"><LogOut size={18} />خروج</button>
          </div>
        </div>
        {isAdding && (
          <div className="luxury-card p-6 rounded-2xl mb-10">
            <h2 className="text-xl font-bold mb-6">إضافة رواية جديدة</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input placeholder="اسم الرواية" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <input placeholder="اسم الكاتب" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
              <textarea placeholder="وصف مختصر" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 md:col-span-2" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <div><label className="block text-lunar text-sm mb-2">صورة الغلاف</label><input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} /></div>
              <div><label className="block text-lunar text-sm mb-2">ملف PDF</label><input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} /></div>
              <div className="md:col-span-2"><button type="submit" disabled={submitting} className="space-button w-full">{submitting ? "جاري الحفظ..." : "حفظ الرواية"}</button></div>
            </form>
          </div>
        )}
        <div className="grid gap-4">
          {novels.map((n) => (
            <div key={n.id} className="luxury-card p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={n.cover_url} className="w-12 h-16 object-cover rounded" alt="" />
                <div><h3 className="font-bold">{n.title}</h3><p className="text-sm text-lunar">{n.author}</p></div>
              </div>
              <button onClick={() => handleDelete(n.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={20} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
