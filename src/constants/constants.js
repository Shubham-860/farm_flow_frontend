const categories = [
    {id: "SEEDS", value: "Seeds"},
    {id: "FERTILIZER", value: "Fertilizer"},
    {id: "PESTICIDE", value: "Pesticide"},
    {id: "LABOUR", value: "Labour"},
    {id: "MACHINERY", value: "Machinery"},
    {id: "IRRIGATION", value: "Irrigation"},
    {id: "TRANSPORT", value: "Transport"},
    {id: "MAINTENANCE", value: "Maintenance"},
    {id: "OTHER", value: "Other"}
]

const paymentStatus = [
    {id: "PENDING", value: "Pending"},
    {id: "RECEIVED", value: "Received"}
]

const transactionType = [
    {id: "INCOME", value: "Income"},
    {id: "EXPENSE", value: "Expense"}
]
const crops = [
    // Cereals (mostly quintal / ton)
    { name: "Rice", unit: "quintal" },
    { name: "Wheat", unit: "quintal" },
    { name: "Maize", unit: "quintal" },
    { name: "Barley", unit: "quintal" },
    { name: "Oats", unit: "quintal" },
    { name: "Sorghum", unit: "quintal" },
    { name: "Pearl Millet", unit: "quintal" },
    { name: "Finger Millet", unit: "quintal" },
    { name: "Foxtail Millet", unit: "quintal" },
    { name: "Little Millet", unit: "quintal" },
    { name: "Kodo Millet", unit: "quintal" },
    { name: "Barnyard Millet", unit: "quintal" },
    { name: "Other Cereal", unit: "quintal" },

    // Pulses
    { name: "Chickpea", unit: "quintal" },
    { name: "Pigeon Pea", unit: "quintal" },
    { name: "Black Gram", unit: "quintal" },
    { name: "Green Gram", unit: "quintal" },
    { name: "Lentil", unit: "quintal" },
    { name: "Field Pea", unit: "quintal" },
    { name: "Horse Gram", unit: "quintal" },
    { name: "Other Pulse", unit: "quintal" },

    // Oilseeds
    { name: "Groundnut", unit: "quintal" },
    { name: "Soybean", unit: "quintal" },
    { name: "Mustard", unit: "quintal" },
    { name: "Sunflower", unit: "quintal" },
    { name: "Sesame", unit: "quintal" },
    { name: "Castor", unit: "quintal" },
    { name: "Linseed", unit: "quintal" },
    { name: "Safflower", unit: "quintal" },
    { name: "Niger Seed", unit: "quintal" },
    { name: "Other Oilseed", unit: "quintal" },

    // Cash Crops
    { name: "Sugarcane", unit: "ton" },
    { name: "Cotton", unit: "quintal" },
    { name: "Jute", unit: "quintal" },
    { name: "Tobacco", unit: "kg" },
    { name: "Other Cash Crop", unit: "quintal" },

    // Vegetables (mostly kg)
    { name: "Potato", unit: "kg" },
    { name: "Onion", unit: "kg" },
    { name: "Tomato", unit: "kg" },
    { name: "Brinjal", unit: "kg" },
    { name: "Cabbage", unit: "kg" },
    { name: "Cauliflower", unit: "kg" },
    { name: "Carrot", unit: "kg" },
    { name: "Radish", unit: "kg" },
    { name: "Spinach", unit: "kg" },
    { name: "Fenugreek", unit: "kg" },
    { name: "Amaranthus", unit: "kg" },
    { name: "Chili", unit: "kg" },
    { name: "Capsicum", unit: "kg" },
    { name: "Okra", unit: "kg" },
    { name: "Bottle Gourd", unit: "kg" },
    { name: "Ridge Gourd", unit: "kg" },
    { name: "Bitter Gourd", unit: "kg" },
    { name: "Snake Gourd", unit: "kg" },
    { name: "Pumpkin", unit: "kg" },
    { name: "Cucumber", unit: "kg" },
    { name: "Ash Gourd", unit: "kg" },
    { name: "Peas", unit: "kg" },
    { name: "Beans", unit: "kg" },
    { name: "Cluster Beans", unit: "kg" },
    { name: "French Beans", unit: "kg" },
    { name: "Beetroot", unit: "kg" },
    { name: "Turnip", unit: "kg" },
    { name: "Sweet Potato", unit: "kg" },
    { name: "Drumstick", unit: "kg" },
    { name: "Curry Leaves", unit: "kg" },
    { name: "Other Vegetable", unit: "kg" },

    // Fruits (kg or crates)
    { name: "Mango", unit: "crate" },
    { name: "Banana", unit: "dozen" },
    { name: "Apple", unit: "kg" },
    { name: "Orange", unit: "kg" },
    { name: "Grapes", unit: "kg" },
    { name: "Pomegranate", unit: "kg" },
    { name: "Papaya", unit: "kg" },
    { name: "Guava", unit: "kg" },
    { name: "Pineapple", unit: "piece" },
    { name: "Watermelon", unit: "kg" },
    { name: "Muskmelon", unit: "kg" },
    { name: "Sapota (Chikoo)", unit: "kg" },
    { name: "Custard Apple", unit: "kg" },
    { name: "Jamun", unit: "kg" },
    { name: "Amla", unit: "kg" },
    { name: "Litchi", unit: "kg" },
    { name: "Strawberry", unit: "box" },
    { name: "Blueberry", unit: "box" },
    { name: "Other Fruit", unit: "kg" },

    // Plantation
    { name: "Tea", unit: "kg" },
    { name: "Coffee", unit: "kg" },
    { name: "Coconut", unit: "piece" },
    { name: "Rubber", unit: "kg" },
    { name: "Arecanut", unit: "kg" },
    { name: "Other Plantation Crop", unit: "kg" },

    // Flowers
    { name: "Rose", unit: "piece" },
    { name: "Marigold", unit: "kg" },
    { name: "Jasmine", unit: "kg" },
    { name: "Sunflower", unit: "piece" },
    { name: "Lotus", unit: "piece" },
    { name: "Lily", unit: "piece" },
    { name: "Tulip", unit: "piece" },
    { name: "Orchid", unit: "piece" },
    { name: "Hibiscus", unit: "piece" },
    { name: "Chrysanthemum", unit: "kg" },
    { name: "Gerbera", unit: "piece" },
    { name: "Other Flower", unit: "piece" },

    // Spices
    { name: "Turmeric", unit: "kg" },
    { name: "Ginger", unit: "kg" },
    { name: "Garlic", unit: "kg" },
    { name: "Coriander", unit: "kg" },
    { name: "Cumin", unit: "kg" },
    { name: "Fennel", unit: "kg" },
    { name: "Black Pepper", unit: "kg" },
    { name: "Cardamom", unit: "kg" },
    { name: "Clove", unit: "kg" },
    { name: "Cinnamon", unit: "kg" },
    { name: "Mint", unit: "kg" },
    { name: "Basil", unit: "kg" },
    { name: "Other Spice", unit: "kg" },

    // Fodder
    { name: "Fodder Maize", unit: "ton" },
    { name: "Napier Grass", unit: "ton" },
    { name: "Alfalfa", unit: "ton" },
    { name: "Berseem", unit: "ton" },
    { name: "Other Fodder", unit: "ton" },

    // Final fallback
    { name: "Other", unit: "kg" },
];
export {categories, paymentStatus, transactionType,crops}