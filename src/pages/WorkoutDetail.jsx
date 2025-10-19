import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getWorkout, deleteWorkout } from '../api/workoutsApi';

export default function WorkoutDetail() {
    const { id } = useParams();
    const nav = useNavigate();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getWorkout(id);
                setWorkout(data);
            } catch (e) {
                setErr(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    async function handleDelete() {
        if (!confirm('Delete this workout?')) return;
        try {
            await deleteWorkout(id);
            nav('/');
        } catch (e) {
            alert('Delete failed: ' + e.message);
        }
    }

    if (loading) return <p style={{ padding: 16 }}>Loading workout…</p>;
    if (err) return <p style={{ padding: 16, color: 'crimson' }}>Error: {err}</p>;
    if (!workout) return <p style={{ padding: 16 }}>Not found.</p>;

    return (
        <main style={{ padding: 16 }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 12 }}>← Back to Workouts</Link>
            <h1 style={{ marginBottom: 4 }}>{workout.name}</h1>
            <p style={{ marginTop: 0 }}><strong>Type:</strong> {workout.type}</p>
            {workout.tags?.length > 0 && <p><strong>Tags:</strong> {workout.tags.join(', ')}</p>}

            <section style={{ marginTop: 16 }}>
                <h3>Exercises</h3>
                {workout.exercises?.length ? (
                    <ul>
                        {workout.exercises.map((ex, i) => (
                            <li key={i}>
                                <strong>{ex.name}</strong>
                                {ex.target ? <> — <em>{ex.target}</em></> : null}
                                {typeof ex.defaultSets === 'number' && typeof ex.defaultReps === 'number' ? (
                                    <> ({ex.defaultSets} × {ex.defaultReps})</>
                                ) : null}
                                {ex.notes ? <div style={{ color: '#555' }}>{ex.notes}</div> : null}
                            </li>
                        ))}
                    </ul>
                ) : <p>No exercises listed.</p>}
            </section>

            {workout.notes && (
                <section style={{ marginTop: 16 }}>
                    <h3>Notes</h3>
                    <p>{workout.notes}</p>
                </section>
            )}

            <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                <Link to={`/workouts/${workout._id}/edit`} className="btn">Edit</Link>
                <button onClick={handleDelete} className="btn" style={{ background: 'crimson', color: 'white' }}>
                    Delete
                </button>
            </div>
        </main>
    );
}
