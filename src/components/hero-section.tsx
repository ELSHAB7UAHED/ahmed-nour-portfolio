import { useEffect, useState } from "react"
import { ChevronDown, Github, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/ui/language-provider"
import ahmedImage from "@/assets/ahmed-nour.webp"

export function HeroSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="wave opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-particle-float" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-particle-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-accent rounded-full animate-particle-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-primary rounded-full animate-particle-float" style={{ animationDelay: "0.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className={`flex-1 text-center lg:text-left ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                <span className="cyber-text text-glow">{t("hero.title")}</span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground-secondary mb-6">
                {t("hero.subtitle")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                {t("hero.description")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-primary hover:scale-105 transform transition-all duration-300 cyber-glow"
              >
                {t("hero.cta.projects")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="glass-card hover:scale-105 transform transition-all duration-300"
              >
                {t("hero.cta.contact")}
              </Button>
            </div>

            {/* Quick Contact Icons */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift glass rounded-full"
                onClick={() => window.open("https://github.com/ELSHAB7UAHED/", "_blank")}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift glass rounded-full"
                onClick={() => window.open("mailto:amedelshab7@gmail.com", "_blank")}
              >
                <Mail className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift glass rounded-full"
                onClick={() => window.open("tel:01014812328", "_blank")}
              >
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`flex-1 flex justify-center ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-cyber-pulse" />
              
              {/* Image Container */}
              <div className="relative glass-card rounded-full p-2 animate-hero-float">
                <img
                  src={ahmedImage}
                  alt="Ahmed Nour Ahmed Abdel Hakeem"
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full object-cover"
                />
                
                {/* Cyber Border */}
                <div className="absolute inset-0 rounded-full border-2 border-primary opacity-50 animate-cyber-pulse" />
                <div className="absolute inset-0 rounded-full border border-secondary opacity-30 animate-cyber-pulse" style={{ animationDelay: "1s" }} />
              </div>

              {/* Floating Code Elements */}
              <div className="absolute -top-4 -right-4 glass-card p-2 rounded-lg animate-float" style={{ animationDelay: "2s" }}>
                <span className="text-xs font-jetbrains text-primary">{'<code/>'}</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-2 rounded-lg animate-float" style={{ animationDelay: "1.5s" }}>
                <span className="text-xs font-jetbrains text-secondary">{'{ }'}</span>
              </div>
              <div className="absolute top-1/2 -left-8 glass-card p-2 rounded-lg animate-float" style={{ animationDelay: "0.8s" }}>
                <span className="text-xs font-jetbrains text-accent">01010</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollToSection("about")}
            className="rounded-full hover:bg-glass-accent"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}