import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkoutsList from './pages/WorkoutsList';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutsList />} />
      </Routes>
    </Router>
  );
}
