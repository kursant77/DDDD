"use client"

import { useRouter, usePathname } from "next/navigation"
import { Package, Factory, ShoppingCart, Plus, BarChart3 } from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { useState, useEffect } from "react"

export default function Categories() {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguage] = useState("ru")
  const t = useTranslation(language)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ru"
    setLanguage(savedLanguage)
  }, [])

  const navItems = [
    {
      path: "/warehouse",
      label: t.warehouse,
      icon: Package,
    },
    {
      path: "/production",
      label: t.production,
      icon: Factory,
    },
    {
      path: "/sales",
      label: t.sales,
      icon: ShoppingCart,
    },
    {
      path: "/add-product",
      label: t.addProduct,
      icon: Plus,
    },
    {
      path: "/",
      label: t.dashboard,
      icon: BarChart3,
    },
  ]

  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
      <div className="flex justify-around items-center px-2 py-3 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-300 group
                ${
                  isActive
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
              `}
            >
              <Icon
                size={22}
                className={`mb-1.5 transition-all duration-300 ${
                  isActive ? "scale-110 drop-shadow-sm" : "group-hover:scale-105"
                }`}
              />
              <span
                className={`text-xs font-medium leading-tight text-center line-clamp-2 max-w-full transition-all duration-300 ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
