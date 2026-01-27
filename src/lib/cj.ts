const CJ_API_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1'
const CJ_API_KEY = process.env.CJ_API_KEY || ''

type CJTokenCache = {
  accessToken: string
  expiresAt: number
  refreshToken: string
}

let cjTokenCache: CJTokenCache | null = null

const CJ_TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000

export async function getCJAccessToken() {
  if (cjTokenCache && cjTokenCache.expiresAt > Date.now() + CJ_TOKEN_EXPIRY_BUFFER_MS) {
    return cjTokenCache.accessToken
  }

  const response = await fetch(`${CJ_API_BASE_URL}/authentication/getAccessToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apiKey: CJ_API_KEY })
  })

  if (!response.ok) {
    throw new Error(`CJ auth error: ${response.status}`)
  }

  const data = await response.json()
  if (!data?.data?.accessToken) {
    throw new Error('CJ auth response missing access token')
  }

  const expiresAt = data?.data?.accessTokenExpiryDate
    ? new Date(data.data.accessTokenExpiryDate).getTime()
    : Date.now() + 14 * 24 * 60 * 60 * 1000

  cjTokenCache = {
    accessToken: data.data.accessToken,
    refreshToken: data.data.refreshToken || '',
    expiresAt
  }

  return cjTokenCache.accessToken
}

export function getCJConfig() {
  return {
    CJ_API_BASE_URL,
    CJ_API_KEY
  }
}
