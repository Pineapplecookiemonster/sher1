import { useState } from 'react';
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import DailyCheckIn from './pages/DailyCheckIn';
import './styles/dailyChallenge.css';
import Jokes from "./pages/Jokes";
import JokeLanding from "./pages/JokeLanding";
import MomentPage from "./pages/momentPage";
import SherApp from "./pages/SherApp";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const testPage = urlParams.get("page");

  const [page, setPage] = useState(testPage || "sherapp");

  return (
    <>
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'rules' && <RulesPage setPage={setPage} />}
      {page === 'daily' && <DailyCheckIn setPage={setPage}/>}
      {page === "jokes" && <Jokes setPage={setPage}/>}
      {page === "jokelanding" && <JokeLanding setPage={setPage} />}
      {page === "moment" && <MomentPage setPage={setPage}/>}
      {page === "sherapp" && <SherApp setPage={setPage} />}
    </>
  );
}
