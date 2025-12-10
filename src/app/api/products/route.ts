import { NextResponse } from 'next/server'

// Blanka API configuration
const BLANKA_API_URL = 'https://api.blankabrand.com/api/v1/products/'
const BLANKA_API_KEY = process.env.BLANKA_API_KEY || ''

export interface BlankaProduct {
  id: number
  name: string
  sku: string
  branded_box_available: boolean
  available_inventory: number
  suggested_cost: string
  cost: string
  weight: number
  color_code: string
  color_name: string
  product_type: string
  image: string
  categories: string[]
  is_expiring: boolean
  description: string
  product_notes: string | null
  benefits: string
  application: string
  ingredients: string
  expires_at: string | null
  product_base: string | null
}

interface BlankaResponse {
  count: number
  next: string | null
  previous: string | null
  results: BlankaProduct[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const pageSize = searchParams.get('page_size') || '50'
  const category = searchParams.get('category') || ''

  // If no API key, return demo data
  if (!BLANKA_API_KEY) {
    return NextResponse.json({
      count: demoProducts.length,
      next: null,
      previous: null,
      results: demoProducts,
      isDemo: true
    })
  }

  try {
    let url = `${BLANKA_API_URL}?page=${page}&page_size=${pageSize}`
    if (category) {
      url += `&category=${category}`
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': BLANKA_API_KEY,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Blanka API error: ${response.status}`)
    }

    const data: BlankaResponse = await response.json()
    
    return NextResponse.json({
      ...data,
      isDemo: false
    })
  } catch (error) {
    console.error('Failed to fetch from Blanka:', error)
    
    // Fallback to demo data on error
    return NextResponse.json({
      count: demoProducts.length,
      next: null,
      previous: null,
      results: demoProducts,
      isDemo: true,
      error: 'Using demo data - Blanka API unavailable'
    })
  }
}

// Demo products based on Blanka's actual catalog
const demoProducts: BlankaProduct[] = [
  {
    id: 209567,
    name: "Reusable Bamboo Cotton Rounds",
    sku: "BLNK-AB-04-02-CTP",
    branded_box_available: false,
    available_inventory: 100,
    suggested_cost: "18.00",
    cost: "9.63",
    weight: 72,
    color_code: "",
    color_name: "",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop",
    categories: ["skincare", "accessories", "tools", "organic"],
    is_expiring: false,
    description: "Washable, reusable, and biodegradable cotton rounds. Perfect for removing makeup and suitable for any skin type. 12-pack of organic cotton pads.",
    product_notes: null,
    benefits: "3 soft organic layers, biodegradable bamboo cotton, anti-pilling technology, pack of 12",
    application: "Use with makeup remover or cleanser. Wash by hand in warm water after use.",
    ingredients: "Bamboo cotton",
    expires_at: null,
    product_base: null
  },
  {
    id: 209570,
    name: "Natural Konjac Sponge",
    sku: "BLNK-AB-04-02-KJS",
    branded_box_available: false,
    available_inventory: 150,
    suggested_cost: "16.00",
    cost: "4.28",
    weight: 32,
    color_code: "",
    color_name: "",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
    categories: ["skincare", "cleanse", "tools", "organic"],
    is_expiring: false,
    description: "A natural, plant fiber Konjac Sponge for better exfoliating. Made from konjac root fibers, biodegradable and all natural.",
    product_notes: null,
    benefits: "All-natural, excellent exfoliant, biodegradable, suitable for all skin types",
    application: "Wet with warm water until soft. Massage skin with circular motions. Replace after 2-3 months.",
    ingredients: "Konjac Root Fibers",
    expires_at: null,
    product_base: null
  },
  {
    id: 209601,
    name: "Hydrating Face Mist",
    sku: "BLNK-SK-01-FM",
    branded_box_available: true,
    available_inventory: 200,
    suggested_cost: "28.00",
    cost: "11.50",
    weight: 120,
    color_code: "",
    color_name: "",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=500&h=500&fit=crop",
    categories: ["skincare", "face", "hydration", "mist"],
    is_expiring: false,
    description: "Refreshing hydrating face mist with rose water and hyaluronic acid. Perfect for on-the-go hydration.",
    product_notes: null,
    benefits: "Instant hydration, refreshes makeup, soothes skin, travel-friendly",
    application: "Spray onto face from 6 inches away. Use throughout the day for refreshment.",
    ingredients: "Rose Water, Hyaluronic Acid, Aloe Vera, Vitamin E",
    expires_at: null,
    product_base: null
  },
  {
    id: 209615,
    name: "Vitamin C Serum",
    sku: "BLNK-SK-02-VCS",
    branded_box_available: true,
    available_inventory: 175,
    suggested_cost: "42.00",
    cost: "15.75",
    weight: 60,
    color_code: "",
    color_name: "",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop",
    categories: ["skincare", "face", "serum", "anti-aging"],
    is_expiring: false,
    description: "Powerful Vitamin C serum with 20% concentration. Brightens skin, reduces dark spots, and boosts collagen production.",
    product_notes: null,
    benefits: "Brightens complexion, reduces hyperpigmentation, anti-aging, antioxidant protection",
    application: "Apply 3-4 drops to clean face morning and night. Follow with moisturizer.",
    ingredients: "Vitamin C (20%), Vitamin E, Ferulic Acid, Hyaluronic Acid",
    expires_at: null,
    product_base: null
  },
  {
    id: 209620,
    name: "Nourishing Lip Oil",
    sku: "BLNK-LP-01-LO",
    branded_box_available: true,
    available_inventory: 300,
    suggested_cost: "22.00",
    cost: "7.50",
    weight: 15,
    color_code: "#F5C6C6",
    color_name: "Rose",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop",
    categories: ["lips", "lip-oil", "hydration"],
    is_expiring: false,
    description: "Luxurious lip oil that hydrates and adds a subtle shine. Infused with jojoba and rosehip oils.",
    product_notes: null,
    benefits: "Deep hydration, subtle shine, non-sticky, vitamin-rich",
    application: "Apply to lips as needed. Can be worn alone or over lipstick.",
    ingredients: "Jojoba Oil, Rosehip Oil, Vitamin E, Sweet Almond Oil",
    expires_at: null,
    product_base: null
  },
  {
    id: 209625,
    name: "Matte Liquid Lipstick",
    sku: "BLNK-LP-02-MLL",
    branded_box_available: true,
    available_inventory: 250,
    suggested_cost: "26.00",
    cost: "9.25",
    weight: 20,
    color_code: "#8B2942",
    color_name: "Berry Crush",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500&h=500&fit=crop",
    categories: ["lips", "lipstick", "matte"],
    is_expiring: false,
    description: "Long-lasting matte liquid lipstick with a velvety finish. Transfer-proof and comfortable wear.",
    product_notes: null,
    benefits: "12-hour wear, transfer-proof, lightweight, highly pigmented",
    application: "Apply to clean, dry lips. Allow to set for 30 seconds.",
    ingredients: "Isododecane, Dimethicone, Kaolin, Iron Oxides",
    expires_at: null,
    product_base: null
  },
  {
    id: 209630,
    name: "Cream Blush Stick",
    sku: "BLNK-FC-01-CBS",
    branded_box_available: true,
    available_inventory: 180,
    suggested_cost: "24.00",
    cost: "8.50",
    weight: 25,
    color_code: "#E8A0A0",
    color_name: "Peach Glow",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5e?w=500&h=500&fit=crop",
    categories: ["face", "blush", "cream"],
    is_expiring: false,
    description: "Buildable cream blush stick for a natural, dewy flush. Blends seamlessly into skin.",
    product_notes: null,
    benefits: "Buildable coverage, dewy finish, easy to blend, multi-use",
    application: "Swipe onto cheeks and blend with fingers or brush. Can also be used on lips.",
    ingredients: "Castor Oil, Beeswax, Coconut Oil, Vitamin E",
    expires_at: null,
    product_base: null
  },
  {
    id: 209635,
    name: "Brow Gel",
    sku: "BLNK-EY-01-BG",
    branded_box_available: true,
    available_inventory: 220,
    suggested_cost: "20.00",
    cost: "6.75",
    weight: 18,
    color_code: "#5C4033",
    color_name: "Medium Brown",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=500&h=500&fit=crop",
    categories: ["eyes", "brows", "gel"],
    is_expiring: false,
    description: "Tinted brow gel that shapes, fills, and sets brows in place. Buildable color with natural finish.",
    product_notes: null,
    benefits: "24-hour hold, natural finish, buildable color, flake-free",
    application: "Brush through brows in upward strokes. Build color as desired.",
    ingredients: "Aqua, PVP, Cellulose Gum, Iron Oxides",
    expires_at: null,
    product_base: null
  },
  {
    id: 209640,
    name: "Lengthening Mascara",
    sku: "BLNK-EY-02-LM",
    branded_box_available: true,
    available_inventory: 275,
    suggested_cost: "28.00",
    cost: "10.25",
    weight: 22,
    color_code: "#000000",
    color_name: "Black",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&h=500&fit=crop",
    categories: ["eyes", "mascara", "lashes"],
    is_expiring: false,
    description: "Lengthening mascara with a precision brush for separated, defined lashes. Buildable and clump-free.",
    product_notes: null,
    benefits: "Extreme length, clump-free, smudge-proof, easy removal",
    application: "Wiggle wand from root to tip. Apply multiple coats for intensity.",
    ingredients: "Aqua, Beeswax, Carnauba Wax, Iron Oxides",
    expires_at: null,
    product_base: null
  },
  {
    id: 209645,
    name: "Setting Powder",
    sku: "BLNK-FC-02-SP",
    branded_box_available: true,
    available_inventory: 190,
    suggested_cost: "32.00",
    cost: "12.00",
    weight: 35,
    color_code: "",
    color_name: "Translucent",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop",
    categories: ["face", "powder", "setting"],
    is_expiring: false,
    description: "Ultra-fine translucent setting powder that blurs pores and sets makeup for all-day wear.",
    product_notes: null,
    benefits: "Blurs imperfections, oil control, photo-friendly, weightless",
    application: "Apply with brush or puff over foundation. Focus on T-zone.",
    ingredients: "Silica, Mica, Dimethicone, Vitamin E",
    expires_at: null,
    product_base: null
  },
  {
    id: 209650,
    name: "Retinol Night Cream",
    sku: "BLNK-SK-03-RNC",
    branded_box_available: true,
    available_inventory: 150,
    suggested_cost: "48.00",
    cost: "18.50",
    weight: 75,
    color_code: "",
    color_name: "",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&h=500&fit=crop",
    categories: ["skincare", "face", "anti-aging", "night-care"],
    is_expiring: false,
    description: "Powerful retinol night cream that reduces fine lines and improves skin texture while you sleep.",
    product_notes: null,
    benefits: "Reduces wrinkles, improves texture, overnight renewal, gentle formula",
    application: "Apply to clean face at night. Start with 2-3 times per week.",
    ingredients: "Retinol (0.5%), Niacinamide, Peptides, Squalane",
    expires_at: null,
    product_base: null
  },
  {
    id: 209655,
    name: "Hydrating Sheet Masks (5-Pack)",
    sku: "BLNK-SK-04-HSM",
    branded_box_available: false,
    available_inventory: 400,
    suggested_cost: "25.00",
    cost: "8.75",
    weight: 100,
    color_code: "",
    color_name: "",
    product_type: "BLANK",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop",
    categories: ["skincare", "face", "masks", "hydration"],
    is_expiring: false,
    description: "Intensive hydrating sheet masks infused with hyaluronic acid and aloe vera. Pack of 5 masks.",
    product_notes: null,
    benefits: "Deep hydration, plumps skin, soothes irritation, instant glow",
    application: "Apply to clean face for 15-20 minutes. Pat in remaining serum.",
    ingredients: "Hyaluronic Acid, Aloe Vera, Glycerin, Chamomile Extract",
    expires_at: null,
    product_base: null
  }
]
