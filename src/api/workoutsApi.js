const BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
const ABSOLUTE = /^https?:\/\//i.test(BASE);


function buildUrl(path, params = {}) {

    const full = ABSOLUTE ? `${BASE}${path}` : `${BASE}${path}`;
    const url = new URL(full, ABSOLUTE ? undefined : window.location.origin);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') url.searchParams.set(k, v);
    });
    return url  .toString();
}

export async function getWorkouts(params = {}) {
    const url = buildUrl('/workouts', params);
    const res = await fetch(url);
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`GET ${url} -> ${res.status} ${txt}`);
    }
    return res.json();
}

