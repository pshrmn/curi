const walk = (tree, fn, extra) => {
  if (Array.isArray(tree)) {
    tree.forEach(branch => {
      walk(branch, fn, extra)
    });
  } else {
    const childrenExtra = fn(tree, extra);
    if (tree.children) {
      tree.children.forEach(child => {
        walk(child, fn, childrenExtra);
      });
    }
  }
};

export default walk;
