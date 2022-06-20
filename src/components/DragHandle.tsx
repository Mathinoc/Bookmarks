import React from 'react';
import dragIcon from '../assets/dragIcon.svg';


export default function DragHandle({id}:{id: number}) {

  function onMouseDown() {
    document.querySelector(`li[id="${id}"]`)!.setAttribute("draggable", "true");
  }

  return (
    <div
      className='drag-handle'
      onMouseDown={onMouseDown}
    >
      <img src={dragIcon} alt="drag" draggable="false" />
    </div>
  )
}
