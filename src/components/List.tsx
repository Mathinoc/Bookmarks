import React from 'react';
import '../styles/List.css';
import { bookmark } from '../interfaces/BookmarkInterface';
import Bookmark from './Bookmark';

export default function List({ bookmarks, setBookmarks }: { bookmarks: bookmark[], setBookmarks: React.Dispatch<React.SetStateAction<bookmark[] | []>> }) {

  function removeBookmark(bookmarkDate: number) {
    setBookmarks(prev => (
      prev.filter(elem => elem.creation_date !== bookmarkDate)
    ))
  }

  function onDragOver(e: any) {
    e.preventDefault();
    const container = document.querySelector(".bookmark-list__ul")
    //console.log(container, e.clientY)
    const afterElement = getDragAfterElement(container, e.clientY);
    //console.log(afterElement);
    const card = document.querySelector('.dragging');
    if (afterElement === null) {
      // e.target.appendChild(card);
      container!.appendChild(card!);
    } else {
      container?.insertBefore(card!, afterElement);
    }
  }

  function getDragAfterElement (container: any, y: number) {
    const allCards = [...container.querySelectorAll('.bookmark-list__li:not(.dragging)')];
    return allCards.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height/2;
      //console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return {offset: offset, element: child}
      } else {
        return closest
      }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
  }

  function onDragStart(id: string) {
    console.log('drag start');
    const target = document.getElementById(id);    
    console.log(target);
    setTimeout(() => {
      target!.classList.add('dragging');
    }, 0);
  }
  
  function onDragEnd(e: any, id: string) {
    e.stopPropagation();
    const target = document.getElementById(id);
    target!.classList.remove('dragging');
    console.log('over')
    target!.setAttribute('draggable', 'false')
  }

  return (
    <div className="bookmark-list__container" >
      <ul
        className="bookmark-list__ul"
        onDragOver={onDragOver}
      >
        {bookmarks && bookmarks.map(bookmark => (
          <li
            id={bookmark.creation_date.toString()}
            className="bookmark-list__li"
            key={bookmark.creation_date}
            onDragStart={() => onDragStart(bookmark.creation_date.toString())}
            onDragEnd={(e) => onDragEnd(e, bookmark.creation_date.toString())}
          >
            <Bookmark bookmark={bookmark} removeBookmark={() => removeBookmark(bookmark.creation_date)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
