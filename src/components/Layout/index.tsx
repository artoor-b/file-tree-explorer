import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTree } from '../../context/TreeContext';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

export default function TreeLayout() {
  const { treeData } = useTree();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!treeData) {
      navigate('/');
    }
  }, [treeData, navigate]);

  if (!treeData) return null;

  const isExactTreeRoute = location.pathname === '/tree' || location.pathname === '/tree/';

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden">
      <Sidebar treeData={treeData} isExactTreeRoute={isExactTreeRoute} />
      <MainContent isExactTreeRoute={isExactTreeRoute} />
    </div>
  );
}
