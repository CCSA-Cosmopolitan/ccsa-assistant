import { LoginForm } from "@/components/auth/login-form"
import { Leaf } from "lucide-react"
import { Suspense } from "react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg ring-1 ring-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
              <Leaf className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span className="text-[13px] uppercase tracking-[0.18em] text-slate-400">Center for</span>
              <span className="text-[15px] tracking-tight font-semibold text-white">Climate‑Smart Agriculture</span>
            </div>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-slate-400">Enter your email and password to access your farming dashboard</p>
          </div>
        </div>
        
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
          <Suspense fallback={
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent"></div>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
        
        <div className="text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
