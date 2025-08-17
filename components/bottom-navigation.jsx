"use client"

import { useState } from "react"
import { Package, Factory, ShoppingCart, Plus, BarChart3 } from "lucide-react"

export default function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navItems = [
    {
      id: "warehouse",
      label: "Склад",
      icon: Package,
    },
    {
      id: "production",
      label: "Производство",
      icon: Factory,
    },
    {
      id: "sales",
      label: "Продажи",
      icon: ShoppingCart,
    },
    {
      id: "add-product",
      label: "Добавить товар",
      icon: Plus,
    },
    {
      id: "dashboard",
      label: "Информационная панель",
      icon: BarChart3,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center px-2 py-2 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-2 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
            >
              <Icon size={20} className={`mb-1 ${isActive ? "scale-110" : ""} transition-transform duration-200`} />
              <span className="text-xs font-medium leading-tight text-center line-clamp-2 max-w-full">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
