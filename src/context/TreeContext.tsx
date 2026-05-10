import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TreeNode } from '../types/tree';

interface TreeContextType {
  treeData: TreeNode | null;
  setTreeData: (data: TreeNode | null) => void;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(() => {
    const saved = localStorage.getItem('fileTreeData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tree data', e);
      }
    }
    return null;
  });

  useEffect(() => {
    if (treeData) {
      localStorage.setItem('fileTreeData', JSON.stringify(treeData));
    } else {
      localStorage.removeItem('fileTreeData');
    }
  }, [treeData]);

  return (
    <TreeContext.Provider value={{ treeData, setTreeData }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = () => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTree must be used within a TreeProvider');
  }
  return context;
};
