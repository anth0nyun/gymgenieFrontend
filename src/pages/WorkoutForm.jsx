import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getWorkout, createWorkout, updateWorkout } from '../api/workoutsApi';

const EMPTY = {
    name: '',
    type: 'strength',
    tags: '',
    notes: '',
    exercises: [{ name: '', target: '', defaultSets: 3, defaultReps: 10, notes: '' }]
};

export default function WorkoutForm() {
    const { id } = useParams();         
    const isEdit = Boolean(id);
    const nav = useNavigate();

    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(isEdit);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try {
                const data = await getWorkout(id);
                setForm({
                    name: data.name ?? '',
                    type: data.type ?? 'strength',
                    tags: (data.tags ?? []).join(', '),
                    notes: data.notes ?? '',
                    exercises: (data.exercises?.length ? data.exercises : EMPTY.exercises)
                });
            } catch (e) {
                setErr(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [id, isEdit]);

    function updateField(path, value) {
        setForm(prev => ({ ...prev, [path]: value }));
    }

    function updateExercise(idx, key, value) {
        setForm(prev => {
            const copy = prev.exercises.map((e, i) => i === idx ? { ...e, [key]: value } : e);
            return { ...prev, exercises: copy };
        });
    }

    function addExercise() {
        setForm(prev => ({ ...prev, exercises: [...prev.exercises, { name: '', target: '', defaultSets: 3, defaultReps: 10, notes: '' }] }));
    }

    function removeExercise(idx) {
        setForm(prev => ({ ...prev, exercises: prev.exercises.filter((_, i) => i !== idx) }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const payload = {
                name: form.name.trim(),
                type: form.type,
                tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
                notes: form.notes,
                exercises: form.exercises
                    .filter(ex => ex.name.trim().length > 0)
                    .map(ex => ({
                        name: ex.name.trim(),
                        target: ex.target?.trim() || undefined,
                        defaultSets: Number(ex.defaultSets) || 0,
                        defaultReps: Number(ex.defaultReps) || 0,
                        notes: ex.notes?.trim() || undefined
                    }))
            };

            if (isEdit) {
                const updated = await updateWorkout(id, payload);
                nav(`/workouts/${updated._id}`);
            } else {
                const created = await createWorkout(payload);
                nav(`/workouts/${created._id}`);
            }
        } catch (e) {
            alert('Save failed: ' + e.message);
        }
    }

    if (loading) return <p style={{ padding: 16 }}>Loading…</p>;
    if (err) return <p style={{ padding: 16, color: 'crimson' }}>Error: {err}</p>;

    return (
        <main style={{ padding: 16 }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 12 }}>← Back to Workouts</Link>
            <h1>{isEdit ? 'Edit Workout' : 'New Workout'}</h1>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
                <label>
                    Name*
                    <input
                        required
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Push Day A"
                    />
                </label>

                <label>
                    Type*
                    <select value={form.type} onChange={(e) => updateField('type', e.target.value)}>
                        <option value="strength">strength</option>
                        <option value="cardio">cardio</option>
                        <option value="custom">custom</option>
                    </select>
                </label>

                <label>
                    Tags (comma separated)
                    <input
                        value={form.tags}
                        onChange={(e) => updateField('tags', e.target.value)}
                        placeholder="push, upper, chest"
                    />
                </label>

                <label>
                    Notes
                    <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        placeholder="Warm up 10 min; focus on form."
                    />
                </label>

                <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
                    <h3 style={{ marginTop: 0 }}>Exercises</h3>
                    {form.exercises.map((ex, i) => (
                        <div key={i} style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr 1fr auto', alignItems: 'end', marginBottom: 8 }}>
                            <label style={{ display: 'grid' }}>
                                Name*
                                <input value={ex.name} onChange={e => updateExercise(i, 'name', e.target.value)} placeholder="Bench Press" required />
                            </label>
                            <label style={{ display: 'grid' }}>
                                Target
                                <input value={ex.target} onChange={e => updateExercise(i, 'target', e.target.value)} placeholder="chest" />
                            </label>
                            <label style={{ display: 'grid' }}>
                                Sets
                                <input type="number" min="0" value={ex.defaultSets} onChange={e => updateExercise(i, 'defaultSets', e.target.value)} />
                            </label>
                            <label style={{ display: 'grid' }}>
                                Reps
                                <input type="number" min="0" value={ex.defaultReps} onChange={e => updateExercise(i, 'defaultReps', e.target.value)} />
                            </label>
                            <button type="button" onClick={() => removeExercise(i)} style={{ height: 36 }}>Remove</button>
                            <label style={{ gridColumn: '1 / -1', display: 'grid' }}>
                                Notes
                                <input value={ex.notes} onChange={e => updateExercise(i, 'notes', e.target.value)} placeholder="Cues or variations..." />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={addExercise}>+ Add exercise</button>
                </section>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button type="submit" className="btn">{isEdit ? 'Save Changes' : 'Create Workout'}</button>
                    <Link to="/" className="btn" style={{ background: '#eee' }}>Cancel</Link>
                </div>
            </form>
        </main>
    );
}
