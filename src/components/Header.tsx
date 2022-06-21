import React from 'react';
import '../styles/Header.css';
import iconPink from '../assets/book-icon-pink.png'

export default function Header() {
  return (
    <div className='app-header'>
      <img src={iconPink} alt="application icon" />
      <h1 className='app-header__title'>Bookmark</h1>
    </div>
  )
}
