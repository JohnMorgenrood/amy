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

// MAC Cosmetics South Africa Products
// Pricing: suggested_cost = 90% of retail (customer price, 10% off)
//          cost = 70% of retail (Amy's cost, 30% discount)
const demoProducts: BlankaProduct[] = [
  // === LIPS ===
  {
    id: 100001,
    name: "M·A·Cximal Silky Matte Lipstick - Ruby Woo",
    sku: "MAC-LP-MXSM-RW",
    branded_box_available: true,
    available_inventory: 50,
    suggested_cost: "360.00",
    cost: "280.00",
    weight: 3.5,
    color_code: "#BE0029",
    color_name: "Ruby Woo",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop",
    categories: ["lips", "lipstick", "matte"],
    is_expiring: false,
    description: "The iconic Ruby Woo. A vivid blue-red that became an instant icon. Silky Matte formula delivers 12HR comfortable wear with pigment-rich, full-coverage colour.",
    product_notes: "Best Seller",
    benefits: "12HR comfortable wear, pigment-rich, full-coverage colour, silky matte finish",
    application: "Apply directly to lips starting from the centre. Build colour as desired.",
    ingredients: "Isododecane, Dimethicone, Trimethylsiloxysilicate, Nylon-611/Dimethicone Copolymer",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100002,
    name: "M·A·Cximal Silky Matte Lipstick - Velvet Teddy",
    sku: "MAC-LP-MXSM-VT",
    branded_box_available: true,
    available_inventory: 45,
    suggested_cost: "360.00",
    cost: "280.00",
    weight: 3.5,
    color_code: "#B4776E",
    color_name: "Velvet Teddy",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2f?w=500&h=500&fit=crop",
    categories: ["lips", "lipstick", "matte"],
    is_expiring: false,
    description: "A deep-tone beige nude. The perfect everyday nude lipstick. Silky Matte formula for 12HR comfortable, transfer-resistant wear.",
    product_notes: "Best Seller",
    benefits: "12HR comfortable wear, transfer-resistant, highly pigmented, silky matte finish",
    application: "Apply directly to lips starting from the centre. Build colour as desired.",
    ingredients: "Isododecane, Dimethicone, Trimethylsiloxysilicate, Nylon-611/Dimethicone Copolymer",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100003,
    name: "M·A·Cximal Silky Matte Lipstick - Whirl",
    sku: "MAC-LP-MXSM-WH",
    branded_box_available: true,
    available_inventory: 40,
    suggested_cost: "360.00",
    cost: "280.00",
    weight: 3.5,
    color_code: "#89534B",
    color_name: "Whirl",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500&h=500&fit=crop",
    categories: ["lips", "lipstick", "matte"],
    is_expiring: false,
    description: "Dirty rose. A gorgeous dusty rose-brown nude. Perfect for that '90s vibe.",
    product_notes: "Best Seller",
    benefits: "12HR wear, highly pigmented, comfortable matte finish",
    application: "Apply directly to lips. Pair with Whirl lip pencil for definition.",
    ingredients: "Isododecane, Dimethicone, Trimethylsiloxysilicate, Iron Oxides",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100004,
    name: "Lip Pencil - Spice",
    sku: "MAC-LP-PEN-SP",
    branded_box_available: true,
    available_inventory: 60,
    suggested_cost: "346.50",
    cost: "269.50",
    weight: 1.45,
    color_code: "#8C5B4A",
    color_name: "Spice",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1607748851687-695bcbe7c7ae?w=500&h=500&fit=crop",
    categories: ["lips", "lip-pencil", "liner"],
    is_expiring: false,
    description: "A cinnamon stick brown. Ultra-precise, versatile, and pro-approved lip pencil that defines and shapes lips with creamy colour.",
    product_notes: "Pro Essential",
    benefits: "Ultra-precise application, long-wearing, creamy formula, prevents feathering",
    application: "Line lips starting from the cupid's bow. Can fill in entire lip for long-lasting base.",
    ingredients: "Hydrogenated Coco-Glycerides, Synthetic Wax, Ozokerite",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100005,
    name: "Lip Pencil - Whirl",
    sku: "MAC-LP-PEN-WH",
    branded_box_available: true,
    available_inventory: 55,
    suggested_cost: "346.50",
    cost: "269.50",
    weight: 1.45,
    color_code: "#89534B",
    color_name: "Whirl",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=500&h=500&fit=crop",
    categories: ["lips", "lip-pencil", "liner"],
    is_expiring: false,
    description: "Dirty rose. The perfect companion to Whirl lipstick. Creates a seamless, defined lip look.",
    product_notes: "Best Seller",
    benefits: "Precise definition, creamy texture, long-wearing, prevents bleeding",
    application: "Outline lips for definition. Fill in for an all-day base.",
    ingredients: "Hydrogenated Coco-Glycerides, Synthetic Wax, Ozokerite, Iron Oxides",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100006,
    name: "Lipglass - Clear",
    sku: "MAC-LP-LG-CLR",
    branded_box_available: true,
    available_inventory: 70,
    suggested_cost: "342.00",
    cost: "266.00",
    weight: 3.1,
    color_code: "",
    color_name: "Clear",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1631214503851-dc75e08c874c?w=500&h=500&fit=crop",
    categories: ["lips", "lip-gloss", "shine"],
    is_expiring: false,
    description: "Glass-like shine with high coverage. The original MAC Lipglass - a heritage favourite that delivers brilliant shine.",
    product_notes: "M·A·C Heritage",
    benefits: "Glass-like shine, moisturizing, can be worn alone or over lipstick",
    application: "Apply to bare lips or over lipstick for added shine.",
    ingredients: "Polybutene, Hydrogenated Polyisobutene, Ethylhexyl Palmitate, Silica",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100007,
    name: "Retro Matte Liquid Lipcolour - Lady Be Good",
    sku: "MAC-LP-RMLC-LBG",
    branded_box_available: true,
    available_inventory: 35,
    suggested_cost: "342.00",
    cost: "266.00",
    weight: 5,
    color_code: "#C4686B",
    color_name: "Lady Be Good",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=500&h=500&fit=crop",
    categories: ["lips", "liquid-lipstick", "matte"],
    is_expiring: false,
    description: "Muted pink-rose. Liquid lipstick with matte finish and long-lasting colour that doesn't transfer.",
    product_notes: null,
    benefits: "Transfer-proof, 8HR wear, intensely pigmented, comfortable matte",
    application: "Apply to clean, dry lips. Allow to set for 60 seconds.",
    ingredients: "Isododecane, Dimethicone, Trimethylsiloxysilicate, Disteardimonium Hectorite",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },

  // === FACE ===
  {
    id: 100010,
    name: "Studio Fix Fluid SPF 15 Foundation - NC30",
    sku: "MAC-FC-SFF-NC30",
    branded_box_available: true,
    available_inventory: 40,
    suggested_cost: "508.50",
    cost: "395.50",
    weight: 30,
    color_code: "#D4A574",
    color_name: "NC30",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&h=500&fit=crop",
    categories: ["face", "foundation", "matte"],
    is_expiring: false,
    description: "24HR breathable, soft-matte foundation with medium-to-full buildable coverage. Controls oil while hydrating. SPF 15 protection.",
    product_notes: "Best Seller",
    benefits: "24HR wear, oil control, SPF 15, buildable coverage, 71 shades available",
    application: "Apply with brush, sponge or fingertips. Blend from centre of face outward.",
    ingredients: "Water, Dimethicone, Trimethylsiloxysilicate, PEG-10 Dimethicone",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100011,
    name: "Studio Fix Fluid SPF 15 Foundation - NC42",
    sku: "MAC-FC-SFF-NC42",
    branded_box_available: true,
    available_inventory: 35,
    suggested_cost: "508.50",
    cost: "395.50",
    weight: 30,
    color_code: "#B8834B",
    color_name: "NC42",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
    categories: ["face", "foundation", "matte"],
    is_expiring: false,
    description: "24HR matte foundation with oil control. Perfect for medium-deep skin with golden undertones.",
    product_notes: "Best Seller",
    benefits: "24HR wear, controls shine, medium-to-full coverage, SPF 15",
    application: "Shake well. Apply with Studio Fix brush for flawless finish.",
    ingredients: "Water, Dimethicone, Trimethylsiloxysilicate, PEG-10 Dimethicone",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100012,
    name: "Studio Radiance Serum-Powered Foundation - NC35",
    sku: "MAC-FC-SRSP-NC35",
    branded_box_available: true,
    available_inventory: 30,
    suggested_cost: "585.00",
    cost: "455.00",
    weight: 30,
    color_code: "#C9965E",
    color_name: "NC35",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop",
    categories: ["face", "foundation", "radiant"],
    is_expiring: false,
    description: "Serum-infused foundation with medium buildable coverage and a lasting radiant finish. Skincare meets makeup.",
    product_notes: "New Formula",
    benefits: "Radiant finish, hydrating, serum-infused, buildable coverage",
    application: "Apply with fingers or brush for a natural, radiant finish.",
    ingredients: "Water, Dimethicone, Glycerin, Niacinamide, Hyaluronic Acid",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100013,
    name: "Mineralize Blush - Warm Soul",
    sku: "MAC-FC-MB-WS",
    branded_box_available: true,
    available_inventory: 45,
    suggested_cost: "468.00",
    cost: "364.00",
    weight: 3.2,
    color_code: "#D4886B",
    color_name: "Warm Soul",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5e?w=500&h=500&fit=crop",
    categories: ["face", "blush", "mineralize"],
    is_expiring: false,
    description: "A soft peachy-nude with gold shimmer. Builds lightly layer after layer without heavy coverage. Baked for 24 hours for ultimate luxury.",
    product_notes: "Best Seller",
    benefits: "Buildable colour, luminous finish, baked formula, universally flattering",
    application: "Sweep onto cheeks with a fluffy brush. Build for intensity.",
    ingredients: "Talc, Mica, Zinc Stearate, Dimethicone, Iron Oxides",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100014,
    name: "Mineralize Skinfinish Natural - Medium Dark",
    sku: "MAC-FC-MSN-MD",
    branded_box_available: true,
    available_inventory: 40,
    suggested_cost: "706.50",
    cost: "549.50",
    weight: 10,
    color_code: "#C49A6C",
    color_name: "Medium Dark",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop",
    categories: ["face", "powder", "setting"],
    is_expiring: false,
    description: "A baked powder that provides sheer coverage with a dimensional yet natural finish. Sets makeup beautifully.",
    product_notes: "Best Seller",
    benefits: "Natural finish, sheer coverage, dimensional glow, sets makeup",
    application: "Dust over foundation or wear alone for a natural look.",
    ingredients: "Talc, Mica, Silica, Zinc Stearate, Dimethicone",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100015,
    name: "Fix+ Setting Spray - Original",
    sku: "MAC-FC-FIX-OG",
    branded_box_available: true,
    available_inventory: 60,
    suggested_cost: "405.00",
    cost: "315.00",
    weight: 100,
    color_code: "",
    color_name: "",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=500&h=500&fit=crop",
    categories: ["face", "setting-spray", "primer"],
    is_expiring: false,
    description: "Multitasking setting spray. Alcohol-free formula that hydrates, primes, sets and refreshes makeup.",
    product_notes: "Cult Classic",
    benefits: "Sets makeup, refreshes skin, hydrating, alcohol-free",
    application: "Spray in an X and T motion over face. Use before, during, or after makeup.",
    ingredients: "Water, Glycerin, Cucumber Fruit Extract, Chamomile Extract, Green Tea Extract",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100016,
    name: "Studio Fix 24-Hour Smooth Wear Concealer - NC30",
    sku: "MAC-FC-SFC-NC30",
    branded_box_available: true,
    available_inventory: 50,
    suggested_cost: "378.00",
    cost: "294.00",
    weight: 7,
    color_code: "#D4A574",
    color_name: "NC30",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2f?w=500&h=500&fit=crop",
    categories: ["face", "concealer", "full-coverage"],
    is_expiring: false,
    description: "24-hour, full-coverage, waterproof concealer. Instantly camouflages dark circles, blemishes with a natural matte finish.",
    product_notes: "Best Seller",
    benefits: "24HR wear, waterproof, full coverage, natural matte finish",
    application: "Dot under eyes and blend. Use pointed tip for blemishes.",
    ingredients: "Dimethicone, Isododecane, Trimethylsiloxysilicate, Polymethyl Methacrylate",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },

  // === EYES ===
  {
    id: 100020,
    name: "MACStack Mascara - Black",
    sku: "MAC-EY-MSM-BK",
    branded_box_available: true,
    available_inventory: 55,
    suggested_cost: "513.00",
    cost: "399.00",
    weight: 12,
    color_code: "#000000",
    color_name: "Black",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&h=500&fit=crop",
    categories: ["eyes", "mascara", "volume"],
    is_expiring: false,
    description: "Elevated mascara with buildable volume and length. Innovative brush coats each lash for a stacked, fanned-out effect.",
    product_notes: "New Launch",
    benefits: "Buildable volume, clump-free, smudge-proof, easy to remove",
    application: "Wiggle wand from root to tip. Layer for more drama.",
    ingredients: "Aqua, Synthetic Beeswax, Stearic Acid, Triethanolamine, Acacia Senegal Gum",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100021,
    name: "In Extreme Dimension 3D Mascara - Black",
    sku: "MAC-EY-IED-BK",
    branded_box_available: true,
    available_inventory: 45,
    suggested_cost: "513.00",
    cost: "399.00",
    weight: 12,
    color_code: "#000000",
    color_name: "Black",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=500&h=500&fit=crop",
    categories: ["eyes", "mascara", "3d-lashes"],
    is_expiring: false,
    description: "3D mascara for extreme dimension. Extends and volumizes for the ultimate lash impact.",
    product_notes: null,
    benefits: "Volume + length, buildable, long-wearing, easy removal",
    application: "Apply from root to tip in a zigzag motion.",
    ingredients: "Aqua, Synthetic Beeswax, Acrylates Copolymer, Butylene Glycol",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100022,
    name: "Eye Kohl - Smolder",
    sku: "MAC-EY-EK-SM",
    branded_box_available: true,
    available_inventory: 65,
    suggested_cost: "315.00",
    cost: "245.00",
    weight: 1.36,
    color_code: "#1C1C1C",
    color_name: "Smolder",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=500&h=500&fit=crop",
    categories: ["eyes", "eyeliner", "kohl"],
    is_expiring: false,
    description: "Black with silver shimmer. Intense colour eyeliner with a smooth, blendable texture.",
    product_notes: "Best Seller",
    benefits: "Intense pigment, smooth application, blendable, long-wearing",
    application: "Line eyes close to lash line. Smudge for a smoky effect.",
    ingredients: "Cyclopentasiloxane, Isododecane, Polyethylene, Trimethylsiloxysilicate",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100023,
    name: "Pro Longwear Fluidline - Blacktrack",
    sku: "MAC-EY-PLF-BT",
    branded_box_available: true,
    available_inventory: 40,
    suggested_cost: "378.00",
    cost: "294.00",
    weight: 3,
    color_code: "#000000",
    color_name: "Blacktrack",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1607748851687-695bcbe7c7ae?w=500&h=500&fit=crop",
    categories: ["eyes", "eyeliner", "gel"],
    is_expiring: false,
    description: "True black. Pro gel eyeliner with 12-hour wear. Glides on smoothly and dries fast to a smudge-resistant finish.",
    product_notes: "Pro Essential",
    benefits: "12HR wear, smudge-proof, waterproof, intense colour",
    application: "Apply with angled brush along lash line. Set for 30 seconds.",
    ingredients: "Isododecane, Polyethylene, Ozokerite, Ceresin",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100024,
    name: "Eyeshadow - Soft Brown",
    sku: "MAC-EY-ES-SB",
    branded_box_available: true,
    available_inventory: 50,
    suggested_cost: "355.50",
    cost: "276.50",
    weight: 1.5,
    color_code: "#8B6914",
    color_name: "Soft Brown",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=500&h=500&fit=crop",
    categories: ["eyes", "eyeshadow", "matte"],
    is_expiring: false,
    description: "Muted golden brown. A transition shade essential for any eye look. Matte finish with high pigment payoff.",
    product_notes: "Pro Essential",
    benefits: "Highly pigmented, blendable, matte finish, versatile",
    application: "Apply to crease with a fluffy brush. Blend for seamless transition.",
    ingredients: "Talc, Zinc Stearate, Ethylhexyl Palmitate, Dimethicone",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100025,
    name: "Eyeshadow - Wedge",
    sku: "MAC-EY-ES-WG",
    branded_box_available: true,
    available_inventory: 45,
    suggested_cost: "355.50",
    cost: "276.50",
    weight: 1.5,
    color_code: "#9C7A5B",
    color_name: "Wedge",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop",
    categories: ["eyes", "eyeshadow", "matte"],
    is_expiring: false,
    description: "Soft beige-taupe. Perfect crease colour for soft, everyday looks. Matte finish.",
    product_notes: "Best Seller",
    benefits: "Blendable, matte, buildable, perfect transition shade",
    application: "Sweep through crease with blending brush.",
    ingredients: "Talc, Zinc Stearate, Ethylhexyl Palmitate, Dimethicone, Iron Oxides",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },

  // === TOOLS ===
  {
    id: 100030,
    name: "217S Blending Brush",
    sku: "MAC-TL-217S",
    branded_box_available: false,
    available_inventory: 30,
    suggested_cost: "540.00",
    cost: "420.00",
    weight: 25,
    color_code: "",
    color_name: "",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop",
    categories: ["tools", "brushes", "eyes"],
    is_expiring: false,
    description: "The cult favourite blending brush. Soft, tapered bristles blend eyeshadow to perfection.",
    product_notes: "Pro Essential",
    benefits: "Soft bristles, perfect for blending, durable, professional quality",
    application: "Use to blend eyeshadow in the crease and on the lid.",
    ingredients: "Synthetic Fibres, Wooden Handle",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100031,
    name: "187 Duo Fibre Face Brush",
    sku: "MAC-TL-187",
    branded_box_available: false,
    available_inventory: 25,
    suggested_cost: "720.00",
    cost: "560.00",
    weight: 45,
    color_code: "",
    color_name: "",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
    categories: ["tools", "brushes", "face"],
    is_expiring: false,
    description: "Duo fibre brush for lightweight application of powder, bronzer, and highlighter. Creates an airbrushed finish.",
    product_notes: "Pro Essential",
    benefits: "Airbrushed finish, lightweight application, versatile, professional grade",
    application: "Use for powder, bronzer, or highlighter. Stipple for sheer coverage.",
    ingredients: "Synthetic & Natural Fibres, Wooden Handle",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100032,
    name: "239 Eye Shader Brush",
    sku: "MAC-TL-239",
    branded_box_available: false,
    available_inventory: 35,
    suggested_cost: "495.00",
    cost: "385.00",
    weight: 20,
    color_code: "",
    color_name: "",
    product_type: "MAC",
    image: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=500&h=500&fit=crop",
    categories: ["tools", "brushes", "eyes"],
    is_expiring: false,
    description: "Flat shader brush for precise eyeshadow application. Soft, dense bristles pack on colour.",
    product_notes: null,
    benefits: "Dense bristles, precise application, perfect for lid colour",
    application: "Pat eyeshadow onto lid. Use to pack on colour.",
    ingredients: "Synthetic Fibres, Wooden Handle",
    expires_at: null,
    product_base: "MAC Cosmetics"
  }
]
