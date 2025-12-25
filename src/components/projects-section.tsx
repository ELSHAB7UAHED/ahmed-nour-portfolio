import { useEffect, useState } from "react"
import { ExternalLink, Github, Shield, Wifi, Ghost, Skull, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/ui/language-provider"

export function ProjectsSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById("projects")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      name: "GHOST",
      description: "Advanced penetration testing framework with automated vulnerability scanning and exploitation capabilities.",
      icon: Ghost,
      tech: ["Python", "Metasploit", "Nmap"],
      status: "Published",
      github: "https://github.com/ELSHAB7UAHED/",
      website: "https://ghost13.odoo.com",
      color: "primary"
    },
    {
      name: "SKULLPATCH",
      description: "Comprehensive security auditing tool for network infrastructure and web application testing.",
      icon: Skull,
      tech: ["Python", "Scapy", "Requests"],
      status: "Published",
      github: "https://github.com/ELSHAB7UAHED/",
      website: "https://ghost13.odoo.com",
      color: "secondary"
    },
    {
      name: "WiFiGhost",
      description: "WiFi security assessment tool for wireless network penetration testing and analysis.",
      icon: Wifi,
      tech: ["Python", "Aircrack-ng", "Wireless"],
      status: "Coming Soon",
      github: "https://github.com/ELSHAB7UAHED/",
      color: "accent"
    },
    {
      name: "GhostCracker",
      description: "Hash cracking and password security analysis tool with multiple attack vectors.",
      icon: Shield,
      tech: ["Python", "Hashcat", "Wordlists"],
      status: "Coming Soon",
      github: "https://github.com/ELSHAB7UAHED/",
      color: "primary"
    },
    {
      name: "BARA",
      description: "Web application security scanner with automated SQL injection and XSS detection.",
      icon: Package,
      tech: ["Python", "Selenium", "BeautifulSoup"],
      status: "Development",
      github: "https://github.com/ELSHAB7UAHED/",
      color: "secondary"
    },
    {
      name: "pipy",
      description: "Python package manager enhancement tool for security-focused development environments.",
      icon: Package,
      tech: ["Python", "pip", "Security"],
      status: "Published",
      github: "https://github.com/ELSHAB7UAHED/",
      color: "accent"
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        border: "border-primary/30",
        bg: "bg-primary/10",
        text: "text-primary",
        button: "bg-primary hover:bg-primary-dark"
      },
      secondary: {
        border: "border-secondary/30",
        bg: "bg-secondary/10", 
        text: "text-secondary",
        button: "bg-secondary hover:bg-secondary-dark"
      },
      accent: {
        border: "border-accent/30",
        bg: "bg-accent/10",
        text: "text-accent", 
        button: "bg-accent hover:bg-accent-dark"
      }
    }
    return colorMap[color as keyof typeof colorMap]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-accent text-accent-foreground"
      case "Coming Soon":
        return "bg-secondary text-secondary-foreground"
      case "Development":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="cyber-text">{t("projects.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const colors = getColorClasses(project.color)
            return (
              <div
                key={project.name}
                className={`glass-card p-6 rounded-2xl hover-lift border ${colors.border} ${isVisible ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.bg}`}>
                    <project.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.name}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.github, "_blank")}
                    className="flex-1 glass hover:bg-glass-accent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    {t("projects.github")}
                  </Button>
                  {project.website && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.website, "_blank")}
                      className={`flex-1 ${colors.button} text-white`}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("projects.website")}
                    </Button>
                  )}
                </div>

                {/* Cyber Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border opacity-20 ${colors.border} animate-cyber-pulse`} />
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className={`mt-16 text-center ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
          <div className="glass-card p-8 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 cyber-text">More Tools Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              I'm constantly developing new security tools and utilities. Visit my GitHub for the latest updates and releases.
            </p>
            <Button
              size="lg"
              onClick={() => window.open("https://github.com/ELSHAB7UAHED/", "_blank")}
              className="bg-gradient-primary hover:scale-105 transform transition-all duration-300"
            >
              <Github className="h-5 w-5 mr-2" />
              {t("projects.viewAll")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}