export default function WorkoutCard({ workout }) {
    return (
        <div className="card">
            <h3>{workout.name}</h3>
            <p><strong>Type:</strong> {workout.type}</p>
            {workout.tags?.length > 0 && (
                <p><strong>Tags:</strong> {workout.tags.join(', ')}</p>
            )}
            <small>Created: {new Date(workout.createdAt).toLocaleDateString()}</small>
        </div>
    );
}
