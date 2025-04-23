"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { verifyEmail } from "@/actions/auth"
import { Leaf, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token!")
      setIsLoading(false)
      return
    }

    try {
      const result = await verifyEmail(token)

      if (result.error) {
        setError(result.error)
      }

      if (result.success) {
        setSuccess(result.success)
      }
    } catch (error) {
      setError("Something went wrong!")
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CCSA FarmAI</span>
          </Link>
          <h1 className="text-3xl font-bold">Email Verification</h1>
          <p className="text-gray-500">Verifying your email address...</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p>Verifying your email address...</p>
            </div>
          )}

          {!isLoading && success && (
            <div className="flex flex-col items-center justify-center py-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
              <p className="text-center mb-4">{success}</p>
              <Button asChild>
                <Link href="/login">Continue to Login</Link>
              </Button>
            </div>
          )}

          {!isLoading && error && (
            <div className="flex flex-col items-center justify-center py-4">
              <XCircle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
              <p className="text-center mb-4">{error}</p>
              <Button asChild>
                <Link href="/login">Back to Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
