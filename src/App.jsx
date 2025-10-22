import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkoutsList from './pages/WorkoutsList';
import WorkoutDetail from './pages/WorkoutDetail';
import WorkoutForm from './pages/WorkoutForm';
import Stats from './pages/Stats';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutsList />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/workouts/new" element={<WorkoutForm />} />
        <Route path="/workouts/:id" element={<WorkoutDetail />} />
        <Route path="/workouts/:id/edit" element={<WorkoutForm />} />
      </Routes>
    </Router>
  );
}
