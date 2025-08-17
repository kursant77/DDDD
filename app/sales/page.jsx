"use client"

import { useState, useEffect } from "react"
import Categories from "../../components/categories"
import LanguageSelector from "../../components/language-selector"
import { useTranslation } from "../../lib/translations"
import { ShoppingCart, TrendingUp, DollarSign, Users, Cake } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

export default function SalesPage() {
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

  const salesData = [
    {
      id: 1,
      customer: "Кафе Сладость",
      product: "Шоколадный торт",
      quantity: 5,
      amount: 425000,
      date: "2024-01-12",
      category: "chocolate",
    },
    {
      id: 2,
      customer: "Свадебное агентство",
      product: "Свадебный торт 3-ярусный",
      quantity: 1,
      amount: 450000,
      date: "2024-01-11",
      category: "wedding",
    },
    {
      id: 3,
      customer: "Детский сад №15",
      product: "Детский торт Единорог",
      quantity: 3,
      amount: 360000,
      date: "2024-01-10",
      category: "birthday",
    },
    {
      id: 4,
      customer: "Ресторан Вкус",
      product: "Чизкейк классический",
      quantity: 8,
      amount: 520000,
      date: "2024-01-09",
      category: "cheesecake",
    },
  ]

  const monthlyData = [
    { month: language === "uz" ? "Yan" : language === "en" ? "Jan" : "Янв", sales: 2400000, cakes: 45 },
    { month: language === "uz" ? "Fev" : language === "en" ? "Feb" : "Фев", sales: 1800000, cakes: 38 },
    { month: language === "uz" ? "Mar" : language === "en" ? "Mar" : "Мар", sales: 3200000, cakes: 62 },
    { month: language === "uz" ? "Apr" : language === "en" ? "Apr" : "Апр", sales: 2800000, cakes: 55 },
    { month: language === "uz" ? "May" : language === "en" ? "May" : "Май", sales: 3600000, cakes: 71 },
    { month: language === "uz" ? "Iyn" : language === "en" ? "Jun" : "Июн", sales: 4200000, cakes: 89 },
  ]

  const categoryData = [
    { name: t.chocolateCakes, value: 35, color: "#8B4513" },
    { name: t.weddingCakes, value: 25, color: "#FFB6C1" },
    { name: t.birthdayCakes, value: 20, color: "#FF69B4" },
    { name: t.cheesecakes, value: 15, color: "#F0E68C" },
    { name: t.customCakes, value: 5, color: "#DDA0DD" },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " " + t.currency
  }

  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0)
  const totalCakes = salesData.reduce((sum, sale) => sum + sale.quantity, 0)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                {t.salesTitle}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "uz"
                  ? "Tort sotuvlari va mijozlarni boshqarish"
                  : language === "en"
                    ? "Cake sales and customer management"
                    : "Управление продажами тортов и клиентами"}
              </p>
            </div>
            <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Bugun" : language === "en" ? "Today" : "Сегодня"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatPrice(1755000)}</p>
            <p className="text-xs text-green-600 dark:text-green-400">+15.3%</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Bu oy" : language === "en" ? "This month" : "Этот месяц"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatPrice(4200000)}</p>
            <p className="text-xs text-green-600 dark:text-green-400">+8.7%</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Cake className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Tortlar" : language === "en" ? "Cakes sold" : "Продано тортов"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalCakes}</p>
            <p className="text-xs text-green-600 dark:text-green-400">+12.1%</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {language === "uz" ? "Mijozlar" : language === "en" ? "Customers" : "Клиентов"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-xs text-green-600 dark:text-green-400">+12.5%</p>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {language === "uz" ? "Sotuv dinamikasi" : language === "en" ? "Sales Trend" : "Динамика продаж"}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    formatPrice(value),
                    language === "uz" ? "Sotuv" : language === "en" ? "Sales" : "Продажи",
                  ]}
                />
                <Line type="monotone" dataKey="sales" stroke="#ffb74a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {language === "uz"
                ? "Kategoriya bo'yicha taqsimot"
                : language === "en"
                  ? "Category Distribution"
                  : "Распределение по категориям"}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Cakes Sold */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {language === "uz"
              ? "Oylik sotilgan tortlar soni"
              : language === "en"
                ? "Monthly Cakes Sold"
                : "Количество проданных тортов по месяцам"}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [value, language === "uz" ? "Tortlar" : language === "en" ? "Cakes" : "Тортов"]}
              />
              <Bar dataKey="cakes" fill="#ffb74a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Sales */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {language === "uz" ? "So'nggi sotuvlar" : language === "en" ? "Recent Sales" : "Последние продажи"}
          </h2>
          <div className="space-y-4">
            {salesData.map((sale) => (
              <div
                key={sale.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{sale.customer}</h3>
                  <p className="text-sm text-muted-foreground">
                    {sale.product} × {sale.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">{sale.date}</p>
                </div>
                <div className="text-right mt-2 sm:mt-0">
                  <p className="text-lg font-bold text-primary">{formatPrice(sale.amount)}</p>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-300">
                    {language === "uz" ? "Batafsil" : language === "en" ? "Details" : "Подробнее"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Categories />
    </div>
  )
}
