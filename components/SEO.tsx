import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title: string
  description: string
  keywords: string
  ogImage?: string
}

export default function SEO({ title, description, keywords, ogImage }: SEOProps) {
  const router = useRouter()
  const canonicalUrl = `https://farmersassistant.ai${router.asPath}`
  const defaultOgImage = "https://farmersassistant.ai/og-image.jpg" // Replace with your default OG image

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage || defaultOgImage} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}

