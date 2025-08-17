export const translations = {
  uz: {
    // Navigation
    warehouse: "Ombor",
    production: "Ishlab chiqarish",
    sales: "Sotish",
    addProduct: "Tort qo'shish",
    dashboard: "Boshqaruv paneli",

    // Dashboard
    dashboardTitle: "Tort do'koni boshqaruvi",
    businessOverview: "Tort biznesingiz haqida umumiy ma'lumot",
    totalRevenue: "Umumiy daromad",
    productsInStock: "Ombordagi tortlar",
    activeOrders: "Faol buyurtmalar",
    customers: "Mijozlar",
    quickActions: "Tezkor harakatlar",
    addProduct: "Tort qo'shish",
    newOrder: "Yangi buyurtma",
    reports: "Hisobotlar",
    recentActivity: "So'nggi faoliyat",

    // Modal window translations
    selectProducts: "Mahsulotlarni tanlang",
    addQuantity: "Miqdorni qo'shish",
    cancel: "Bekor qilish",
    add: "Qo'shish",

    // Products - only cakes
    chocolateCakes: "Shokoladli tortlar",
    vanillaCakes: "Vanilli tortlar",
    fruitCakes: "Mevali tortlar",
    weddingCakes: "To'y tortlari",
    birthdayCakes: "Tug'ilgan kun tortlari",
    cheesecakes: "Cheesecake tortlar",
    customCakes: "Maxsus tortlar",

    // Warehouse specific
    warehouseTitle: "Tort ombori",
    cakesInStock: "Ombordagi tortlar",
    needsDelivery: "Do'konga yetkazish kerak",
    readyForSale: "Sotishga tayyor",

    // Sales specific
    salesTitle: "Tort sotish",
    dailySales: "Kunlik sotish",
    weeklySales: "Haftalik sotish",
    monthlySales: "Oylik sotish",
    topSellingCakes: "Eng ko'p sotiladigan tortlar",

    // Production specific
    productionTitle: "Tort ishlab chiqarish",
    inProduction: "Ishlab chiqarilmoqda",
    readyToBake: "Pishirishga tayyor",
    decorating: "Bezatilmoqda",
    qualityCheck: "Sifat nazorati",

    // Common
    inStock: "Omborda",
    outOfStock: "Tugagan",
    lowStock: "Kam qolgan",
    pieces: "dona",
    sum: "so'm",
    currency: "so'm",
  },
  ru: {
    // Navigation
    warehouse: "Склад",
    production: "Производство",
    sales: "Продажи",
    addProduct: "Добавить торт",
    dashboard: "Панель управления",

    // Dashboard
    dashboardTitle: "Управление кондитерской",
    businessOverview: "Обзор вашего тортового бизнеса",
    totalRevenue: "Общий доход",
    productsInStock: "Тортов на складе",
    activeOrders: "Активных заказов",
    customers: "Клиентов",
    quickActions: "Быстрые действия",
    addProduct: "Добавить торт",
    newOrder: "Новый заказ",
    reports: "Отчеты",
    recentActivity: "Последняя активность",

    // Modal window translations
    selectProducts: "Выберите продукты",
    addQuantity: "Добавить количество",
    cancel: "Отмена",
    add: "Добавить",

    // Products - only cakes
    chocolateCakes: "Шоколадные торты",
    vanillaCakes: "Ванильные торты",
    fruitCakes: "Фруктовые торты",
    weddingCakes: "Свадебные торты",
    birthdayCakes: "Торты на день рождения",
    cheesecakes: "Чизкейки",
    customCakes: "Индивидуальные торты",

    // Warehouse specific
    warehouseTitle: "Склад тортов",
    cakesInStock: "Торты на складе",
    needsDelivery: "Нужно доставить в магазин",
    readyForSale: "Готово к продаже",

    // Sales specific
    salesTitle: "Продажи тортов",
    dailySales: "Дневные продажи",
    weeklySales: "Недельные продажи",
    monthlySales: "Месячные продажи",
    topSellingCakes: "Самые продаваемые торты",

    // Production specific
    productionTitle: "Производство тортов",
    inProduction: "В производстве",
    readyToBake: "Готово к выпечке",
    decorating: "Декорирование",
    qualityCheck: "Контроль качества",

    // Common
    inStock: "В наличии",
    outOfStock: "Нет в наличии",
    lowStock: "Мало осталось",
    pieces: "шт",
    sum: "сум",
    currency: "сум",
  },
  en: {
    // Navigation
    warehouse: "Warehouse",
    production: "Production",
    sales: "Sales",
    addProduct: "Add Cake",
    dashboard: "Dashboard",

    // Dashboard
    dashboardTitle: "Bakery Management",
    businessOverview: "Overview of your cake business",
    totalRevenue: "Total Revenue",
    productsInStock: "Cakes in Stock",
    activeOrders: "Active Orders",
    customers: "Customers",
    quickActions: "Quick Actions",
    addProduct: "Add Cake",
    newOrder: "New Order",
    reports: "Reports",
    recentActivity: "Recent Activity",

    // Modal window translations
    selectProducts: "Select Products",
    addQuantity: "Add Quantity",
    cancel: "Cancel",
    add: "Add",

    // Products - only cakes
    chocolateCakes: "Chocolate Cakes",
    vanillaCakes: "Vanilla Cakes",
    fruitCakes: "Fruit Cakes",
    weddingCakes: "Wedding Cakes",
    birthdayCakes: "Birthday Cakes",
    cheesecakes: "Cheesecakes",
    customCakes: "Custom Cakes",

    // Warehouse specific
    warehouseTitle: "Cake Warehouse",
    cakesInStock: "Cakes in Stock",
    needsDelivery: "Needs Store Delivery",
    readyForSale: "Ready for Sale",

    // Sales specific
    salesTitle: "Cake Sales",
    dailySales: "Daily Sales",
    weeklySales: "Weekly Sales",
    monthlySales: "Monthly Sales",
    topSellingCakes: "Top Selling Cakes",

    // Production specific
    productionTitle: "Cake Production",
    inProduction: "In Production",
    readyToBake: "Ready to Bake",
    decorating: "Decorating",
    qualityCheck: "Quality Check",

    // Common
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    lowStock: "Low Stock",
    pieces: "pcs",
    sum: "sum",
    currency: "sum",
  },
}

export const useTranslation = (language = "ru") => {
  return translations[language] || translations.ru
}
