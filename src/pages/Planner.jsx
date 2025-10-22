import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWorkouts } from "../api/workoutsApi";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const STORAGE_KEY = "gymgenie.planner.simple";

export default function Planner() {
    // All workouts from the API
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // The selected workout for each day (by _id)
    const [plan, setPlan] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    // Load workouts once
    useEffect(() => {
        async function load() {
            try {
                const data = await getWorkouts({ limit: 100, sort: "name" });
                setWorkouts(data.items || []);
            } catch (e) {
                setError(String(e.message || e));
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Save plan whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    }, [plan]);

    function handleChange(day, workoutId) {
        // Update just the one day
        setPlan({ ...plan, [day]: workoutId });
    }

    function clearPlan() {
        setPlan({});
        localStorage.removeItem(STORAGE_KEY);
    }

    if (loading) return <main style={{ padding: 16 }}>Loading planner…</main>;
    if (error) return <main style={{ padding: 16, color: "crimson" }}>Error: {error}</main>;

    return (
        <main>
            <div className="planner-header">
                <h1>Weekly Planner</h1>
                <div className="row">
                    <Link to="/" className="btn" >← Back</Link>
                    <button onClick={clearPlan} className="btn btn--ghost">Clear plan</button>
                </div>
            </div>

            <div className="planner-grid">
                {DAYS.map(day => (
                    <div key={day} className="planner-card">
                        <h3>{day}</h3>
                        <label>
                            Choose workout
                            <select
                                value={plan[day] || ""}
                                onChange={(e) => handleChange(day, e.target.value)}
                            >
                                <option value="">— No workout —</option>
                                {workouts.map((w) => (
                                    <option key={w._id} value={w._id}>{w.name}</option>
                                ))}
                            </select>
                        </label>
                        <div style={{ marginTop: 8 }}>
                            {plan[day] ? (
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <strong>{workouts.find((w) => w._id === plan[day])?.name}</strong>
                                    <Link to={`/workouts/${plan[day]}`} className="btn" style={{ padding: "6px 10px" }}>
                                        View
                                    </Link>
                                </div>
                            ) : (
                                <small style={{ opacity: 0.8 }}>No workout selected.</small>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

