import { createContext, useContext, useState } from "react"

type Language = "en" | "ar"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills", 
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    
    // Hero Section
    "hero.title": "Ahmed Nour Ahmed Abdel Hakeem",
    "hero.subtitle": "Cybersecurity Expert & Penetration Testing Developer",
    "hero.description": "17-year-old security researcher from Egypt, mastering 6+ programming languages and developing ethical hacking tools since age 14.",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Get In Touch",
    
    // About Section
    "about.title": "About Me",
    "about.intro": "Passionate Security Researcher",
    "about.content1": "I'm Ahmed Nour, a 17-year-old cybersecurity enthusiast from Egypt, currently in my final year of high school. Born on February 11, 2008, I discovered my passion for cybersecurity and programming at the age of 14.",
    "about.content2": "Since then, I've developed expertise in multiple programming languages and created numerous penetration testing tools. My journey in cybersecurity has led me to become proficient in ethical hacking, vulnerability assessment, and security tool development.",
    "about.content3": "I'm also an experienced web designer with over 16 successful projects under my belt, combining my technical skills with creative design to deliver exceptional digital experiences.",
    
    // Skills Section
    "skills.title": "Technical Skills",
    "skills.programming": "Programming Languages",
    "skills.cybersecurity": "Cybersecurity",
    "skills.tools": "Tools & Technologies",
    "skills.languages": "Languages",
    
    // Projects Section
    "projects.title": "My Projects",
    "projects.description": "Innovative security tools and penetration testing utilities I've developed",
    "projects.viewAll": "View All Tools",
    "projects.github": "GitHub",
    "projects.website": "Website",
    
    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's Connect",
    "contact.description": "Ready to collaborate on cybersecurity projects or discuss potential opportunities? I'm always excited to connect with fellow security enthusiasts and professionals.",
    "contact.email": "Email",
    "contact.phone": "Phone", 
    "contact.telegram": "Telegram",
    "contact.whatsapp": "WhatsApp",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
    
    // Footer
    "footer.copyright": "© 2024 Ahmed Nour. All rights reserved.",
    "footer.built": "Built with passion for cybersecurity",
    
    // Theme & Language
    "theme.dark": "Dark Mode",
    "theme.light": "Light Mode",
    "language.en": "English",
    "language.ar": "العربية",
  },
  
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "نبذة عني",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع", 
    "nav.contact": "التواصل",
    
    // Hero Section
    "hero.title": "أحمد نور أحمد عبد الحكيم",
    "hero.subtitle": "خبير أمن سيبراني ومطور أدوات اختبار الاختراق الأخلاقي",
    "hero.description": "باحث أمني عمره 17 عامًا من مصر، متقن لأكثر من 6 لغات برمجة ومطور أدوات اختراق أخلاقي منذ سن 14 عامًا.",
    "hero.cta.projects": "عرض المشاريع",
    "hero.cta.contact": "تواصل معي",
    
    // About Section
    "about.title": "نبذة عني",
    "about.intro": "باحث أمني شغوف",
    "about.content1": "أنا أحمد نور، شاب مصري عمره 17 عامًا مهتم بالأمن السيبراني، أدرس حاليًا في الصف الثالث الثانوي. وُلدت في 11 فبراير 2008، واكتشفت شغفي بالأمن السيبراني والبرمجة في سن 14 عامًا.",
    "about.content2": "منذ ذلك الحين، طورت خبرة في لغات برمجة متعددة وأنشأت العديد من أدوات اختبار الاختراق. رحلتي في الأمن السيبراني جعلتني أتقن الاختراق الأخلاقي وتقييم الثغرات وتطوير أدوات الأمان.",
    "about.content3": "أنا أيضًا مصمم مواقع ويب ذو خبرة واسعة مع أكثر من 16 مشروعًا ناجحًا، أجمع بين مهاراتي التقنية والتصميم الإبداعي لتقديم تجارب رقمية استثنائية.",
    
    // Skills Section
    "skills.title": "المهارات التقنية",
    "skills.programming": "لغات البرمجة",
    "skills.cybersecurity": "الأمن السيبراني",
    "skills.tools": "الأدوات والتقنيات",
    "skills.languages": "اللغات",
    
    // Projects Section
    "projects.title": "مشاريعي",
    "projects.description": "أدوات أمنية مبتكرة ومرافق اختبار الاختراق التي طورتها",
    "projects.viewAll": "عرض جميع الأدوات",
    "projects.github": "جيتهوب",
    "projects.website": "الموقع",
    
    // Contact Section
    "contact.title": "تواصل معي",
    "contact.subtitle": "لنتواصل",
    "contact.description": "هل أنت مستعد للتعاون في مشاريع الأمن السيبراني أو مناقشة الفرص المحتملة؟ أنا متحمس دائمًا للتواصل مع زملائي المهتمين بالأمان والمحترفين.",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "الهاتف",
    "contact.telegram": "تليجرام", 
    "contact.whatsapp": "واتساب",
    "contact.linkedin": "لينكد إن",
    "contact.github": "جيتهوب",
    
    // Footer
    "footer.copyright": "© 2024 أحمد نور. جميع الحقوق محفوظة.",
    "footer.built": "مبني بشغف للأمن السيبراني",
    
    // Theme & Language
    "theme.dark": "الوضع الداكن",
    "theme.light": "الوضع الفاتح", 
    "language.en": "English",
    "language.ar": "العربية",
  }
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: () => "",
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  const value = {
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang)
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    },
    t,
  }

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}