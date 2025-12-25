import { useEffect, useState } from "react"
import { Mail, Phone, MessageCircle, Linkedin, Github, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/ui/language-provider"

export function ContactSection() {
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

    const element = document.getElementById("contact")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const contactMethods = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "amedelshab7@gmail.com",
      href: "mailto:amedelshab7@gmail.com",
      color: "primary",
      description: "Best for professional inquiries"
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+20 101 481 2328",
      href: "tel:01014812328",
      color: "secondary",
      description: "Direct line for urgent matters"
    },
    {
      icon: MessageCircle,
      label: t("contact.telegram"),
      value: "@Ghosteryly",
      href: "https://t.me/Ghosteryly",
      color: "accent",
      description: "Quick messaging and updates"
    },
    {
      icon: MessageCircle,
      label: t("contact.whatsapp"),
      value: "+20 101 481 2328",
      href: "https://wa.me/01014812328",
      color: "primary",
      description: "WhatsApp messaging"
    },
    {
      icon: Linkedin,
      label: t("contact.linkedin"),
      value: "Ahmed Al-Shabh",
      href: "https://www.linkedin.com/in/%D8%A7%D8%AD%D9%85%D8%AF-%D8%A7%D9%84%D8%B4%D8%A8%D8%AD-12aab0361/",
      color: "secondary",
      description: "Professional networking"
    },
    {
      icon: Github,
      label: t("contact.github"),
      value: "ELSHAB7UAHED",
      href: "https://github.com/ELSHAB7UAHED/",
      color: "accent",
      description: "Code repositories and projects"
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        border: "border-primary/30",
        bg: "bg-primary/10",
        text: "text-primary",
        icon: "text-primary"
      },
      secondary: {
        border: "border-secondary/30",
        bg: "bg-secondary/10",
        text: "text-secondary", 
        icon: "text-secondary"
      },
      accent: {
        border: "border-accent/30",
        bg: "bg-accent/10",
        text: "text-accent",
        icon: "text-accent"
      }
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="cyber-text">{t("contact.title")}</span>
          </h2>
          <h3 className="text-2xl font-semibold text-primary mb-4">
            {t("contact.subtitle")}
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => {
            const colors = getColorClasses(method.color)
            return (
              <div
                key={method.label}
                className={`glass-card p-6 rounded-2xl hover-lift border ${colors.border} ${isVisible ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                  <method.icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {method.label}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {method.description}
                </p>
                
                <p className={`font-medium mb-4 ${colors.text}`}>
                  {method.value}
                </p>
                
                <Button
                  onClick={() => window.open(method.href, "_blank")}
                  className="w-full glass hover:bg-glass-accent"
                  variant="outline"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Contact
                </Button>

                {/* Cyber Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border opacity-20 ${colors.border} animate-cyber-pulse`} />
              </div>
            )
          })}
        </div>

        {/* Additional Contact Info */}
        <div className={`mt-16 text-center ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
          <div className="glass-card p-8 rounded-2xl border border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 cyber-text">Let's Collaborate</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Whether you're interested in cybersecurity consulting, penetration testing services, 
              web development projects, or just want to discuss the latest security trends, 
              I'm always excited to connect with fellow security enthusiasts and professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.open("mailto:amedelshab7@gmail.com", "_blank")}
                className="bg-gradient-primary hover:scale-105 transform transition-all duration-300"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("https://t.me/Ghosteryly", "_blank")}
                className="glass hover:bg-glass-accent"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Message on Telegram
              </Button>
            </div>
          </div>
        </div>

        {/* Location & Availability */}
        <div className={`mt-12 ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "1s" }}>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-xl text-center">
              <h4 className="font-semibold mb-2 text-foreground">Location</h4>
              <p className="text-muted-foreground">Egypt 🇪🇬</p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <h4 className="font-semibold mb-2 text-foreground">Response Time</h4>
              <p className="text-muted-foreground">Usually within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}