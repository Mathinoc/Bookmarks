import React from 'react';
import dragIcon from '../assets/dragIcon.svg';
import arrowDown from '../assets/arrowdown.svg';
import arrowUp from '../assets/arrowup.svg';

export default function DragHandle({ id }: { id: number }) {

  function onMouseDown() {
    document.querySelector(`li[id="${id}"]`)!.setAttribute("draggable", "true");
  }

  return (
    <div className="article__drag-area">
      <img src={arrowUp} alt="" />
      <div
        className='article__drag-handle'
        onMouseDown={onMouseDown}
      >
        <img src={dragIcon} alt="drag" draggable="false" />
      </div>
      <img src={arrowDown} alt="" />
    </div>
  )
}
