import { useState } from 'react';
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import DailyCheckIn from './pages/DailyCheckIn';
import './styles/dailyChallenge.css';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'rules' && <RulesPage setPage={setPage} />}
      {page === 'daily' && <DailyCheckIn />}
    </>
  );
}
