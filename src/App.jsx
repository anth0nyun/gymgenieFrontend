import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkoutsList from './pages/WorkoutsList';
import WorkoutDetail from './pages/WorkoutDetail';
import WorkoutForm from './pages/WorkoutForm';
import Planner from './pages/Planner';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutsList />} />
        <Route path="/workouts/new" element={<WorkoutForm />} />
        <Route path="/workouts/:id" element={<WorkoutDetail />} />
        <Route path="/workouts/:id/edit" element={<WorkoutForm />} />
         <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
}
