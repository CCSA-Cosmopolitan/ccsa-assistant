"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Markdown } from "@/components/ui/markdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { FarmAnalyzerSchema } from "@/schemas"
import { Loader2 } from "lucide-react"
import { generateFarmAnalysis } from "@/actions/ai"
import { AiPageHeader } from "@/components/ai-page-header"

export default function FarmAnalyzerPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [language, setLanguage] = useState("english")

  const form = useForm<z.infer<typeof FarmAnalyzerSchema>>({
    resolver: zodResolver(FarmAnalyzerSchema),
    defaultValues: {
      farmSize: "",
      soilType: "",
      humidity: "",
      moisture: "",
      temperature: "",
      location: "",
      additionalInfo: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof FarmAnalyzerSchema>) => {
    setIsLoading(true)
    setAnalysis(null)

    try {
      const result = await generateFarmAnalysis(values, language)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      setAnalysis(result.text || null)

      toast({
        title: "Analysis Complete",
        description: "Your farm analysis has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate farm analysis. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full mx-auto flex flex-col bg-[#0A0E13] text-slate-200">
      {/* Backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(16,185,129,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_10%,rgba(99,102,241,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_90%,rgba(14,165,233,0.06),transparent_60%)]"></div>
      </div>
      
      <AiPageHeader
        title="Farm Analyzer"
        description="Analyze your farm's conditions to get personalized recommendations"
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="flex-1 container py-6 max-w-4xl mx-auto px-4 md:px-6">
        <div className="grid gap-6">
          {analysis && (
            <div className="rounded-2xl ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-transparent p-2">
              <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-1 bg-emerald-400 rounded-full"></div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Farm Analysis Results</h3>
                </div>
                <p className="text-slate-400 mb-4">Based on the information provided, here's our analysis of your farm.</p>
                <div className="prose max-w-none dark:prose-invert">
                  <Markdown content={analysis} animationSpeed={5} revealImmediately={false} />
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-transparent p-2">
            <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-emerald-400 rounded-full"></div>
                <h3 className="text-lg md:text-xl font-semibold text-white">Farm Details</h3>
              </div>
              <p className="text-slate-400 mb-6">Enter information about your farm to receive a detailed analysis.</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="farmSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Farm Size (hectares)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 2.5"
                              className="bg-[#0A0E13] border-white/20 text-white placeholder:text-slate-500 focus:border-emerald-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="soilType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Soil Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#0A0E13] border-white/20 text-white focus:border-emerald-400">
                                <SelectValue placeholder="Select soil type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0B1117] border-white/20">
                              <SelectItem value="clay" className="text-white hover:bg-white/10">Clay</SelectItem>
                              <SelectItem value="sandy" className="text-white hover:bg-white/10">Sandy</SelectItem>
                              <SelectItem value="loamy" className="text-white hover:bg-white/10">Loamy</SelectItem>
                              <SelectItem value="silty" className="text-white hover:bg-white/10">Silty</SelectItem>
                              <SelectItem value="peaty" className="text-white hover:bg-white/10">Peaty</SelectItem>
                              <SelectItem value="chalky" className="text-white hover:bg-white/10">Chalky</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="humidity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Humidity (%)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 65"
                              className="bg-[#0A0E13] border-white/20 text-white placeholder:text-slate-500 focus:border-emerald-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="moisture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Soil Moisture (%)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 40"
                              className="bg-[#0A0E13] border-white/20 text-white placeholder:text-slate-500 focus:border-emerald-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Average Temperature (°C)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 28"
                              className="bg-[#0A0E13] border-white/20 text-white placeholder:text-slate-500 focus:border-emerald-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Ibadan, Oyo State"
                              className="bg-[#0A0E13] border-white/20 text-white placeholder:text-slate-500 focus:border-emerald-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other details about your farm that might be relevant..."
                            className="min-h-[100px] bg-[#0A0E13] border-white/20 text-white placeholder:text-slate-500 focus:border-emerald-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Farm"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
