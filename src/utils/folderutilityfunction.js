export const countChildren = (item) =>
  item.children?.length ||
  0 + (item.children?.reduce((acc, child) => acc + countChildren(child), 0) || 0);

export const folderItems = (items) =>
  items.map((item) => ({
    ...item,
    fullLabel: item.label,
    label: `${item.label} (${countChildren(item)})`,
    children: item.children ? folderItems(item.children) : [],
  }));
