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
      return Array.isArray(json.data) ? json.data[0] || json.data : json.data;
    }

    return json || null;
  } catch (error) {
    console.error(`[API Error] Failed to fetch itinerary "${slug}":`, error.message);
    return null;
  }
}

/**
 * Safely extract MongoDB ObjectId / item_id string from an itinerary object or array
 * @param {Object|Array} itineraryData
 * @returns {string} item_id string or empty string
 */
export function getItineraryItemId(itineraryData) {
  if (!itineraryData) return "";
  const item = Array.isArray(itineraryData) ? itineraryData[0] : itineraryData;
  if (!item || typeof item !== "object") return "";

  const idCandidate =
    item._id ||
    item.id ||
    item.itineraryId ||
    item.itinerary_id ||
    item.itemId ||
    item.item_id ||
    item.data?._id ||
    item.data?.id ||
    item.data?.[0]?._id;

  if (idCandidate) {
    if (typeof idCandidate === "object" && idCandidate.$oid) {
      return String(idCandidate.$oid);
    }
    if (typeof idCandidate === "string" || typeof idCandidate === "number") {
      return String(idCandidate).trim();
    }
  }

  return "";
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

/**
 * Admin API client object for checkout & administrative endpoints
 */
export const adminapi = {
  get: async (endpoint, options = {}) => {
    const url =
      typeof window !== "undefined" && !endpoint.startsWith("http")
        ? endpoint.startsWith("/api")
          ? endpoint
          : `/api${endpoint.startsWith("/") ? "" : "/"}${endpoint}`
        : endpoint;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(options.headers || {}),
        },
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        data = { message: "Failed to parse response" };
      }
      return { data, status: res.status, ok: res.ok };
    } catch (err) {
      return { data: { message: err.message || "Network error" }, status: 500, ok: false };
    }
  },
  post: async (endpoint, payload, options = {}) => {
    const url =
      typeof window !== "undefined" && !endpoint.startsWith("http")
        ? endpoint.startsWith("/api")
          ? endpoint
          : `/api${endpoint.startsWith("/") ? "" : "/"}${endpoint}`
        : endpoint;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(options.headers || {}),
        },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        data = { message: "Failed to parse response" };
      }
      return { data, status: res.status, ok: res.ok };
    } catch (err) {
      return { data: { message: err.message || "Network error" }, status: 500, ok: false };
    }
  },
};

/**
 * Helper to construct carbontrace payload object with localStorage values or defaults
 * @param {number} redeemCtcoins - Amount of CTCoins to redeem
 * @returns {Object} carbontrace object for backend checkout payload
 */
export function getCarbonTracePayload(redeemCtcoins = 0) {
  let recieverAccountTxt = "57DQH3NF5CDJHSO24MZRIW7WP2KYL2BAPYD5RIN6G46RXN6QQDE6PWQRNQ";
  let resolvedClientId = "0a4c4992-bf7d-4f89-9fe9-09b330cf7e1f";

  if (typeof window !== "undefined") {
    // 1. Check live CarbonTrace SDK walletState instance if loaded
    const ctInstance = window.CarbontraceWallet;
    const ctState = ctInstance?.walletState || ctInstance?.state;
    const ctAddr = ctState?.address || ctState?.accounts?.[0] || ctState?.account;
    if (ctAddr) {
      recieverAccountTxt = ctAddr;
    }

    // 2. Parse 'walletconnect' item from localStorage
    try {
      const wcRaw = localStorage.getItem("walletconnect");
      if (wcRaw) {
        const wcObj = JSON.parse(wcRaw);
        if (wcObj?.accounts?.[0]) {
          recieverAccountTxt = wcObj.accounts[0];
        }
        if (wcObj?.clientId) {
          resolvedClientId = wcObj.clientId;
        }
      }
    } catch (e) {
      // Ignore JSON parse errors
    }

    // 3. Check direct account keys in localStorage
    const storedReciever =
      localStorage.getItem("recieverAccountTxt") ||
      localStorage.getItem("receiverAccountTxt") ||
      localStorage.getItem("account") ||
      localStorage.getItem("ct_account") ||
      localStorage.getItem("wallet_address") ||
      localStorage.getItem("address");

    if (storedReciever) {
      recieverAccountTxt = storedReciever;
    }

    const storedClientId =
      localStorage.getItem("clientId") ||
      localStorage.getItem("resolvedClientId") ||
      localStorage.getItem("ep_client_id") ||
      localStorage.getItem("ct_client_id");

    if (storedClientId) {
      resolvedClientId = storedClientId;
    }
  }

  return {
    recieverAccountTxt: String(recieverAccountTxt),
    resolvedClientId: String(resolvedClientId),
    REDEEM_CTCOINS: Number(redeemCtcoins) || 0,
  };
}

import { initCheckoutAction } from "@/app/actions/checkout";

/**
 * Initialize checkout flow with backend payload via Server Action
 */
export async function initCheckout(payload) {
  return initCheckoutAction(payload);
}

