"use client"

import { useState } from "react"
import { X, Plus, Minus } from "lucide-react"
import { useTranslation } from "../lib/translations"

export default function ProductSelectorModal({ isOpen, onClose, onAddQuantity, language, existingCakes }) {
  const t = useTranslation(language)
  const [selectedQuantities, setSelectedQuantities] = useState({})

  if (!isOpen) return null

  const handleQuantityChange = (cakeId, change) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [cakeId]: Math.max(0, (prev[cakeId] || 0) + change),
    }))
  }

  const handleAddProducts = () => {
    Object.entries(selectedQuantities).forEach(([cakeId, quantity]) => {
      if (quantity > 0) {
        onAddQuantity(Number.parseInt(cakeId), quantity)
      }
    })
    setSelectedQuantities({})
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{t.selectProducts}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {existingCakes.map((cake) => (
            <div key={cake.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={cake.image || "/placeholder.svg"}
                  alt={cake.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{cake.name}</h3>
                  <p className="text-sm text-muted-foreground">{cake.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(cake.id, -1)}
                  disabled={!selectedQuantities[cake.id]}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Minus className="w-4 h-4 text-red-600" />
                </button>
                <span className="px-3 py-1 bg-muted rounded-full min-w-[50px] text-center">
                  {selectedQuantities[cake.id] || 0}
                </span>
                <button
                  onClick={() => handleQuantityChange(cake.id, 1)}
                  className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 text-green-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent/50 transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleAddProducts}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t.add}
          </button>
        </div>
      </div>
    </div>
  )
}
