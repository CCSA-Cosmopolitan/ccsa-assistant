"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CreditCard } from "lucide-react"
import { getCountryByName, getCurrencySymbol } from "@/lib/countries"
import { updatePaymentGateway } from "@/actions/user"

interface PaymentFormProps {
  amount: number
  onSuccess?: () => void
  onCancel?: () => void
}

export function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const { data: session, update } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentGateway, setPaymentGateway] = useState<"paystack" | "stripe">("paystack")
  const [currency, setCurrency] = useState("NGN")
  const [currencySymbol, setCurrencySymbol] = useState("₦")

  useEffect(() => {
    if (session?.user) {
      // Set payment gateway based on user preference or country
      const userCountry = session.user.country || "Nigeria"
      const preferredGateway =
        session.user.preferredPaymentGateway || (userCountry === "Nigeria" ? "paystack" : "stripe")

      setPaymentGateway(preferredGateway as "paystack" | "stripe")

      // Set currency based on country
      const country = getCountryByName(userCountry)
      setCurrency(country.currency)
      setCurrencySymbol(getCurrencySymbol(country.currency))
    }
  }, [session])

  const handlePaymentGatewayChange = async (value: string) => {
    const gateway = value as "paystack" | "stripe"
    setPaymentGateway(gateway)

    try {
      const result = await updatePaymentGateway(gateway)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      // Update session
      await update()

      toast({
        title: "Success",
        description: "Payment gateway preference updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment gateway preference",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real implementation, we would integrate with the payment gateway
      // For this demo, we'll simulate a successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment Successful",
        description: `${currencySymbol}${amount} has been added to your wallet`,
      })

      onSuccess?.()
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "An error occurred while processing your payment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Add {currencySymbol}
          {amount} to your wallet using {paymentGateway === "paystack" ? "Paystack" : "Stripe"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Payment Gateway</Label>
            <RadioGroup
              value={paymentGateway}
              onValueChange={handlePaymentGatewayChange}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paystack" id="paystack" />
                <Label htmlFor="paystack" className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                    P
                  </div>
                  Paystack
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-purple-500 text-white flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                  Stripe
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input id="name" placeholder="John Doe" defaultValue={session?.user?.name || ""} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay {currencySymbol}
                {amount}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
