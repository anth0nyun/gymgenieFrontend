import { useEffect, useState } from 'react';
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

    if (loading) return <p>Loading workouts...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main style={{ padding: '1rem' }}>
            <h1>GymGenie Workouts</h1>

            <input
                type="text"
                placeholder="Search workouts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '1rem', padding: '0.5rem' }}
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
                        <WorkoutCard key={w._id} workout={w} />
                    ))}
                </div>
            )}
        </main>
    );
}
