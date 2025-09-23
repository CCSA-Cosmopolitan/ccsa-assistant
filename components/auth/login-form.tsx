"use client"

import type * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import { login, resendVerificationEmail } from "@/actions/auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Check, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [emailVerification, setEmailVerification] = useState<{
    email: string
    message: string
  } | null>(null)

  const [resendingEmail, setResendingEmail] = useState(false)
  const [emailResent, setEmailResent] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setEmailVerification(null)

    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          setError(data.error)
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          })
        }

        if (data?.emailVerification) {
          setEmailVerification({
            email: values.email,
            message: data.message || "Please verify your email to continue.",
          })
        }

        if (data?.success) {
          // Use client side signIn after server validation
          signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: data.redirect || "/dashboard",
            redirect: true,
          })
        }
      })
    })
  }

  const handleResendVerificationEmail = () => {
    if (!emailVerification?.email) return

    setResendingEmail(true)

    resendVerificationEmail(emailVerification.email)
      .then((data) => {
        if (data.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          })
        }

        if (data.success) {
          setEmailResent(true)
          toast({
            title: "Success",
            description: "Verification email resent!",
          })
        }
      })
      .finally(() => {
        setResendingEmail(false)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {emailVerification ? (
          <div className="bg-amber-500/10 ring-1 ring-amber-500/20 p-4 rounded-xl">
            <p className="text-sm text-amber-200 mb-3">{emailVerification.message}</p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResendVerificationEmail}
                disabled={resendingEmail || emailResent}
                className="border-amber-500/30 text-amber-200 hover:bg-amber-500/10"
              >
                {resendingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : emailResent ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Email Sent
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-medium">Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20" 
                      disabled={isPending} 
                      placeholder="john.doe@example.com" 
                      type="email" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200 font-medium">Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20" 
                      disabled={isPending} 
                      placeholder="Enter your password" 
                      type="password" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        )}
        
        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            Forgot password?
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-500/10 ring-1 ring-red-500/20 p-4 rounded-xl">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}
        
        {!emailVerification && (
          <Button 
            disabled={isPending} 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in to your account"
            )}
          </Button>
        )}
      </form>
    </Form>
  )
}
