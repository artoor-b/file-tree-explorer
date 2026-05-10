import { Routes, Route } from 'react-router-dom';
import { TreeProvider } from './context/TreeContext';
import Home from './pages/Home';
import TreeLayout from './components/Layout';
import NodePage from './pages/NodePage';

function App() {
  return (
    <TreeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tree" element={<TreeLayout />}>
          <Route path=":nodePath" element={<NodePage />} />
        </Route>
      </Routes>
    </TreeProvider>
  );
}

export default App;
