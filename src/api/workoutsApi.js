const API_BASE = '/api/workouts';

export async function getWorkouts(params = {}) {
    const url = new URL(API_BASE, window.location.origin);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') url.searchParams.set(k, v);
    });

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}
