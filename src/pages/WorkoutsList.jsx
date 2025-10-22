import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts } from '../api/workoutsApi';
import WorkoutCard from '../components/WorkoutCard';

export default function WorkoutsList() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getWorkouts(search ? { q: search } : {});
                setWorkouts(data.items || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [search]);

    if (loading) return <p style={{ padding: 16 }}>Loading workouts...</p>;
    if (error) return <p style={{ padding: 16, color: 'crimson' }}>Error: {error}</p>;

    return (
        <main style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <h1>GymGenie Workouts</h1>
                <Link to="/planner" className="btn" style={{ marginRight: 8 }}>Open Planner</Link>
                <Link to="/workouts/new" className="btn">+ New Workout</Link>
            </div>

            <input
                type="text"
                placeholder="Search workouts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', maxWidth: 420 }}
            />

            {workouts.length === 0 ? (
                <p>No workouts found.</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1rem',
                    }}
                >
                    {workouts.map((w) => (
                        <Link key={w._id} to={`/workouts/${w._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <WorkoutCard workout={w} />
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}

