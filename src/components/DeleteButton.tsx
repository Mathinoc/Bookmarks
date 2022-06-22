import React from 'react';
import deleteIcon from '../assets/deleteIcon.svg';

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="Bookmark__button-delete" onClick={onClick} >
      <img src={deleteIcon} alt="delete" draggable="false" />
    </button>
  )
}
