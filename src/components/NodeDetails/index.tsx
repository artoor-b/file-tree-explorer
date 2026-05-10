import { TreeNode } from '../../types/tree';
import FileDetails from './FileDetails';
import FolderDetails from './FolderDetails';

export interface NodeDetailsProps {
  node: TreeNode;
  path: string;
}

export default function NodeDetails({ node, path }: NodeDetailsProps) {
  if (node.type === 'file') {
    return <FileDetails node={node} path={path} />;
  }
  return <FolderDetails node={node} path={path} />;
}
