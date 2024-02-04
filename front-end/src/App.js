import { Routes, Route } from 'react-router-dom';
import { Home, Advanced, Help, Compare, Company } from './webpages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adv-search" element={<Advanced />} />
      <Route path="/help" element={<Help />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/company-result" element={<Company />} />

    </Routes>
  );
}

export default App;