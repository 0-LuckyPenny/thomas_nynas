"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  ExternalLink,
  Github,
  Code,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Star,
  Layers,
  Cpu,
  Globe,
  Database,
  BookOpen,
  Share2,
  Shield,
  MessageSquare,
  Zap,
  Loader2,
} from "lucide-react"

// Project categories
const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "ai", name: "AI & ML", icon: <Cpu className="h-4 w-4" /> },
  { id: "web", name: "Web Dev", icon: <Globe className="h-4 w-4" /> },
]

// Project data
const projects = [
  {
    id: 1,
    title: "SaaS Marketing Analytics Dashboard",
    category: "web",
    description:
      "A comprehensive SaaS Marketing analytics platform with real-time data visualization, user management, and subscription tracking.",
    longDescription:
      "A full-featured SaaS Marketing analytics dashboard that provides businesses with real-time insights into user behavior, subscription metrics, and revenue analytics. Built with a modern tech stack and designed for scalability and performance.",
    technologies: ["React", "Python", "PostgreSQL", "Redis", "AWS", "AI", "Docker"],
    imageUrl: "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/tablet-J7Ghtw4llcBSyvAX9EnWBvGoX31seq.png",
    demoUrl: "https://manageplus.io/",
    githubUrl: "https://github.com/0-LuckyPenny",
    color: "from-blue-600 to-violet-600",
    featured: true,
    completed: "2022",
    teamSize: 32,
    difficulty: 7,
    achievements: [
      "Implemented real-time analytics with WebSockets and Redis",
      "Built a responsive dashboard with 20+ customizable widgets",
      "Integrated with Stripe for subscription management",
      "Deployed on AWS with auto-scaling capabilities",
    ],
    gallery:[
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/manageplus-detail-image1-6TfI7CVuiwUSVBFwrQwQxhldmdiMsh.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/manageplus-detail-image2-SVUa6nlqzbyvKD6cFqZXPmEAv2ql4G.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/manageplus-detail-image3-W7WfN8PpC7omJyGvZ5nFqI5JbkJofT.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/manageplus-detail-image4-LQYKjvncvjAPVEINs0fXcnOjx7R4Ex.png",
    ],
    challenges:"Building a SaaS marketing analytics dashboard requires integrating data from multiple sources, which can be streamlined using ETL pipelines and data warehouses. Performance challenges arise with large datasets, but caching, indexing, and real-time processing with Kafka or WebSockets help maintain speed. Ensuring security and multi-tenancy is crucial, which can be handled with role-based access control and proper database structuring.",
    implements:"A SaaS marketing dashboard aggregates data, optimizes performance with caching, and secures access with role-based controls.",
  },
  {
    id: 2,
    title: "E-Commerce Advertising Platform",
    category: "web",
    description:
      "An e-commerce advertising platform optimizes ad placement, targeting, and performance tracking",
    longDescription:
      "It leverages AI-driven analytics to provide real-time insights, helping advertisers maximize ROI through automated bidding and audience targeting. The platform integrates seamlessly with online marketplaces, social media, and search engines, ensuring broad visibility for products.",
    technologies: ["Next.js","Django", "AI", "TypeScript", "MongoDB", "Tailwind CSS", "Vercel"],
    imageUrl: "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/tablet1-6HYb26RV8u43rxv6bpAt9aOe9IhQFB.png",
    demoUrl: "https://golive.shop/",
    githubUrl: "https://github.com/0-LuckyPenny",
    color: "from-gray-100 to-red-600",
    featured: true,
    completed: "2024",
    teamSize: 4,
    difficulty: 7,
    achievements: [
      "Built a responsive e-commerce platform with 99% Lighthouse score",
      "Implemented secure payment processing with Stripe",
      "Created an admin dashboard for inventory management",
      "Optimized for SEO and performance",
    ],
    gallery:[
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/goliveshop-details-image1-akeELhXavAlRLkEF8x7dqy5KHW1ZKW.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/goliveshop-details-image2-CcoLmGDi2zDcghQoNG9HR7jgwSQ1oj.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/goliveshop-details-image3-GxM1Nlrio5M0LMKHFCiOF4vKFNgzMb.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/goliveshop-details-image4-dsuEycEaTmFgm49xFOhFVBOVXUN7KZ.png",
    ],
    challenges:"Integrating data from multiple sales channels and ensuring accurate targeting and personalization can be complex, requiring advanced machine learning algorithms. Additionally, efficiently managing ad budgets, performance tracking, and ensuring compliance with privacy regulations pose significant challenges.",
    implements:"Implemented real-time data synchronization from multiple sales channels and integrated machine learning algorithms for personalized ad targeting, optimizing campaign performance and ROI.",
  },
  {
    id: 4,
    title: "Shopping Site",
    category: "web",
    description:
      "SnapThePrice finds the best online deals by comparing prices across stores like Amazon and Walmart.",
    longDescription:
      "SnapThePrice compares prices across online stores like Amazon and Walmart, helping users find the best deals instantly. It earns commissions from affiliate links but provides unbiased price comparisons.",
    technologies: ["Vue.js", "Python", "AWS", "Docker", "Git"],
    imageUrl: "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/shopping-snaptheprice-Tqz7UJDkN1KoHftoR8VQVrCuiTzn0a.png",
    demoUrl: "https://snaptheprice.com",
    githubUrl: "https://github.com/",
    color: "from-blue-600 to-violet-600",
    featured: false,
    completed: "2023",
    teamSize: 3,
    difficulty: 5,
    achievements: [
      "Increased conversion rates by 20% through UX/UI optimizations and personalized recommendations.",
      "Reduced page load time by 40% by optimizing front-end and back-end performance.",
      "Implemented dynamic filtering and search, improving user interaction and reducing bounce rates.",
      "Streamlined the checkout process, reducing cart abandonment by 15%.",
    ],
    gallery:[
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/snap-details-image-1-OPXMJKZVpkFmADsrokmagQBmkZOXp0.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/snap-details-image-2-WuWtTrJYlhzsOA71FcRMmkPX9EwYBP.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/snap-details-image-3-nv9GqZ9j1urKwh63aofXIVLfqVlGeh.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/snap-details-image-4-3SjsNcm3mNVM6lZTflpk7ezI4HbqTA.png",
    ],
    challenges:"Managing accurate product search and filtering across a large inventory while maintaining fast load times can be challenging. Additionally, ensuring a seamless checkout process with real-time inventory updates and multiple payment methods requires robust integration and error handling.",
    implements:"Implemented an advanced search and filtering system using Elasticsearch to provide fast and accurate product searches, even with a large inventory.",
  },
  {
    id: 5,
    title: "Land Cover identification system",
    category: "ai",
    description: "End to End Promptable Semantic Segmentation project from traning to inferencing a model on LandCover.ai data",
    longDescription:
      "The project begins with data collection, where LandCover.ai's geospatial dataset is used, typically containing satellite imagery with labeled land cover classes. The next step is preprocessing, which includes data augmentation, resizing, and normalizing the images to prepare them for model training",
    technologies: ["Landcover", "ML", "Neural Network", "Machine Learning", "AI", "Deep Learning"],
    imageUrl: "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images-JfGOoIIfbct0bXy3pCSvTTDwqkBPgN.jpg",
    demoUrl: "#",
    githubUrl: "https://github.com/0-LuckyPenny/land-cover-semantic",
    color: "from-purple-600 to-pink-600",
    featured: false,
    completed: "2023",
    teamSize: 2,
    difficulty: 5,
    achievements: [
      "Enhanced land cover classification accuracy by 20% using advanced machine learning models.",
      "Reduced processing time by 35% through optimized image pre-processing techniques.",
      "Enabled the system to process high-resolution satellite images efficiently for large-scale mapping.",
      "Implemented real-time land cover updates, aiding in timely environmental decision-making.",
    ],
    gallery:[
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images%20%2831%29-xJaWzoWbyX6BfjUcpeIHewCcLSBEkH.jpg",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images%20%2832%29-NRUgrgpeW01ndrHShmQiz4X7fb42oq.jpg",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images%20%2833%29-aCFmHx2uhd7fawejDdubt8VHsdCv4e.jpg",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/land-13-00761-g019-H4A6RIPjxkmKmHqlxXUjyaMMQW1Ybn.jpg",
    ],
    challenges:"Ensuring the quality and resolution of satellite imagery to accurately identify land cover types across diverse environments is challenging. Additionally, building a model that minimizes classification errors and handles environmental variations effectively is crucial for reliable results.",
    implements:"Implemented a deep learning model with CNNs for land cover classification, using high-quality satellite imagery and geospatial analysis to enhance accuracy and handle environmental variations.",
  },
  {
    id: 6,
    title: "Face Clustering",
    category: "ai",
    description: "Automatically Group your Images by Faces with an end-to-end Artificial Intelligence App",
    longDescription:
      "An end-to-end Artificial Intelligence app designed to automatically group images by faces leverages deep learning and computer vision techniques to streamline the process of organizing and managing image collections.",
    technologies: ["Python", "OpenCV", "Deep Learning", "Face Detection", "Machine Learning"],
    imageUrl: "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images%20%2827%29-FhpUNWEqwg48rNJVYiSneYnF7Ng8p8.jpg",
    demoUrl: "#",
    githubUrl: "https://github.com/0-LuckyPenny/Face-Clustering",
    color: "from-green-600 to-teal-600",
    featured: false,
    completed: "2023",
    teamSize: 2,
    difficulty: 4,
    achievements: [
      "Reduced clustering time by 30% using DBSCAN for large datasets.",
      "Boosted face recognition accuracy by 25% with optimized embeddings",
      "Enabled seamless clustering for over 100,000 images.",
      "Implemented face clustering in real-time applications.",
    ],
    gallery:[
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/fcnn-8kqjRqLe6KhjGg3oBaVhoeKw2XBQmy.jpg",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images%20%2828%29-gJ9NRwZprCXLmPKNoKi4TPF15sT6nX.jpg",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images%20%2829%29-K5IzT9UDFBbsJXQf6Ka0md89aJrkLS.jpg",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/images%20%2830%29-rxRdrOVsdHbVUEITeYnhZ2ir31cVcE.jpg",
    ],
    challenges:"Dealing with variations in lighting, pose, and facial expression can make face clustering challenging, as it impacts the accuracy of the model. Additionally, efficiently clustering large datasets of faces while maintaining performance and scalability poses a significant challenge.",
    implements:"Implemented face clustering using facial embeddings from a pre-trained model like FaceNet and optimized the process with DBSCAN to efficiently handle varying features and large datasets.",
  },
  {
    id: 7,
    title: "Smart Watch Site",
    category: "web",
    description: "A Smart Watch site typically offers a range of smartwatches and related accessories, featuring product information, pricing, and reviews.",
    longDescription:
      " The site may highlight various smartwatch models, including fitness-focused devices, luxury smartwatches, or those with advanced features like heart rate monitoring, GPS, and compatibility with mobile apps. Users can browse product categories, compare features, read customer reviews, and find details about the technology behind the watches, including sensors, battery life, and connectivity options like Bluetooth.",
    technologies: ["Next.js","Django", "PostgreSQL", "AWS", "TypeScript", "Prisma"],
    imageUrl: "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/smart-watch-walmart-UmJvljJuKghU86W9ZOBFU4dIhcN6rS.png",
    demoUrl: "https://www.walmart.com/search?q=smart%20watch&typeahead=smar",
    githubUrl: "https://github.com/",
    color: "from-amber-600 to-orange-600",
    featured: false,
    completed: "2022",
    teamSize: 2,
    difficulty: 3,
    achievements: [
      "Improved site navigation and interface, resulting in a 30% increase in user engagement.",
      "Reduced page load times by 40% through code and image optimization techniques.",
      "Implemented personalized product recommendations, leading to a 25% boost in sales.",
      "Created a seamless mobile experience, increasing mobile traffic by 50%.",
    ],
    gallery:[
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/smart-watch-walmart-1-59LAG0wbsY1T6wdK3ZwBJ2iaAnXxmt.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/smart-watch-walmart-2-Vse62XZRITlXx0c2tsGOPujl7yrjzt.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/smart-watch-walmart-3-ot1qP5aL6Ni3vcm7vqaBjOA4u6um4Z.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/smart-watch-walmart-4-3ZD4cyc189cae4Hrj2q8TerH6SO4Z7.png"
    ],
    challenges:"Ensuring a seamless and responsive design across various device sizes and screen resolutions. Integrating real-time data synchronization between the website and smart watch APIs for accurate product display.",
    implements:"Utilized media queries and a flexible grid system to create a responsive design that adapts across devices.",
  },
  {
    id: 8,
    title: "Travel Site",
    category: "web",
    description: "A Travel site is an online platform that helps users plan, book, and organize their travel experiences.",
    longDescription:
      " It typically offers a variety of services such as flight bookings, hotel reservations, car rentals, and vacation packages. Users can search for destinations, compare prices, read reviews, and find recommendations on things to do, eat, and see in different cities or countries.",
    technologies: ["Django", "React", "Flask", "MongoDB", "Tailwind Css","Docker"],
    imageUrl: "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/travel-expedia-7eIruEjmxLJPiJlLIJxTrOcTjlKzK0.png",
    demoUrl: "https://expedia.com",
    githubUrl: "https://github.com/",
    color: "from-blue-600 to-cyan-600",
    featured: false,
    completed: "2022",
    teamSize: 1,
    difficulty: 3,
    achievements: [
      "Developed a personalized recommendation engine that increased user engagement by 25%.",
      "Implemented a robust review and rating system, enhancing trust and customer decision-making.",
      "Integrated location-based services, allowing users to discover nearby attractions and activities.",
      "Improved website performance, reducing load time by 50% and increasing conversion rates.",
    ],
    gallery:[
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/travel-details-image-1-toNPNTDiihU5sKG27UecbJkWMYen8D.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/travel-details-image-2-B9FnPXfIu3azorqXxom7mPf6GnYxRq.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/travel-details-image-3-qTo94oIJAYUR1LfbBFmqQMpGVKDRR3.png",
      "https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/projects-details-images/travel-details-image-4-j87fXBDHNKrnbUKeqZZBEW3jHutQr2.png",
    ],
    challenges:"Developed a travel booking site that integrated real-time data for availability and pricing, ensuring users had up-to-date information. Implemented scalable architecture to handle high traffic during peak seasons, optimizing performance and user experience.",
    implements:"Implemented real-time data integration for flights, hotels, and car rentals, optimized scalability with AWS, and enhanced user experience through dynamic search filters and interactive maps.",
  },
]

