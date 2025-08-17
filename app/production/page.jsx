"use client"

import { useState, useEffect } from "react"
import Categories from "../../components/categories"
import LanguageSelector from "../../components/language-selector"
import { useTranslation } from "../../lib/translations"
import { Factory, Clock, CheckCircle, AlertCircle, ChefHat } from "lucide-react"

export default function ProductionPage() {
  const [language, setLanguage] = useState("ru")
  const t = useTranslation(language)

  const [orders, setOrders] = useState([
    {
      id: 1,
      product: language === "uz" ? "Shokoladli tort" : language === "en" ? "Chocolate Cake" : "Шоколадный торт",
      quantity: 5,
      status: language === "uz" ? "Jarayonda" : language === "en" ? "In Progress" : "В процессе",
      deadline: "2024-01-15",
      progress: 75,
      category: "chocolate",
    },
    {
      id: 2,
      product: language === "uz" ? "To'y torti" : language === "en" ? "Wedding Cake" : "Свадебный торт",
      quantity: 2,
      status: language === "uz" ? "Tugallangan" : language === "en" ? "Completed" : "Завершено",
      deadline: "2024-01-10",
      progress: 100,
      category: "wedding",
    },
    {
      id: 3,
      product: language === "uz" ? "Bolalar torti" : language === "en" ? "Birthday Cake" : "Детский торт",
      quantity: 3,
      status: language === "uz" ? "Kutilmoqda" : language === "en" ? "Pending" : "Ожидание",
      deadline: "2024-01-20",
      progress: 0,
      category: "birthday",
    },
    {
      id: 4,
      product: language === "uz" ? "Cheesecake" : language === "en" ? "Cheesecake" : "Чизкейк",
      quantity: 4,
      status: language === "uz" ? "Jarayonda" : language === "en" ? "In Progress" : "В процессе",
      deadline: "2024-01-18",
      progress: 40,
      category: "cheesecake",
    },
  ])

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ru"
    setLanguage(savedLanguage)
  }, [])

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const getStatusIcon = (status) => {
    const statusKey = status.toLowerCase()
    if (statusKey.includes("tugallangan") || statusKey.includes("completed") || statusKey.includes("завершено")) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    } else if (statusKey.includes("jarayonda") || statusKey.includes("progress") || statusKey.includes("процессе")) {
      return <Clock className="w-4 h-4 text-yellow-500" />
    } else {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status) => {
    const statusKey = status.toLowerCase()
    if (statusKey.includes("tugallangan") || statusKey.includes("completed") || statusKey.includes("завершено")) {
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    } else if (statusKey.includes("jarayonda") || statusKey.includes("progress") || statusKey.includes("процессе")) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
    } else {
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    }
  }

  const completedOrders = orders.filter(
    (order) =>
      order.status.toLowerCase().includes("tugallangan") ||
      order.status.toLowerCase().includes("completed") ||
      order.status.toLowerCase().includes("завершено"),
  ).length
  const inProgressOrders = orders.filter(
    (order) =>
      order.status.toLowerCase().includes("jarayonda") ||
      order.status.toLowerCase().includes("progress") ||
      order.status.toLowerCase().includes("процессе"),
  ).length
  const pendingOrders = orders.filter(
    (order) =>
      order.status.toLowerCase().includes("kutilmoqda") ||
      order.status.toLowerCase().includes("pending") ||
      order.status.toLowerCase().includes("ожидание"),
  ).length

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Factory className="w-6 h-6 text-primary" />
                {t.productionTitle}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "uz"
                  ? "Tort ishlab chiqarish jarayonini nazorat qilish"
                  : language === "en"
                    ? "Control cake production processes"
                    : "Контроль процессов производства тортов"}
              </p>
            </div>
            <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Tugallangan" : language === "en" ? "Completed" : "Завершено"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{completedOrders}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Jarayonda" : language === "en" ? "In Progress" : "В процессе"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{inProgressOrders}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Kutilmoqda" : language === "en" ? "Pending" : "Ожидание"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{pendingOrders}</p>
          </div>
        </div>

        {/* Production Orders */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            {language === "uz" ? "Tort buyurtmalari" : language === "en" ? "Cake Orders" : "Заказы тортов"}
          </h2>
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{order.product}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "uz" ? "Miqdor" : language === "en" ? "Quantity" : "Количество"}: {order.quantity}{" "}
                    {t.pieces}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "uz" ? "Muddat" : language === "en" ? "Deadline" : "Срок"}: {order.deadline}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  {getStatusIcon(order.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    {language === "uz" ? "Jarayon" : language === "en" ? "Progress" : "Прогресс"}
                  </span>
                  <span className="text-foreground font-medium">{order.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Categories />
    </div>
  )
}
