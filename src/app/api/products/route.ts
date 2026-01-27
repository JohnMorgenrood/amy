// CJ Dropshipping API documentation
// Documentation URL: https://developers.cjdropshipping.com/api2.0/v1/product/getCategory
// CURL example for API call
import { NextResponse } from 'next/server'
import { getCJAccessToken, getCJConfig } from '@/lib/cj'

export const dynamic = 'force-dynamic'

// Blanka API configuration
const BLANKA_API_URL = 'https://api.blankabrand.com/api/v1/products/'
const BLANKA_API_KEY = process.env.BLANKA_API_KEY || ''
const { CJ_API_BASE_URL, CJ_API_KEY } = getCJConfig()

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
  videoUrls?: string[]
}

interface BlankaResponse {
  count: number
  next: string | null
  previous: string | null
  results: BlankaProduct[]
}

type CJListV2Product = {
  id?: string
  nameEn?: string
  sku?: string
  bigImage?: string
  sellPrice?: string
  nowPrice?: string
  discountPrice?: string
  description?: string
  videoList?: string[]
  threeCategoryName?: string
  twoCategoryName?: string
  oneCategoryName?: string
  warehouseInventoryNum?: number
}

type CJListV2Response = {
  code: number
  result: boolean
  message: string
  data?: {
    pageSize: number
    pageNumber: number
    totalRecords: number
    totalPages: number
    content: Array<{
      productList: CJListV2Product[]
    }>
  }
}

