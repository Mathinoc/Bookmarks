import React from 'react';

export default function DragHandle({id}:{id: number}) {

  function onMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    document.querySelector(`li[id="${id}"]`)!.setAttribute("draggable", "true");
  }

  return (
    <div
      className='drag-handle'
      onMouseDown={onMouseDown}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" >
        <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    </div>
  )
}
