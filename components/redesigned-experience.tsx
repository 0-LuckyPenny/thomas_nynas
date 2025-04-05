"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  Target,
} from "lucide-react"

// Experience data
const experiences = [
  {
    id: "rfc",
    title: "Senior  Full Stack Python Engineer",
    company: "AlfaHive",
    location: "Big Sky, MT, USA",
    period: "Jun 2022 - Present",
    type: "Remote Work",
    description:
    "Led the creation of high-performance web applications with AI-powered features, crafted seamless APIs for better integration, optimized deployment processes for faster delivery, and mentored junior developers, driving team success and innovation.",
    responsibilities: [
      "Led the development of scalable web applications, improving overall performance and reducing system latency.",
      "Designed and implemented APIs, ensuring seamless communication between services and enhancing user experience.",
      "Optimized deployment processes, resulting in faster delivery times and more reliable updates.",
      "Mentored junior developers, fostering team growth and improving overall productivity and collaboration.",
    ],
    skills : ["Python","Django", "AI", "Machine Learning", "AWS", "Docker", "React", "Next.js"],
    metrics: [
      { value: "40+", label: "Community Centers" },
      { value: "20,000+", label: "Residents impacted" },
      { value: "10", label: "Team Size" },
    ],
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "success-academy",
    title: "Full Stack Python Engineer",
    company: "Panassonic North America",
    location: "Newark, New Jersey, USA",
    period: "July 2019 - May 2022",
    type: "Remote Work",
    description:
      "developed scalable web applications, designed APIs, optimized backend processes, automated deployment, mentored junior developers, and integrated AI solutions to drive innovation.",
    responsibilities: [
      "Developed and maintained scalable web applications, ensuring smooth integration between frontend and backend systems to meet business requirements.",
      "Designed and implemented robust APIs, optimizing data flow and enabling seamless communication between services.",
      "Collaborated with cross-functional teams, including UI/UX designers and product managers, to deliver high-quality, user-centered features.",
      "Implemented AI-driven solutions, contributing to product innovation by integrating machine learning algorithms and improving data analysis capabilities.",
    ],
    skills: ["Python", "React", "Vue.js", "TensorFlow", "PyTorch", "Jenkins", "AWS", "PyTest"],
    metrics: [
      { value: "150+", label: "Students" },
      { value: "32", label: "Team Size" },
      { value: "95%", label: "Pass Rate" },
    ],
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "research-assistant",
    title: "Research Assistant",
    company: "Alderson Broaddus University",
    location: "Phillipi, West Virginia",
    period: "Apr 2016 - May 2019",
    type: "education",
    description:
      "Improved university applications by integrating AI, mentoring developers, and optimizing backend performance for a better learning experience.",
    responsibilities: [
      "Researched and implemented new technologies to improve university applications",
      "Integrated AI and machine learning for personalized learning and data analysis.",
      "Contributed to the development of engaging e-learning platforms.",
      "Collaborated with faculty and students to understand learning needs.",
    ],
    skills: ["Python", "Data Analysis", "Operating Systems", "Scientific Computing", "Data Structures and Algorithms"],
    metrics: [
      { value: "3", label: "Publications" },
      { value: "5", label: "Conferences" },
      { value: "2", label: "Research Grants" },
    ],
    color: "from-blue-600 to-cyan-600",
  },
]

export default function RedesignedExperience() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [experienceType, setExperienceType] = useState<"all" | "work" | "education">("all")

  const toggleExpand = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id)
  }

  // Filter experiences based on type
  const filteredExperiences =
    experienceType === "all" ? experiences : experiences.filter((exp) => exp.type === experienceType)

  return (
    <SectionContainer id="experience" className="bg-gradient-to-b from-background/95 to-background">
      <SectionHeader
        title="Professional Journey"
        subtitle="My professional experiences and career highlights in AI development, education, and community building."
      />

      <ScrollReveal>
        <Tabs
          defaultValue="all"
          onValueChange={(value) => setExperienceType(value as "all" | "work" | "education")}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="flex justify-center gap-2 mb-8 bg-transparent w-fit mx-auto">
              <TabsTrigger
                value="all"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "all" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <span>All Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="Remote Work"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "work" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Work Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="education"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "education" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            {filteredExperiences.map((experience, index) => (
              <ErrorBoundary key={experience.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={cn("overflow-hidden border-none shadow-lg relative", `bg-gradient-to-br ${experience.color}/10`)}
                  >
                    {/* <img src="https://tvjrf8ogpgevtyum.public.blob.vercel-storage.com/Thomas_portfolio_images/human/python-course-training-in-delhi-fAzpAfd7gX0IZyF64NtHRVHKdQMUW4.png" className="w-[200px] absolute z-1 right-0"></img> */}
                    <CardContent className="p-0 z-10">
                      <div
                        className={cn(
                          "p-4 sm:p-6 cursor-pointer transition-all duration-300",
                          expandedExperience === experience.id ? "pb-3" : "",
                        )}
                        onClick={() => toggleExpand(experience.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <Badge
                              className={cn(
                                "mb-2 px-3 py-1",
                                experience.type === "work"
                                  ? "bg-blue-500/20 text-blue-500 border-blue-500/30"
                                  : "bg-amber-500/20 text-amber-500 border-amber-500/30",
                              )}
                            >
                              {experience.type === "work" ? (
                                <Briefcase className="h-3 w-3 mr-1" />
                              ) : (
                                <GraduationCap className="h-3 w-3 mr-1" />
                              )}
                              {experience.type === "Remote Work" ? "Work Experience" : "Education"}
                            </Badge>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              {experience.title}
                              <motion.div
                                animate={{ rotate: expandedExperience === experience.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {expandedExperience === experience.id ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                              </motion.div>
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                <span>{experience.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{experience.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{experience.period}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground">{experience.description}</p>
                      </div>

                      <AnimatePresence>
                        {expandedExperience === experience.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-6 pb-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t">
                                <div>
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Key Responsibilities
                                  </h4>
                                  <ul className="space-y-2">
                                    {experience.responsibilities.map((responsibility, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                          <span className="text-xs text-primary">✓</span>
                                        </div>
                                        <span className="text-sm sm:text-base">{responsibility}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                      <Users className="h-5 w-5 text-primary" />
                                      Skills Applied
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {experience.skills.map((skill, i) => (
                                        <Badge key={i} variant="secondary">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    Key Metrics & Achievements
                                  </h4>

                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                    {experience.metrics.map((metric, i) => (
                                      <div key={i} className="bg-primary/10 rounded-lg p-3 text-center">
                                        <div className="text-xl sm:text-2xl font-bold">{metric.value}</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">{metric.label}</div>
                                      </div>
                                    ))}
                                  </div>

                                  {experience.type === "work" && (
                                    <div className="mt-4">
                                      <Button variant="outline" className="w-full">
                                        View Reference Letter
                                      </Button>
                                    </div>
                                  )}

                                  {experience.type === "education" && (
                                    <div className="mt-4">
                                      <Button variant="outline" className="w-full">
                                        View Transcript
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </ErrorBoundary>
            ))}
          </div>
        </Tabs>
      </ScrollReveal>
    </SectionContainer>
  )
}

