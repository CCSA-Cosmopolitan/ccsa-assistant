"use client"

import type * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { register } from "@/actions/auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countries } from "@/lib/countries"

export function RegisterForm() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      country: "Nigeria",
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data.error)
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          })
        }

        if (data?.success) {
          form.reset()
          setSuccess(data.success)
          toast({
            title: "Success",
            description: data.success,
          })
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {success ? (
          <div className="p-6 bg-emerald-500/10 ring-1 ring-emerald-500/20 rounded-xl flex flex-col items-center text-center space-y-3">
            <div className="bg-emerald-500/20 p-3 rounded-full">
              <Mail className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-emerald-200">Verification Email Sent</h3>
              <p className="text-sm text-emerald-300">{success}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20" 
                        disabled={isPending} 
                        placeholder="Enter your full name" 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
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
                        placeholder="Create a strong password" 
                        type="password" 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 font-medium">Country</FormLabel>
                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-emerald-400 focus:ring-emerald-400/20">
                          <SelectValue placeholder="Select your country" className="text-slate-400" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#0A0E13] border-white/10 max-h-[200px]">
                        {countries.map((country) => (
                          <SelectItem 
                            key={country.code} 
                            value={country.name}
                            className="text-slate-200 focus:bg-emerald-500/10 focus:text-emerald-200"
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 ring-1 ring-red-500/20 p-4 rounded-xl">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}
            
            <Button 
              disabled={isPending} 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create your account"
              )}
            </Button>
          </>
        )}
      </form>
    </Form>
  )
}
