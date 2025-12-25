import { useEffect, useState } from "react"
import { Code, Shield, Settings, Globe } from "lucide-react"
import { useLanguage } from "@/components/ui/language-provider"

export function SkillsSection() {
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

    const element = document.getElementById("skills")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    {
      icon: Code,
      title: t("skills.programming"),
      color: "primary",
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "PHP", level: 88 },
        { name: "Java", level: 80 },
        { name: "C++", level: 75 },
        { name: "Bash/Shell", level: 85 },
      ]
    },
    {
      icon: Shield,
      title: t("skills.cybersecurity"),
      color: "secondary",
      skills: [
        { name: "Penetration Testing", level: 92 },
        { name: "Vulnerability Assessment", level: 90 },
        { name: "Network Security", level: 88 },
        { name: "Web Security", level: 95 },
        { name: "Social Engineering", level: 85 },
        { name: "Forensics", level: 80 },
        { name: "Malware Analysis", level: 75 },
      ]
    },
    {
      icon: Settings,
      title: t("skills.tools"),
      color: "accent",
      skills: [
        { name: "Kali Linux", level: 95 },
        { name: "Metasploit", level: 90 },
        { name: "Burp Suite", level: 88 },
        { name: "Nmap", level: 92 },
        { name: "Wireshark", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Git/GitHub", level: 90 },
      ]
    },
    {
      icon: Globe,
      title: t("skills.languages"),
      color: "primary",
      skills: [
        { name: "Arabic", level: 100 },
        { name: "English", level: 90 },
      ]
    }
  ]

  const getColorClass = (color: string, type: "text" | "bg" | "border") => {
    const colorMap = {
      primary: {
        text: "text-primary",
        bg: "bg-primary",
        border: "border-primary"
      },
      secondary: {
        text: "text-secondary", 
        bg: "bg-secondary",
        border: "border-secondary"
      },
      accent: {
        text: "text-accent",
        bg: "bg-accent", 
        border: "border-accent"
      }
    }
    return colorMap[color as keyof typeof colorMap][type]
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="cyber-text">{t("skills.title")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`glass-card p-8 rounded-2xl hover-lift ${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${category.color} to-${category.color}-dark/50`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${getColorClass(category.color, "text")}`}>
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="space-y-2"
                    style={{ animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${category.color} to-${category.color}-dark rounded-full transition-all duration-1000 ease-out ${
                          isVisible ? "" : "w-0"
                        }`}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${categoryIndex * 0.2 + skillIndex * 0.1 + 0.5}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Cyber effect border */}
              <div className={`absolute inset-0 rounded-2xl border opacity-20 ${getColorClass(category.color, "border")} animate-cyber-pulse`} />
            </div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <div className={`mt-16 text-center ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
          <h3 className="text-2xl font-bold mb-8 cyber-text">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React", "Vue.js", "Node.js", "Express", "MongoDB", "MySQL", "PostgreSQL",
              "Redis", "AWS", "Linux", "Apache", "Nginx", "REST APIs", "GraphQL",
              "WordPress", "Laravel", "Django", "Flask", "TensorFlow", "OpenCV"
            ].map((tech, index) => (
              <span
                key={tech}
                className="glass-card px-4 py-2 rounded-full text-sm font-medium text-foreground hover-lift cursor-default"
                style={{ animationDelay: `${0.9 + index * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}