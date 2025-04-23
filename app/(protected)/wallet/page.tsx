"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { Loader2, Plus, CreditCard, History } from "lucide-react"
import { addFundsToWallet } from "@/actions/user"

export default function WalletPage() {
  const { data: session, update } = useSession()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to add to your wallet",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await addFundsToWallet(Number(amount))

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: result.success,
      })

      // Update session to reflect new balance
      await update()

      // Reset form
      setAmount("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add funds. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground">Manage your wallet balance and subscription.</p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{session?.user?.walletBalance || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Free Tier</div>
              <p className="text-xs text-muted-foreground">3/3 prompts used</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="add-funds" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="add-funds">
              <Plus className="mr-2 h-4 w-4" />
              Add Funds
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <History className="mr-2 h-4 w-4" />
              Transactions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="add-funds">
            <Card>
              <CardHeader>
                <CardTitle>Add Funds to Your Wallet</CardTitle>
                <CardDescription>Add funds to your wallet to use our premium AI features.</CardDescription>
              </CardHeader>
              <form onSubmit={handleAddFunds}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
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
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Funds
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View your recent transactions and subscription payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 text-center text-sm text-muted-foreground">No transactions found.</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>Upgrade your account to access unlimited AI features.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Standard Plan</h3>
                <p className="text-2xl font-bold">
                  ₦5,000<span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Unlimited AI prompts
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Advanced farm analysis
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Email support
                  </li>
                </ul>
                <Button className="mt-4 w-full">Subscribe</Button>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Premium Plan</h3>
                <p className="text-2xl font-bold">
                  ₦12,000<span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Everything in Standard
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Priority processing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    24/7 priority support
                  </li>
                </ul>
                <Button className="mt-4 w-full">Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
