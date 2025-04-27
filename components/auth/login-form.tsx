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
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <p className="text-sm text-yellow-800 mb-2">{emailVerification.message}</p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResendVerificationEmail}
                disabled={resendingEmail || emailResent}
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
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className=" border-primary" disabled={isPending} placeholder="john.doe@example.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} className=" border-primary" disabled={isPending} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        {!emailVerification && (
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        )}
      </form>
    </Form>
  )
}
