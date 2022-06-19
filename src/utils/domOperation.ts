export function insertAfter(newNode: any, existingNode: any) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

export function dragSwitchElement(container: any, y: number) {
  const allBookmarks = [...container.querySelectorAll('.bookmark-list__li:not(.dragging)')];
  for (let element of allBookmarks) {
    const box = element.getBoundingClientRect();
    const offsetTop = y - box.top;
    const offsetBottom = y - box.top - box.height;
    if (offsetTop > 0 && offsetBottom < 0) { // Hovering over a box
      if (offsetTop + offsetBottom > 0) { // moving  up
        return { direction: "up", element: element }
      } else { // moving down
        return { direction: "down", element: element }
      }
    }
  }
}