function hashStringToNumber(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function normalizeCJCategories(product: CJListV2Product): string[] {
  const categories = [
    product.threeCategoryName,
    product.twoCategoryName,
    product.oneCategoryName,
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase())

  if (categories.length === 0) {
    return ['makeup']
  }

  return Array.from(new Set(categories))
}

function mapCJProduct(product: CJListV2Product): BlankaProduct | null {
  const fallbackName = product.nameEn || 'CJ Beauty Product'
  const basePrice = Number(product.discountPrice || product.nowPrice || product.sellPrice || '0')
  if (!basePrice || Number.isNaN(basePrice)) {
    return null
  }
  const videoUrls = Array.isArray(product.videoList)
    ? product.videoList.filter((url) => typeof url === 'string' && url.startsWith('http'))
    : []
  const suggestedCost = basePrice ? basePrice.toFixed(2) : '0.00'
  const cost = basePrice ? basePrice.toFixed(2) : '0.00'
  const productId = product.id || product.sku || fallbackName

  return {
    id: hashStringToNumber(productId),
    name: fallbackName,
    sku: product.sku || productId,
    branded_box_available: false,
    available_inventory: product.warehouseInventoryNum || 0,
    suggested_cost: suggestedCost,
    cost,
    weight: 0,
    color_code: '',
    color_name: '',
    product_type: 'CJ Dropshipping',
    image: product.bigImage || '',
    categories: normalizeCJCategories(product),
    is_expiring: false,
    description: product.description || 'Premium beauty product from CJ Dropshipping.',
    product_notes: null,
    benefits: '',
    application: '',
    ingredients: '',
    expires_at: null,
    product_base: 'CJ Dropshipping',
    videoUrls: videoUrls.length > 0 ? videoUrls : undefined
  }
}

const CJ_ALLOWED_KEYWORDS = [
  'makeup',
  'beauty',
  'cosmetic',
  'skincare',
  'skin care',
  'lipstick',
  'lip gloss',
  'lipgloss',
  'lip liner',
  'lipliner',
  'lip',
  'lips',
  'eye',
  'eyes',
  'eyeshadow',
  'eyeshadow palette',
  'eyeshadow pallet',
  'eyeshadow set',
  'eyeshadow kit',
  'foundation',
  'concealer',
  'contour',
  'bronzer',
  'setting powder',
  'setting spray',
  'powder',
  'palette',
  'brush',
  'makeup brush',
  'beauty blender',
  'sponge',
  'blender',
  'brow',
  'eyebrow',
  'mascara',
  'eyeliner',
  'primer',
  'blush',
  'highlighter',
  'illuminator',
  'bb cream',
  'cc cream',
  'powder foundation',
  'liquid foundation',
  'makeup set',
  'makeup kit',
  'cosmetic bag',
  'vanity case',
  'lash',
  'lashes',
  'false lashes',
  'perfume',
  'fragrance',
  'fashion',
  'apparel',
  'clothing',
  'dress',
  'jacket',
  'top',
  'skirt',
  'pants',
  'trousers',
  'bag',
  'handbag',
  'shoes',
  'accessories',
  'jewelry',
  'earring',
  'necklace'
]

function isCJAllowedProduct(product: CJListV2Product) {
  const haystack = [
    product.nameEn,
    product.threeCategoryName,
    product.twoCategoryName,
    product.oneCategoryName
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return CJ_ALLOWED_KEYWORDS.some((keyword) => haystack.includes(keyword))
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const pageSize = searchParams.get('page_size') || '50'
  const category = searchParams.get('category') || ''

  // If no API key, return demo data
  if (!CJ_API_KEY && !BLANKA_API_KEY) {
    return NextResponse.json({
      count: demoProducts.length,
      next: null,
      previous: null,
      results: demoProducts,
      isDemo: true
    })
  }

  if (CJ_API_KEY) {
    try {
      const accessToken = await getCJAccessToken()
      const keyword = category || 'beauty'
      const cjUrl = new URL(`${CJ_API_BASE_URL}/product/listV2`)
      cjUrl.searchParams.set('page', page)
      cjUrl.searchParams.set('size', pageSize)
      cjUrl.searchParams.set('keyWord', keyword)
      cjUrl.searchParams.set('features', 'enable_description,enable_category,enable_video')

      const response = await fetch(cjUrl.toString(), {
        headers: {
          'CJ-Access-Token': accessToken,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`CJ API error: ${response.status}`)
      }

      const data: CJListV2Response = await response.json()
      const productGroups = data.data?.content || []
      const products = productGroups.flatMap((group) => group.productList || [])
      const filteredProducts = products.filter(isCJAllowedProduct)
      const sourceProducts = filteredProducts.length > 0 ? filteredProducts : products
      const results = sourceProducts
        .map(mapCJProduct)
        .filter((product): product is BlankaProduct => product !== null)

      if (results.length === 0) {
        return NextResponse.json({
          count: demoProducts.length,
          next: null,
          previous: null,
          results: demoProducts,
          isDemo: true,
          error: 'No CJ products returned. Showing demo products.'
        })
      }

      return NextResponse.json({
        count: results.length,
        next: null,
        previous: null,
        results,
        isDemo: false
      })
    } catch (error) {
      console.error('Failed to fetch from CJ:', error)
      return NextResponse.json({
        count: demoProducts.length,
        next: null,
        previous: null,
        results: demoProducts,
        isDemo: true,
        error: 'CJ API unavailable - showing demo products'
      })
    }
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
      next: { revalidate: 3600 }
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
    image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/2587361/pexels-photo-2587361.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/4735874/pexels-photo-4735874.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3373737/pexels-photo-3373737.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/7290709/pexels-photo-7290709.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3373738/pexels-photo-3373738.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/4620841/pexels-photo-4620841.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3018848/pexels-photo-3018848.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3373740/pexels-photo-3373740.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/4620844/pexels-photo-4620844.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/2637820/pexels-photo-2637820.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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

  // === FACE ===
  {
    id: 100026,
    name: "Studio Fix Fluid SPF 15 Foundation - NC25",
    sku: "MAC-FC-SFF-NC25",
    branded_box_available: true,
    available_inventory: 40,
    suggested_cost: "560.00",
    cost: "435.00",
    weight: 30,
    color_code: "#E3C3A3",
    color_name: "NC25",
    product_type: "MAC",
    image: "https://images.pexels.com/photos/2533268/pexels-photo-2533268.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    categories: ["face", "foundation", "liquid"],
    is_expiring: false,
    description: "Oil-controlling, medium-to-full coverage liquid foundation with natural matte finish and 24-hour wear.",
    product_notes: "Best Seller",
    benefits: "24HR wear, medium-to-full coverage, shine control, SPF 15",
    application: "Apply to face with brush, sponge, or fingers. Blend outwards for even coverage.",
    ingredients: "Water, Cyclopentasiloxane, Dimethicone, Silica, Titanium Dioxide",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100027,
    name: "Studio Fix 24-Hour Concealer - NC20",
    sku: "MAC-FC-SFC-NC20",
    branded_box_available: true,
    available_inventory: 38,
    suggested_cost: "390.00",
    cost: "305.00",
    weight: 8,
    color_code: "#E7C9A9",
    color_name: "NC20",
    product_type: "MAC",
    image: "https://images.pexels.com/photos/2533269/pexels-photo-2533269.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    categories: ["face", "concealer"],
    is_expiring: false,
    description: "Long-wearing, crease-resistant concealer with natural matte finish and full coverage.",
    product_notes: null,
    benefits: "24HR wear, full coverage, crease-resistant, oil-controlling",
    application: "Dot under eyes or on blemishes and blend with fingertip or sponge.",
    ingredients: "Water, Isododecane, Dimethicone, Silica, Titanium Dioxide",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100028,
    name: "Prep + Prime Fix+ Setting Spray",
    sku: "MAC-FC-FIX",
    branded_box_available: true,
    available_inventory: 45,
    suggested_cost: "520.00",
    cost: "405.00",
    weight: 100,
    color_code: "",
    color_name: "",
    product_type: "MAC",
    image: "https://images.pexels.com/photos/4465125/pexels-photo-4465125.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    categories: ["face", "setting spray", "primer"],
    is_expiring: false,
    description: "Hydrating setting spray that refreshes makeup, boosts radiance, and reduces powdery finish.",
    product_notes: "Pro Essential",
    benefits: "Hydrates, refreshes makeup, softens powder finish",
    application: "Mist evenly over face from 12 inches away. Use before or after makeup.",
    ingredients: "Water, Glycerin, Butylene Glycol, Cucumber Extract",
    expires_at: null,
    product_base: "MAC Cosmetics"
  },
  {
    id: 100029,
    name: "Lipglass - Clear",
    sku: "MAC-LP-LG-CLR",
    branded_box_available: true,
    available_inventory: 55,
    suggested_cost: "330.00",
    cost: "255.00",
    weight: 3,
    color_code: "#F7D9D2",
    color_name: "Clear",
    product_type: "MAC",
    image: "https://images.pexels.com/photos/2533267/pexels-photo-2533267.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    categories: ["lips", "lip gloss", "gloss"],
    is_expiring: false,
    description: "Glass-like shine with a smooth, comfortable feel. Wear alone or over lipstick for extra gloss.",
    product_notes: null,
    benefits: "High-shine finish, smooth feel, layers over lip colour",
    application: "Apply to lips using applicator. Layer over lipstick if desired.",
    ingredients: "Polybutene, Mineral Oil, Hydrogenated Polyisobutene",
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
    image: "https://images.pexels.com/photos/1926620/pexels-photo-1926620.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/1464538/pexels-photo-1464538.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
    image: "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
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
