import { useState } from 'react';
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import DailyCheckIn from './pages/DailyCheckIn';
import './styles/dailyChallenge.css';
import RewardsPage from "./pages/RewardsPage";
import VideoPage from "./pages/VideoPage";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const testPage = urlParams.get("page");

  const [page, setPage] = useState(testPage || "home");

  return (
    <>
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'rules' && <RulesPage setPage={setPage} />}
      {page === 'daily' && <DailyCheckIn />}
      {page === "rewards" && <RewardsPage setPage={setPage} />}
      {page === "video" && <VideoPage />}
    </>
  );
}
