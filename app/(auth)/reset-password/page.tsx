"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordSchema } from "@/schemas"
import { Leaf, CheckCircle2, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { resetPassword } from "@/actions/auth"
import type * as z from "zod"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    if (!token) {
      setError("Invalid token!")
      return
    }

    setError("")
    setSuccess("")

    startTransition(() => {
      resetPassword(values, token).then((data) => {
        if (data?.error) {
          setError(data.error)
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          })
        }

        if (data?.success) {
          setSuccess(data.success)
          toast({
            title: "Success",
            description: data.success,
          })
        }
      })
    })
  }

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CCSA FarmAI</span>
            </Link>
            <h1 className="text-3xl font-bold">Reset Password</h1>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center py-4">
              <XCircle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-semibold mb-2">Invalid Token</h2>
              <p className="text-center mb-4">This password reset link is invalid or has expired.</p>
              <Button asChild className="mt-2">
                <Link href="/forgot-password">Request New Link</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CCSA FarmAI</span>
          </Link>
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-gray-500">Enter your new password below</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          {success ? (
            <div className="flex flex-col items-center justify-center py-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Password Reset!</h2>
              <p className="text-center mb-4">{success}</p>
              <Button asChild>
                <Link href="/login">Continue to Login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="********" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="********" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <div className="bg-destructive/15 p-3 rounded-md">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}
                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}
