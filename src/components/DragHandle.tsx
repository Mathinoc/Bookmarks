import React from 'react';
import grab from '../assets/handleIcon.svg';

export default function DragHandle() {
  function onMouseDown (e: any) {
    e.target.parentNode.parentNode.parentNode.parentNode.setAttribute('draggable', 'true');
    console.log('draggable')
    console.log(e.target)
  }
  return (
    <div
      className='drag-handle'
      onMouseDown={onMouseDown}
    >
      <img src={grab} alt="grab" />
    </div>
  )
}
