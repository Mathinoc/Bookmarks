import React from 'react';
import '../styles/Header.css';
import iconPink from '../assets/book-icon-pink.png'

export default function Header() {
  return (
    <div className='Header'>
      <img src={iconPink} alt="application icon" />
      <h1 className='Header__title'>Bookmark</h1>
    </div>
  )
}
