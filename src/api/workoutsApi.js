const BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
const ABSOLUTE = /^https?:\/\//i.test(BASE);

function buildUrl(path, params = {}) {
    const full = `${BASE}${path}`;
    const url = new URL(full, ABSOLUTE ? undefined : window.location.origin);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') url.searchParams.set(k, v);
    });
    return url.toString();
}

export async function getWorkouts(params = {}) {
    const url = buildUrl('/workouts', params);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
    return res.json();
}

export async function getWorkout(id) {
    const url = buildUrl(`/workouts/${id}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
    return res.json();
}

export async function createWorkout(payload) {
    const url = buildUrl('/workouts');
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
    return res.json();
}

export async function updateWorkout(id, payload) {
    const url = buildUrl(`/workouts/${id}`);
    const res = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error(`PATCH ${url} -> ${res.status}`);
    return res.json();
}

export async function deleteWorkout(id) {
    const url = buildUrl(`/workouts/${id}`);
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error(`DELETE ${url} -> ${res.status}`);
    return res.json();
}

