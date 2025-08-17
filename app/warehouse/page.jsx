"use client"

import { useState, useEffect } from "react"
import Categories from "../../components/categories"
import LanguageSelector from "../../components/language-selector"
import ProductSelectorModal from "../../components/product-selector-modal"
import { useTranslation } from "../../lib/translations"
import { addSale } from "../../lib/firebase"
import { Package, Search, Filter, Plus, Minus, Cake, AlertTriangle, CheckCircle, ShoppingCart } from "lucide-react"

export default function WarehousePage() {
  const [language, setLanguage] = useState("ru")
  const t = useTranslation(language)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showSellButton, setShowSellButton] = useState({})

  const [cakes, setCakes] = useState([
    {
      id: 1,
      name: "Шоколадный торт",
      category: t.chocolateCakes,
      inStock: 15,
      needsDelivery: 8,
      price: 85000,
      image: "/decadent-chocolate-cake.png",
    },
    {
      id: 2,
      name: "Свадебный торт",
      category: t.weddingCakes,
      inStock: 3,
      needsDelivery: 2,
      price: 450000,
      image: "/elegant-wedding-cake.png",
    },
    {
      id: 3,
      name: "Детский торт Единорог",
      category: t.birthdayCakes,
      inStock: 7,
      needsDelivery: 5,
      price: 120000,
      image: "/unicorn-cake.png",
    },
    {
      id: 4,
      name: "Классический чизкейк",
      category: t.cheesecakes,
      inStock: 12,
      needsDelivery: 3,
      price: 65000,
      image: "/classic-cheesecake.png",
    },
    {
      id: 5,
      name: "Торт Наполеон",
      category: t.customCakes,
      inStock: 8,
      needsDelivery: 6,
      price: 95000,
      image: "/napoleon-cake.png",
    },
    {
      id: 6,
      name: "Красный бархат",
      category: t.customCakes,
      inStock: 5,
      needsDelivery: 4,
      price: 110000,
      image: "/red-velvet-cake.png",
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

  const handleAddQuantity = (cakeId, quantity) => {
    setCakes((prevCakes) =>
      prevCakes.map((cake) => (cake.id === cakeId ? { ...cake, inStock: cake.inStock + quantity } : cake)),
    )
  }

  const increaseCake = (id) => {
    setCakes((prevCakes) => prevCakes.map((cake) => (cake.id === id ? { ...cake, inStock: cake.inStock + 1 } : cake)))
    setShowSellButton((prev) => ({ ...prev, [id]: true }))
  }

  const decreaseCake = (id) => {
    setCakes((prevCakes) =>
      prevCakes.map((cake) => (cake.id === id && cake.inStock > 0 ? { ...cake, inStock: cake.inStock - 1 } : cake)),
    )
    setShowSellButton((prev) => ({ ...prev, [id]: true }))
  }

  const handleSell = async (cake) => {
    try {
      await addSale(cake.id, cake.name, 1, cake.price, cake.category)
      setCakes((prevCakes) =>
        prevCakes.map((c) => (c.id === cake.id && c.inStock > 0 ? { ...c, inStock: c.inStock - 1 } : c)),
      )
      setShowSellButton((prev) => ({ ...prev, [cake.id]: false }))

      // Show success message
      alert(language === "uz" ? "Mahsulot sotildi!" : language === "en" ? "Product sold!" : "Продукт продан!")
    } catch (error) {
      console.error("Error selling product:", error)
      alert(language === "uz" ? "Xatolik yuz berdi!" : language === "en" ? "Error occurred!" : "Произошла ошибка!")
    }
  }

  const totalInStock = cakes.reduce((sum, cake) => sum + cake.inStock, 0)
  const totalNeedsDelivery = cakes.reduce((sum, cake) => sum + cake.needsDelivery, 0)
  const totalReadyForSale = cakes.reduce((sum, cake) => sum + (cake.inStock - cake.needsDelivery), 0)
  const totalValue = cakes.reduce((sum, cake) => sum + cake.inStock * cake.price, 0)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " " + t.currency
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                {t.warehouseTitle}
              </h1>
              <p className="text-muted-foreground mt-1">{t.cakesInStock}</p>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
              <button
                onClick={() => setShowProductModal(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {t.addProduct}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder={
                language === "uz" ? "Tortlarni qidirish..." : language === "en" ? "Search cakes..." : "Поиск тортов..."
              }
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
          </div>
          <button className="bg-card border border-border px-4 py-2 rounded-lg hover:bg-accent/50 transition-colors duration-300 flex items-center gap-2 text-foreground">
            <Filter className="w-4 h-4" />
            {language === "uz" ? "Filtrlar" : language === "en" ? "Filters" : "Фильтры"}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Cake className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{totalInStock}</p>
                <p className="text-sm text-muted-foreground">{t.cakesInStock}</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">{totalNeedsDelivery}</p>
                <p className="text-sm text-muted-foreground">{t.needsDelivery}</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{totalReadyForSale}</p>
                <p className="text-sm text-muted-foreground">{t.readyForSale}</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-primary" />
              <div>
                <p className="text-xl font-bold text-foreground">{formatPrice(totalValue)}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "uz" ? "Umumiy qiymat" : language === "en" ? "Total Value" : "Общая стоимость"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={cake.image || "/placeholder.svg"}
                  alt={cake.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{cake.name}</h3>
                  <p className="text-sm text-muted-foreground">{cake.category}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t.inStock}:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseCake(cake.id)}
                      disabled={cake.inStock <= 0}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4 text-red-600" />
                    </button>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium min-w-[60px] text-center ${
                        cake.inStock > 10
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : cake.inStock > 5
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {cake.inStock}
                    </span>
                    <button
                      onClick={() => increaseCake(cake.id)}
                      className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t.needsDelivery}:</span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                    {cake.needsDelivery} {t.pieces}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {language === "uz" ? "Umumiy:" : language === "en" ? "Total:" : "Итого:"}
                  </span>
                  <span className="text-sm font-semibold text-primary">{formatPrice(cake.inStock * cake.price)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{formatPrice(cake.price)}</span>
                {showSellButton[cake.id] && (
                  <button
                    onClick={() => handleSell(cake)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {language === "uz" ? "Sotish" : language === "en" ? "Sell" : "Продать"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductSelectorModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddQuantity={handleAddQuantity}
        language={language}
        existingCakes={cakes}
      />

      <Categories />
    </div>
  )
}
