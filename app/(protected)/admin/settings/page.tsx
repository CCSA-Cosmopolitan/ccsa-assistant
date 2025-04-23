"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required.",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

const apiSettingsSchema = z.object({
  openaiApiKey: z.string().min(1, {
    message: "OpenAI API key is required.",
  }),
  resendApiKey: z.string().min(1, {
    message: "Resend API key is required.",
  }),
  awsAccessKey: z.string().min(1, {
    message: "AWS access key is required.",
  }),
  awsSecretKey: z.string().min(1, {
    message: "AWS secret key is required.",
  }),
  awsBucketName: z.string().min(1, {
    message: "AWS bucket name is required.",
  }),
})

const generalSettingsSchema = z.object({
  siteName: z.string().min(1, {
    message: "Site name is required.",
  }),
  siteDescription: z.string().min(1, {
    message: "Site description is required.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  maintenanceMode: z.boolean().default(false),
})

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [isGeneralLoading, setIsGeneralLoading] = useState(false)

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const apiSettingsForm = useForm<z.infer<typeof apiSettingsSchema>>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: {
      openaiApiKey: process.env.OPENAI_API_KEY || "",
      resendApiKey: process.env.RESEND_API_KEY || "",
      awsAccessKey: process.env.AWS_ACCESS_KEY || "",
      awsSecretKey: process.env.AWS_SECRET_KEY || "",
      awsBucketName: process.env.AWS_BUCKET_NAME || "",
    },
  })

  const generalSettingsForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "CCSA FarmAI",
      siteDescription: "Revolutionizing farming in Nigeria with AI-powered insights and analysis.",
      contactEmail: "contact@ccsafarmai.com",
      maintenanceMode: false,
    },
  })

  const onPasswordSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
    setIsPasswordLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      })

      // Reset form
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const onApiSettingsSubmit = async (values: z.infer<typeof apiSettingsSchema>) => {
    setIsApiLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "API Settings Updated",
        description: "API settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update API settings. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsApiLoading(false)
    }
  }

  const onGeneralSettingsSubmit = async (values: z.infer<typeof generalSettingsSchema>) => {
    setIsGeneralLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "General Settings Updated",
        description: "General settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update general settings. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsGeneralLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Manage system settings and configurations.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general site settings.</CardDescription>
            </CardHeader>
            <Form {...generalSettingsForm}>
              <form onSubmit={generalSettingsForm.handleSubmit(onGeneralSettingsSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={generalSettingsForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={generalSettingsForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={generalSettingsForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={generalSettingsForm.control}
                    name="maintenanceMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Maintenance Mode</FormLabel>
                          <FormDescription>
                            Put the site in maintenance mode. Only admins will be able to access the site.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isGeneralLoading}>
                    {isGeneralLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure API keys and external service integrations.</CardDescription>
            </CardHeader>
            <Form {...apiSettingsForm}>
              <form onSubmit={apiSettingsForm.handleSubmit(onApiSettingsSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={apiSettingsForm.control}
                    name="openaiApiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OpenAI API Key</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormDescription>Used for AI features like the Farmers Assistant.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={apiSettingsForm.control}
                    name="resendApiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resend API Key</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormDescription>Used for sending emails to users.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">AWS S3 Configuration</h3>
                    <div className="space-y-4">
                      <FormField
                        control={apiSettingsForm.control}
                        name="awsAccessKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AWS Access Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={apiSettingsForm.control}
                        name="awsSecretKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AWS Secret Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={apiSettingsForm.control}
                        name="awsBucketName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>S3 Bucket Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isApiLoading}>
                    {isApiLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save API Settings"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your admin account password.</CardDescription>
            </CardHeader>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isPasswordLoading}>
                    {isPasswordLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
