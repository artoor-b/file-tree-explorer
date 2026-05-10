import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTree } from '../context/TreeContext';
import { findNodeByPath } from '../utils/treeUtils';
import NodeDetails from '../components/NodeDetails';

export default function NodePage() {
  const { nodePath } = useParams<{ nodePath: string }>();
  const { treeData } = useTree();

  const nodeWithData = useMemo(() => {
    if (!treeData || !nodePath) return null;
    const decodedPath = decodeURIComponent(nodePath);
    const node = findNodeByPath(treeData, decodedPath);
    return node ? { node, path: decodedPath } : null;
  }, [treeData, nodePath]);

  if (!nodeWithData) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Node not found or invalid path.
      </div>
    );
  }

  return <NodeDetails node={nodeWithData.node} path={nodeWithData.path} />;
}
