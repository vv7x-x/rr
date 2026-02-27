"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("فشل تسجيل الدخول. يرجى التحقق من البيانات.")
    } else {
      router.push("/admin")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="luxury-card p-8 rounded-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold glow-text mb-8 text-center">دخول المسؤول</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-lunar text-sm mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-purple-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lunar text-sm mb-2">كلمة المرور</label>
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-purple-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="space-button w-full"
            >
              {loading ? "جاري الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
