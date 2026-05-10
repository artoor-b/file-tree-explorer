export interface FileNode {
  name: string;
  type: 'file';
  size: number;
}

export interface FolderNode {
  name: string;
  type: 'folder';
  children?: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;

export interface NodeWithPath {
  node: TreeNode;
  path: string;
}
