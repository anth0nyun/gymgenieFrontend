import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

async function fetchWorkoutMeta() {
    const base = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
    const url = new URL(`${base}/workouts/meta`, /^https?:\/\//.test(base) ? undefined : window.location.origin);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
    return res.json();
}

export default function Stats() {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchWorkoutMeta();
                setMeta(data);
            } catch (e) {
                setErr(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p style={{ padding: 16 }}>Loading stats…</p>;
    if (err) return <p style={{ padding: 16, color: 'crimson' }}>Error: {err}</p>;
    if (!meta) return <p style={{ padding: 16 }}>No stats available.</p>;

    const byType = meta.byType || {};
    const topTags = meta.topTags || [];

    return (
        <main style={{ padding: 16, display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>Stats</h1>
                <Link to="/" className="btn">← Back</Link>
            </div>

            <section className="card">
                <h3 style={{ marginTop: 0 }}>Overview</h3>
                <p><strong>Total workouts:</strong> {meta.total}</p>
                <p><strong>By type:</strong></p>
                <ul>
                    <li>strength: {byType.strength ?? 0}</li>
                    <li>cardio: {byType.cardio ?? 0}</li>
                    <li>custom: {byType.custom ?? 0}</li>
                </ul>
            </section>

            <section className="card">
                <h3 style={{ marginTop: 0 }}>Top Tags</h3>
                {topTags.length === 0 ? (
                    <p>No tags yet.</p>
                ) : (
                    <ul>
                        {topTags.map(t => (
                            <li key={t.tag}>
                                #{t.tag} — {t.count}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
