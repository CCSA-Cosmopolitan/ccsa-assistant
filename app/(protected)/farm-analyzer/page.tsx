"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
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

export default function FarmAnalyzerPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)

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
      const result = await generateFarmAnalysis(values)

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
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Farm Analyzer</h1>
        <p className="text-muted-foreground">Analyze your farm's conditions to get personalized recommendations.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Farm Details</CardTitle>
            <CardDescription>Enter information about your farm to receive a detailed analysis.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="farmSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Size (hectares)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2.5" {...field} />
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
                        <FormLabel>Soil Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select soil type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="sandy">Sandy</SelectItem>
                            <SelectItem value="loamy">Loamy</SelectItem>
                            <SelectItem value="silty">Silty</SelectItem>
                            <SelectItem value="peaty">Peaty</SelectItem>
                            <SelectItem value="chalky">Chalky</SelectItem>
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
                        <FormLabel>Humidity (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 65" {...field} />
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
                        <FormLabel>Soil Moisture (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 40" {...field} />
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
                        <FormLabel>Average Temperature (°C)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 28" {...field} />
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
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Ibadan, Oyo State" {...field} />
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
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any other details about your farm that might be relevant..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Farm"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>Farm Analysis Results</CardTitle>
              <CardDescription>Based on the information provided, here's our analysis of your farm.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap">{analysis}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
