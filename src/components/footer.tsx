import { Heart, Code, Shield } from "lucide-react"
import { useLanguage } from "@/components/ui/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative py-12 border-t border-glass-border">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">AN</span>
            </div>
            <span className="text-xl font-bold cyber-text">Ahmed Nour</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {t("footer.built")}
          </p>

          {/* Tech Icons */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center gap-2 text-primary">
              <Code className="h-5 w-5" />
              <span className="text-sm font-medium">Developer</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Security Expert</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Innovator</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-glass-border pt-6">
            <p className="text-sm text-muted-foreground">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}