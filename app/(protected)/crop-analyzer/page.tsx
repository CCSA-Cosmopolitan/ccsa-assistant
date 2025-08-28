"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UploadIcon as FileUpload, Loader2, Upload, X, Camera } from "lucide-react"
import Image from "next/image"
import { generateCropAnalysis } from "@/actions/ai"
import { Markdown } from "@/components/ui/markdown"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type AnalysisType = "general" | "disease" | "identification" | "planting" | "harvest" | "nutrition"

export default function CropAnalyzerPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analysisType, setAnalysisType] = useState<AnalysisType>("general")
  const [isDragging, setIsDragging] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      processImageFile(file)
    }
  }

  const processImageFile = (file: File) => {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file",
        variant: "destructive",
      })
      return
    }
    
    setIsImageLoading(true)
    setSelectedImage(file)
    
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsImageLoading(false)
      toast({
        title: "Image uploaded",
        description: "Your crop image has been uploaded successfully.",
      })
    }, 500)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      processImageFile(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const clearImage = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setAnalysis(null)
    setIsImageLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image of your crop or plant",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setAnalysis(null)

    try {
      // Convert image to base64 data URL
      const imageDataUrl = await convertImageToBase64(selectedImage)

      // Include the analysis type in the request
      const result = await generateCropAnalysis(imageDataUrl, analysisType)

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
        description: "Your crop analysis has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate crop analysis. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          // Get the full data URL for OpenAI Vision API
          const dataUrl = reader.result as string
          resolve(dataUrl)
        } else {
          reject(new Error("Failed to read file"))
        }
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsDataURL(file)
    })
  }

  const analysisTypeOptions = [
    { value: "general", label: "General Analysis" },
    { value: "disease", label: "Plant Disease Detection" },
    { value: "identification", label: "Plant Identification & Anatomy" },
    { value: "planting", label: "Planting Methods & Care" },
    { value: "harvest", label: "Harvest Timing & Methods" },
    { value: "nutrition", label: "Nutritional Value & Uses" },
  ]

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Crop Analyzer</h1>
        <p className="text-muted-foreground">
          Upload images of crops or plants to get AI-powered detailed analysis and information using OpenAI's vision technology.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>Upload a clear image of your crop or plant for analysis.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="crop-image">Crop Image</Label>
                <div
                  className={`relative w-full h-64 rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer ${
                    isDragging 
                      ? "border-primary bg-primary/10 scale-[1.02]" 
                      : previewUrl 
                        ? "border-border bg-background" 
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => !previewUrl && document.getElementById("crop-image")?.click()}
                >
                  {previewUrl ? (
                    <div className="relative h-full w-full group">
                      {isImageLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : (
                        <>
                          <Image
                            src={previewUrl}
                            alt="Crop preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  document.getElementById("crop-image")?.click()
                                }}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Change
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  clearImage()
                                }}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                          {selectedImage && (
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {selectedImage.name} ({Math.round(selectedImage.size / 1024)}KB)
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                      <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? "bg-primary text-primary-foreground" : "bg-accent"}`}>
                        <Camera className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {isDragging ? "Drop your image here" : "Upload crop image"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your image here, or click to browse
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Supports: JPG, PNG, WEBP</span>
                        <span>•</span>
                        <span>Max 5MB</span>
                      </div>
                    </div>
                  )}
                  <Input
                    id="crop-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="analysis-type">Analysis Type</Label>
                <Select value={analysisType} onValueChange={(value) => setAnalysisType(value as AnalysisType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    {analysisTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select the type of analysis you want to perform on your crop image.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !selectedImage}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Crop"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>Crop Analysis Results</CardTitle>
              <CardDescription>Based on the image provided, here's our analysis of your crop.</CardDescription>
            </CardHeader>
            <CardContent>
              <Markdown content={analysis} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
