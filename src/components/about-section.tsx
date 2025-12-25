import { useEffect, useState } from "react"
import { Calendar, MapPin, GraduationCap, Code, Shield } from "lucide-react"
import { useLanguage } from "@/components/ui/language-provider"

export function AboutSection() {
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

    const element = document.getElementById("about")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Calendar, label: "Age", value: "17", color: "text-primary" },
    { icon: MapPin, label: "Location", value: "Egypt", color: "text-secondary" },
    { icon: GraduationCap, label: "Education", value: "High School", color: "text-accent" },
    { icon: Code, label: "Languages", value: "6+", color: "text-primary" },
    { icon: Shield, label: "Security Tools", value: "7+", color: "text-secondary" },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="cyber-text">{t("about.title")}</span>
          </h2>
          <p className="text-xl text-primary font-semibold">
            {t("about.intro")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Stats Grid */}
          <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card p-6 rounded-2xl hover-lift text-center"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Cards */}
            <div className="mt-8 space-y-4">
              <div className="glass-card p-4 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Born: February 11, 2008</span>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-secondary/20">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-secondary" />
                  <span className="text-foreground">Third Year High School Student</span>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Started Cybersecurity at Age 14</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`space-y-6 ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 cyber-text">My Journey</h3>
              <div className="space-y-4 text-foreground-secondary leading-relaxed">
                <p>{t("about.content1")}</p>
                <p>{t("about.content2")}</p>
                <p>{t("about.content3")}</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card p-6 rounded-2xl border border-primary/20">
              <h4 className="text-lg font-semibold mb-4 text-primary">Key Achievements</h4>
              <ul className="space-y-2 text-foreground-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Developed 7+ penetration testing tools
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Designed 16+ professional websites
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Mastered 6+ programming languages
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Published tools on ghost13.odoo.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}