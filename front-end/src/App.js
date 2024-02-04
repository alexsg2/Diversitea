import { Routes, Route } from 'react-router-dom';
import { Home, Advanced, Help, Compare, Company, About} from './webpages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adv-search" element={<Advanced />} />
      <Route path="/help" element={<Help />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/company-result" element={<Company />} />
      <Route path="/about" element={<About />} />

    </Routes>
  );
}

export default App;