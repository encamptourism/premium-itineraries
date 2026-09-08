import config from "./config";

/**
 * Fetch premium itinerary data by slug directly from server-side API.
 * Endpoint: {BASE_URL}/premium-itineraries/{slug}
 *
 * @param {string} slug - The itinerary slug from the URL
 * @returns {Promise<Object|null>} Returns data object or null if not found
 */
export async function getPremiumItinerary(slug) {
  const baseUrl = config.baseUrl?.replace(/\/+$/, "");
  const token = config.baseToken;

  if (!baseUrl) {
    console.error("[API Error] BASE_URL is not defined in environment.");
    return null;
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      headers["token"] = token;
      headers["base-token"] = token;
      headers["basetoken"] = token;
      headers["x-api-token"] = token;
      headers["x-access-token"] = token;
    }

    // Safely prevent duplicate /premium-itineraries path
    const path = baseUrl.endsWith("/premium-itineraries")
      ? `/${slug}`
      : `/premium-itineraries/${slug}`;

    const endpoint = `${baseUrl}${path}`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(10000),
      next: {
        revalidate: 0, // Always fetch live fresh API response
        tags: [`itinerary-${slug}`],
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[API] Fetch failed for ${endpoint} with status ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json && json.data) {
      return json.data;
    }

    return json || null;
  } catch (error) {
    console.error(`[API Error] Failed to fetch itinerary "${slug}":`, error.message);
    return null;
  }
}

/**
 * Get the full API URL used to fetch an itinerary by slug
 * @param {string} slug - The itinerary slug
 * @returns {string} Complete endpoint URL string
 */
export function getItineraryApiUrl(slug) {
  const baseUrl = config.baseUrl?.replace(/\/+$/, "") || "";
  if (!baseUrl) return "";
  const path = baseUrl.endsWith("/premium-itineraries")
    ? `/${slug}`
    : `/premium-itineraries/${slug}`;
  return `${baseUrl}${path}`;
}

/**
 * Fetch all premium itineraries directly from server-side API.
 * Endpoint: {BASE_URL}/premium-itineraries
 *
 * @returns {Promise<Object|Array>} Returns API response object or array of itineraries
 */
export async function getAllPremiumItineraries() {
  const baseUrl = config.baseUrl?.replace(/\/+$/, "");
  const token = config.baseToken;

  if (!baseUrl) {
    console.error("[API Error] BASE_URL is not defined in environment.");
    return { success: false, data: [] };
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      headers["token"] = token;
      headers["base-token"] = token;
      headers["basetoken"] = token;
      headers["x-api-token"] = token;
      headers["x-access-token"] = token;
    }

    const endpoint = baseUrl.endsWith("/premium-itineraries")
      ? baseUrl
      : `${baseUrl}/premium-itineraries`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(10000),
      next: {
        revalidate: 60,
        tags: ["premium-itineraries"],
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error(`[API] Fetch failed for ${endpoint} with status ${res.status}`);
      return { success: false, data: [], status: res.status };
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error(`[API Error] Failed to fetch premium itineraries:`, error.message);
    return { success: false, data: [], error: error.message };
  }
}
