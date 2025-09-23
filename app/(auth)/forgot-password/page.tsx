"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema } from "@/schemas"
import { Leaf, Mail, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { forgotPassword } from "@/actions/auth"
import type * as z from "zod"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setSuccess("")

    startTransition(() => {
      forgotPassword(values.email).then((data) => {
        if (data?.success) {
          setSuccess(data.success)
          form.reset()
        }

        toast({
          title: "Email Sent",
          description: "If your email is registered, you will receive a reset link.",
        })
      })
    })
  }

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
            <h1 className="text-3xl font-bold text-white">Reset your password</h1>
            <p className="text-slate-400">Enter your email to receive a password reset link</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
          {success ? (
            <div className="p-6 bg-emerald-500/10 ring-1 ring-emerald-500/20 rounded-xl flex flex-col items-center text-center space-y-3">
              <div className="bg-emerald-500/20 p-3 rounded-full">
                <Mail className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-emerald-200">Reset Link Sent</h3>
                <p className="text-sm text-emerald-300">{success}</p>
              </div>
              <Button asChild variant="ghost" className="mt-4 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                <Link href="/login">Back to login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={isPending} 
                          placeholder="john.doe@example.com" 
                          type="email"
                          className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button 
                    disabled={isPending} 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className="w-full text-slate-300 hover:text-white hover:bg-white/5"
                  >
                    <Link href="/login">Back to login</Link>
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}
