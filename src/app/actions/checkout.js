'use server';

export async function initCheckoutAction(payload) {
  const baseUrl = (process.env.BASE_URL || '').replace(/\/+$/, '');
  if (!baseUrl) return { success: false, error: 'BASE_URL environment variable is missing.' };

  const endpoint = baseUrl.endsWith('/checkout/init') ? baseUrl : `${baseUrl}/checkout/init`;
  const token = process.env.BASE_TOKEN || '';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        ...(token ? { Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data || data.success === false) {
      return {
        success: false,
        error: data?.message || data?.error || `Checkout failed (${res.status})`,
      };
    }

    let url = data.checkout_url || data.checkoutUrl || data.url;
    if (typeof url === 'string' && url.startsWith('/')) {
      url = `${new URL(baseUrl).origin}${url}`;
    }

    return { success: true, checkout_url: url, data };
  } catch (err) {
    return { success: false, error: err.message || 'Checkout server connection error.' };
  }
}
