"use client"

import { useState, useEffect } from "react"
import Categories from "../components/categories"
import LanguageSelector from "../components/language-selector"
import { useTranslation } from "../lib/translations"
import { BarChart3, TrendingUp, Package, Users, Factory, Cake } from "lucide-react"

export default function DashboardPage() {
  const [language, setLanguage] = useState("ru")
  const t = useTranslation(language)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ru"
    setLanguage(savedLanguage)
  }, [])

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const stats = [
    {
      title: t.totalRevenue,
      value: "2,847,392 " + t.currency, // изменена валюта на сумы
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: t.productsInStock,
      value: "247", // уменьшено количество для реалистичности кондитерской
      change: "+3.2%",
      icon: Cake,
      color: "text-accent",
    },
    {
      title: t.activeOrders,
      value: "89",
      change: "-2.1%",
      icon: BarChart3,
      color: "text-secondary",
    },
    {
      title: t.customers,
      value: "342",
      change: "+8.7%",
      icon: Users,
      color: "text-primary",
    },
  ]

  const recentActivities = [
    { action: "Шоколадный торт добавлен на склад", time: "2 минуты назад", id: 1005 },
    { action: "Свадебный торт отправлен в магазин", time: "15 минут назад", id: 1004 },
    { action: "Заказ на детский торт принят", time: "32 минуты назад", id: 1003 },
    { action: "Чизкейк готов к продаже", time: "1 час назад", id: 1002 },
    { action: "Ванильный торт в производстве", time: "2 часа назад", id: 1001 },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t.dashboardTitle}</h1>
              <p className="text-muted-foreground mt-1">{t.businessOverview}</p>
            </div>
            <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.change.startsWith("+")
                        ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20"
                        : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-colors duration-300 group">
              <Package className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-medium text-foreground">{t.addProduct}</p>
            </button>
            <button className="p-4 bg-accent/10 hover:bg-accent/20 rounded-lg border border-accent/20 transition-colors duration-300 group">
              <Factory className="w-6 h-6 text-accent mb-2 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-medium text-foreground">{t.newOrder}</p>
            </button>
            <button className="p-4 bg-secondary/10 hover:bg-secondary/20 rounded-lg border border-secondary/20 transition-colors duration-300 group">
              <BarChart3 className="w-6 h-6 text-secondary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-medium text-foreground">{t.reports}</p>
            </button>
            <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-colors duration-300 group">
              <Users className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-medium text-foreground">{t.customers}</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t.recentActivity}</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">ID: {activity.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Categories />
    </div>
  )
}
