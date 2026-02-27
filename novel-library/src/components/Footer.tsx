export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 mt-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lunar text-sm mb-2">تم التصميم بحب لخدمة الأدب العربي والخيال</p>
        <p className="text-stardust/50 text-xs">© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
      </div>
    </footer>
  )
}
