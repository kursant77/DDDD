"use client"

import { useState } from "react"
import { Globe } from "lucide-react"

export default function LanguageSelector({ currentLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{languages.find((lang) => lang.code === currentLanguage)?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                currentLanguage === language.code ? "bg-primary/10 text-primary" : "text-foreground"
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
