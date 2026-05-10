import { TreeNode, FolderNode, NodeWithPath } from '../types/tree';

export function validateTreeStructure(node: any): string | null {
  if (!node || typeof node !== 'object') {
    return 'Node must be an object.';
  }
  if (typeof node.name !== 'string' || node.name.trim() === '') {
    return 'Missing or invalid "name" property.';
  }
  if (node.type !== 'file' && node.type !== 'folder') {
    return `Invalid type for "${node.name}". Must be "file" or "folder".`;
  }
  if (node.type === 'file') {
    if (typeof node.size !== 'number' || node.size < 0) {
      return `File "${node.name}" is missing a valid "size" property (must be a number).`;
    }
  }
  if (node.type === 'folder') {
    if (node.children !== undefined) {
      if (!Array.isArray(node.children)) {
        return `Folder "${node.name}" has an invalid "children" property (must be an array).`;
      }
      for (const child of node.children) {
        const error = validateTreeStructure(child);
        if (error) return error;
      }
    }
  }
  return null;
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFolderSize(node: FolderNode): number {
  if (!node.children) return 0;
  return node.children.reduce((acc, child) => {
    if (child.type === 'file') return acc + child.size;
    return acc + getFolderSize(child);
  }, 0);
}

export function getChildrenCount(node: FolderNode): number {
  return node.children?.length || 0;
}

export function findNodeByPath(root: TreeNode, targetPath: string): TreeNode | null {
  const parts = targetPath.split('/').filter(Boolean);
  if (parts.length === 0) return null;
  
  if (parts[0] !== root.name) return null;
  
  let current: TreeNode = root;
  
  for (let i = 1; i < parts.length; i++) {
    if (current.type !== 'folder' || !current.children) return null;
    const next = current.children.find(c => c.name === parts[i]);
    if (!next) return null;
    current = next;
  }
  
  return current;
}

export function searchTree(root: TreeNode, query: string): NodeWithPath[] {
  const results: NodeWithPath[] = [];
  const q = query.toLowerCase();

  function traverse(node: TreeNode, currentPath: string) {
    const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name;
    if (node.name.toLowerCase().includes(q)) {
      results.push({ node, path: nodePath });
    }
    if (node.type === 'folder' && node.children) {
      node.children.forEach(child => traverse(child, nodePath));
    }
  }

  traverse(root, '');
  return results;
}
