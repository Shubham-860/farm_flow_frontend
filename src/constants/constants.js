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
    // Cereals
    "Rice", "Wheat", "Maize", "Barley", "Oats", "Sorghum", "Pearl Millet", "Finger Millet", "Foxtail Millet", "Little Millet", "Kodo Millet", "Barnyard Millet",
    "Other Cereal",

    // Pulses
    "Chickpea", "Pigeon Pea", "Black Gram", "Green Gram", "Lentil", "Field Pea", "Horse Gram",
    "Other Pulse",

    // Oilseeds
    "Groundnut", "Soybean", "Mustard", "Sunflower", "Sesame", "Castor", "Linseed", "Safflower", "Niger Seed",
    "Other Oilseed",

    // Cash Crops
    "Sugarcane", "Cotton", "Jute", "Tobacco",
    "Other Cash Crop",

    // Vegetables
    "Potato", "Onion", "Tomato", "Brinjal", "Cabbage", "Cauliflower", "Carrot", "Radish", "Spinach", "Fenugreek", "Amaranthus",
    "Chili", "Capsicum", "Okra", "Bottle Gourd", "Ridge Gourd", "Bitter Gourd", "Snake Gourd", "Pumpkin", "Cucumber", "Ash Gourd",
    "Peas", "Beans", "Cluster Beans", "French Beans",
    "Beetroot", "Turnip", "Sweet Potato",
    "Drumstick", "Curry Leaves",
    "Other Vegetable",

    // Fruits
    "Mango", "Banana", "Apple", "Orange", "Grapes", "Pomegranate", "Papaya", "Guava",
    "Pineapple", "Watermelon", "Muskmelon",
    "Sapota (Chikoo)", "Custard Apple", "Jamun", "Amla", "Litchi",
    "Strawberry", "Blueberry",
    "Other Fruit",

    // Plantation / Commercial
    "Tea", "Coffee", "Coconut", "Rubber", "Arecanut",
    "Other Plantation Crop",

    // Flowers
    "Rose", "Marigold", "Jasmine", "Sunflower", "Lotus", "Lily", "Tulip", "Orchid", "Hibiscus", "Chrysanthemum", "Gerbera",
    "Other Flower",

    // Spices & Herbs
    "Turmeric", "Ginger", "Garlic", "Coriander", "Cumin", "Fennel", "Black Pepper", "Cardamom", "Clove", "Cinnamon",
    "Mint", "Basil",
    "Other Spice",

    // Fodder
    "Fodder Maize", "Napier Grass", "Alfalfa", "Berseem",
    "Other Fodder",

    // Final fallback
    "Other"
];
export {categories, paymentStatus, transactionType,crops}