export default function RedesignedProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const isClient = useIsClient()

  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured)

  // Filter projects based on category
  const filteredProjects =
    selectedCategory === "all"
      ? projects.filter((project) => !project.featured)
      : projects.filter((project) => project.category === selectedCategory && !project.featured)

  const handleNext = () => {
    if (!isClient) return
    setDirection(1)
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const handlePrev = () => {
    if (!isClient) return
    setDirection(-1)
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const handleDemoClick = (url: string) => {
    if (!isClient) return
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    })
    window.open(url, "_blank")
  }

  // Simulate loading delay
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isClient])

  // If not client-side yet, show a loading state
  if (!isClient || isLoading) {
    return (
      <SectionContainer id="projects" className="relative">
        <SectionHeader
          title="Project Portfolio"
          subtitle="Explore my portfolio of AI, machine learning, and software development projects."
        />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading projects...</span>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer id="projects" className="relative">
      {/* Background image */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wp11346453.jpg-L5IbAPivNp7UoIl1jlD0Q0bx5EbdpG.jpeg"
          alt="Web Development Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeader
        title="Project Portfolio"
        subtitle="Explore my portfolio of AI, machine learning, and software development projects. Each project demonstrates different skills and technologies."
      />

      {featuredProjects.length > 0 && (
        <div className="mb-16 relative">
          {/* Add background image */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <Image src="/placeholder.svg?height=800&width=1600" alt="Background" fill className="object-cover" />
          </div>

          <ScrollReveal>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
              <Layers className="h-5 w-5 text-primary" />
              <span>Featured Projects</span>
            </h3>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-xl overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={featuredProjects[currentFeaturedIndex].id}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  exit={{
                    x: direction > 0 ? -1000 : 1000,
                    opacity: 0,
                    transition: {
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  className="relative w-full aspect-[16/9]"
                >
                  <div className="absolute inset-0 flex flex-col md:flex-row">
                    <div className="relative w-full h-48 md:h-auto md:w-1/2">
                      <Image
                        src={featuredProjects[currentFeaturedIndex].imageUrl || "/placeholder.svg"}
                        alt={featuredProjects[currentFeaturedIndex].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div
                      className={cn(
                        "w-full md:w-1/2 p-6 flex flex-col justify-center opacity-90 bg-gradient-to-r",
                        featuredProjects[currentFeaturedIndex].color,
                      )}
                    >
                      <Badge
                        variant="outline"
                        className="w-fit mb-4 bg-black/50 backdrop-blur-sm text-white border-white/20"
                      >
                        Featured Project
                      </Badge>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                        {featuredProjects[currentFeaturedIndex].title}
                      </h3>
                      <p className="text-white/90 mb-4 md:mb-6 text-sm md:text-base line-clamp-3 md:line-clamp-none">
                        {featuredProjects[currentFeaturedIndex].description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {featuredProjects[currentFeaturedIndex].technologies.slice(0, 3).map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {featuredProjects[currentFeaturedIndex].technologies.length > 3 && (
                          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                            +{featuredProjects[currentFeaturedIndex].technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          className="bg-white text-black hover:bg-white/90 group text-sm"
                          onClick={() => handleDemoClick(featuredProjects[currentFeaturedIndex].demoUrl)}
                        >
                          Live Demo
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>

                        <Button
                          variant="outline"
                          className="border-white text-white hover:bg-white/20 gap-2 text-sm"
                          asChild
                        >
                          <a
                            href={featuredProjects[currentFeaturedIndex].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            View Code
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          className="border-white text-white hover:bg-white/20 gap-2 text-sm"
                          onClick={() => {
                            setSelectedProject(featuredProjects[currentFeaturedIndex])
                            setIsDialogOpen(true)
                          }}
                        >
                          <Code className="h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls */}
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Progress dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentFeaturedIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
                    )}
                    onClick={() => {
                      setDirection(index > currentFeaturedIndex ? 1 : -1)
                      setCurrentFeaturedIndex(index)
                    }}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      )}

      <ScrollReveal>
        <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full">
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="flex justify-start gap-2 mb-8 bg-transparent w-max mx-auto">
              {projectCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all data-[state=active]:shadow-lg whitespace-nowrap",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80",
                  )}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {category.icon && category.icon}
                    <span>{category.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ErrorBoundary key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={() => {
                        console.log(1)
                        setSelectedProject(project)
                        setIsDialogOpen(true)
                      }}
                    />
                  </motion.div>
                </ErrorBoundary>
              ))}
            </AnimatePresence>
          </div>
        </Tabs>
      </ScrollReveal>

      {/* Project details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 w-[95vw]">
          {selectedProject && (
            <div className="flex flex-col h-full">
              <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">
                      {selectedProject.category === "ai"
                        ? "AI & Machine Learning"
                        // : selectedProject.category === "web"
                        //   ? "Web Development"
                          // : selectedProject.category === "data"
                          //   ? "Data Science"
                          //   : selectedProject.category === "audio"
                          //     ? "Audio & Voice Tech"
                              : "Web Development"}
                    </Badge>
                    <DialogTitle className="text-xl sm:text-2xl">{selectedProject.title}</DialogTitle>
                    <DialogDescription className="mt-2 text-sm">{selectedProject.description}</DialogDescription>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                <div className="px-4 sm:px-6 border-b">
                  <TabsList className="justify-start rounded-none bg-transparent h-10">
                    <TabsTrigger value="overview" className="text-sm">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="details" className="text-sm">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="text-sm">
                      Gallery
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold mb-3">Project Details</h4>
                        <p className="mb-6 text-sm sm:text-base">{selectedProject.longDescription}</p>

                        <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedProject.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-primary">✓</span>
                              </div>
                              <span className="text-sm sm:text-base">{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          <Button
                            variant="default"
                            className="gap-2"
                            onClick={() => handleDemoClick(selectedProject.demoUrl)}
                            disabled={selectedProject.category === "ai"}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </Button>
                          {selectedProject.category === "ai" ? (
                            <Button variant="outline" className="gap-2" asChild>
                              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          ) : (
                            <Button variant="outline" className="gap-2" disabled>
                              <Github className="h-4 w-4" />
                              GitHub
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3">Project Info</h4>
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Completed</span>
                            <span>{selectedProject.completed}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Team Size</span>
                            <span>{selectedProject.teamSize} people</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Difficulty</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0">
                    <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={selectedProject.imageUrl || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Project Description</h4>
                        <p className="text-sm sm:text-base">{selectedProject.longDescription}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Implementation Details</h4>
                        <p className="text-sm sm:text-base">
                          This project was implemented using {selectedProject.technologies.join(", ")}. <br/>
                          {selectedProject.implements}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Challenges & Solutions</h4>
                        <p className="text-sm sm:text-base">
                          {selectedProject.challenges}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.gallery.map((image,index) => (
                        <div key={index} className="overflow-hidden rounded-lg">
                          <Image
                            src={image}
                            alt={`${selectedProject.title} screenshot ${index}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionContainer>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  onSelect: () => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isClient = useIsClient()

  return (
    <Card
      className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isClient && isHovered ? "scale-110" : "scale-100",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-r",
            project.color,
          )}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={onSelect}>
            View Details
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-xs">
            {project.category === "ai"
              ? "AI & ML"
              : project.category === "web"
                ? "Web Dev"
                : project.category === "data"
                  ? "Data Science"
                  : project.category === "audio"
                    ? "Audio"
                    : "Research"}
          </Badge>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < project.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
              />
            ))}
          </div>
        </div>

        <h3 className="font-bold mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{project.completed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Team: {project.teamSize}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

