// Local storage functions for sales data
const SALES_KEY = "cakeshop_sales"
const PRODUCTS_KEY = "cakeshop_products"

// Initialize local storage if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem(SALES_KEY)) {
    localStorage.setItem(SALES_KEY, JSON.stringify([]))
  }
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    const initialProducts = [
      { id: "chocolate-cake", name: "Шоколадный торт", category: "Шоколадные торты", price: 150000, quantity: 15 },
      { id: "napoleon-cake", name: "Торт Наполеон", category: "Кремовые торты", price: 120000, quantity: 8 },
      { id: "red-velvet", name: "Красный бархат", category: "Праздничные торты", price: 180000, quantity: 12 },
      { id: "wedding-cake", name: "Свадебный торт", category: "Свадебные торты", price: 350000, quantity: 3 },
      { id: "kids-cake", name: "Детский торт", category: "Детские торты", price: 100000, quantity: 20 },
    ]
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts))
  }
}

// Sales functions
export const addSale = async (cakeId, cakeName, quantity, price, category) => {
  try {
    console.log("[v0] Adding sale:", { cakeId, cakeName, quantity, price, category })

    initializeLocalStorage()

    const sales = JSON.parse(localStorage.getItem(SALES_KEY) || "[]")
    const newSale = {
      id: Date.now().toString(),
      cakeId,
      cakeName,
      quantity,
      price,
      totalAmount: quantity * price,
      category,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
    }

    sales.push(newSale)
    localStorage.setItem(SALES_KEY, JSON.stringify(sales))

    // Update product quantity
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]")
    const productIndex = products.findIndex((p) => p.id === cakeId)
    if (productIndex !== -1) {
      products[productIndex].quantity = Math.max(0, products[productIndex].quantity - quantity)
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    }

    console.log("[v0] Sale added successfully")
    return newSale
  } catch (error) {
    console.error("Error adding sale:", error)
    throw error
  }
}

// Get sales analytics
export const getSalesAnalytics = async (period = "daily") => {
  try {
    initializeLocalStorage()

    const sales = JSON.parse(localStorage.getItem(SALES_KEY) || "[]")
    const now = new Date()
    const startDate = new Date()

    if (period === "daily") {
      startDate.setHours(0, 0, 0, 0)
    } else if (period === "monthly") {
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
    } else if (period === "yearly") {
      startDate.setMonth(0, 1)
      startDate.setHours(0, 0, 0, 0)
    }

    return sales
      .filter((sale) => new Date(sale.timestamp) >= startDate)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (error) {
    console.error("Error getting sales analytics:", error)
    return []
  }
}

// Get popular products
export const getPopularProducts = async () => {
  try {
    initializeLocalStorage()

    const sales = JSON.parse(localStorage.getItem(SALES_KEY) || "[]")
    const productSales = {}

    sales.forEach((sale) => {
      if (productSales[sale.cakeId]) {
        productSales[sale.cakeId].totalQuantity += sale.quantity
        productSales[sale.cakeId].totalSales += sale.totalAmount
      } else {
        productSales[sale.cakeId] = {
          cakeName: sale.cakeName,
          category: sale.category,
          totalQuantity: sale.quantity,
          totalSales: sale.totalAmount,
        }
      }
    })

    return Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
  } catch (error) {
    console.error("Error getting popular products:", error)
    return []
  }
}

// Get products
export const getProducts = () => {
  initializeLocalStorage()
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]")
}

// Update product quantity
export const updateProductQuantity = (productId, newQuantity) => {
  initializeLocalStorage()
  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]")
  const productIndex = products.findIndex((p) => p.id === productId)
  if (productIndex !== -1) {
    products[productIndex].quantity = newQuantity
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  }
}

// Add new product
export const addNewProduct = (product) => {
  initializeLocalStorage()
  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]")
  const newProduct = {
    ...product,
    id: Date.now().toString(),
  }
  products.push(newProduct)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return newProduct
}
