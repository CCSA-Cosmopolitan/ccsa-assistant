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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CCSA FarmAI</span>
          </Link>
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-gray-500">Enter your email to receive a password reset link</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          {success ? (
            <div className="p-4 bg-green-50 border border-green-100 rounded-md flex flex-col items-center text-center">
              <div className="mb-2 bg-green-100 p-2 rounded-full">
                <Mail className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="font-medium text-green-800">Email Sent</h3>
              <p className="text-sm text-green-700 mt-1">{success}</p>
              <Button asChild variant="link" className="mt-2">
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="john.doe@example.com" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                  <Button variant="ghost" asChild className="w-full">
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
