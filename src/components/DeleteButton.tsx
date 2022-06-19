import React from 'react';
import deleteIcon from '../assets/deleteIcon.svg';

export default function DeleteButton({onClick}: {onClick: () => void}) {
  return (
    <button className="article__buttons-delete" onClick={onClick} >
      <img src={deleteIcon} alt="delete" />
    </button>
  )
}
