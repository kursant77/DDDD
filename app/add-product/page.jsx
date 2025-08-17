"use client"

import { useState, useEffect } from "react"
import Categories from "../../components/categories"
import LanguageSelector from "../../components/language-selector"
import { useTranslation } from "../../lib/translations"
import { Plus, Upload, Save, Cake } from "lucide-react"

export default function AddProductPage() {
  const [language, setLanguage] = useState("ru")
  const t = useTranslation(language)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    isCustomCake: false,
  })

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ru"
    setLanguage(savedLanguage)
  }, [])

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const cakeCategories = [
    { value: "chocolate", label: t.chocolateCakes },
    { value: "wedding", label: t.weddingCakes },
    { value: "birthday", label: t.birthdayCakes },
    { value: "cheesecake", label: t.cheesecakes },
    { value: "custom", label: t.customCakes },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    alert(
      language === "uz"
        ? "Tort muvaffaqiyatli qo'shildi!"
        : language === "en"
          ? "Cake added successfully!"
          : "Торт успешно добавлен!",
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                {t.addProduct}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "uz"
                  ? "Yangi tort yaratish"
                  : language === "en"
                    ? "Create new cake product"
                    : "Создание нового торта"}
              </p>
            </div>
            <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Product Type Selection */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cake className="w-5 h-5 text-primary" />
              {language === "uz" ? "Tort turi" : language === "en" ? "Cake Type" : "Тип торта"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                <input
                  type="radio"
                  name="isCustomCake"
                  value={false}
                  checked={!formData.isCustomCake}
                  onChange={() => setFormData((prev) => ({ ...prev, isCustomCake: false }))}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium text-foreground">
                    {language === "uz"
                      ? "Mavjud tortga qo'shish"
                      : language === "en"
                        ? "Add to existing cake"
                        : "Добавить к существующему торту"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "uz"
                      ? "Faqat miqdorni oshirish"
                      : language === "en"
                        ? "Only increase quantity"
                        : "Только увеличить количество"}
                  </p>
                </div>
              </label>
              <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                <input
                  type="radio"
                  name="isCustomCake"
                  value={true}
                  checked={formData.isCustomCake}
                  onChange={() => setFormData((prev) => ({ ...prev, isCustomCake: true }))}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium text-foreground">
                    {language === "uz" ? "Avtorlik torti" : language === "en" ? "Custom cake" : "Авторский торт"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "uz"
                      ? "Yangi mahsulot yaratish"
                      : language === "en"
                        ? "Create new product"
                        : "Создать новый продукт"}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg border border-border shadow-sm space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "uz" ? "Tort nomi" : language === "en" ? "Cake name" : "Название торта"} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={
                  language === "uz"
                    ? "Tort nomini kiriting"
                    : language === "en"
                      ? "Enter cake name"
                      : "Введите название торта"
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "uz" ? "Kategoriya" : language === "en" ? "Category" : "Категория"} *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                required
              >
                <option value="">
                  {language === "uz"
                    ? "Kategoriyani tanlang"
                    : language === "en"
                      ? "Select category"
                      : "Выберите категорию"}
                </option>
                {cakeCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price and Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "uz" ? "Narx (so'm)" : language === "en" ? "Price (UZS)" : "Цена (сум)"} *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "uz" ? "Miqdor" : language === "en" ? "Quantity" : "Количество"} *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "uz" ? "Tavsif" : language === "en" ? "Description" : "Описание"}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder={
                  language === "uz"
                    ? "Tort tavsifini kiriting"
                    : language === "en"
                      ? "Enter cake description"
                      : "Введите описание торта"
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "uz" ? "Tort rasmi" : language === "en" ? "Cake image" : "Изображение торта"}
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-300">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "uz"
                    ? "Rasmni bu yerga sudrab olib keling yoki tanlash uchun bosing"
                    : language === "en"
                      ? "Drag image here or click to select"
                      : "Перетащите изображение сюда или нажмите для выбора"}
                </p>
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-300"
                >
                  {language === "uz" ? "Fayl tanlash" : language === "en" ? "Select file" : "Выбрать файл"}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                {formData.isCustomCake
                  ? language === "uz"
                    ? "Yangi tort yaratish"
                    : language === "en"
                      ? "Create new cake"
                      : "Создать новый торт"
                  : language === "uz"
                    ? "Miqdorni qo'shish"
                    : language === "en"
                      ? "Add quantity"
                      : "Добавить количество"}
              </button>
              <button
                type="button"
                className="flex-1 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors duration-300 font-medium"
              >
                {language === "uz" ? "Bekor qilish" : language === "en" ? "Cancel" : "Отмена"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Categories />
    </div>
  )
}
