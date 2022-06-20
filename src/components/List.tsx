import React, { useRef } from 'react';
import '../styles/List.css';
import { bookmark } from '../interfaces/BookmarkInterface';
import Bookmark from './Bookmark';
import { insertAfter, dragSwitchElement } from '../utils/domOperation';

export default function List({ bookmarks, setBookmarks }: { bookmarks: bookmark[], setBookmarks: React.Dispatch<React.SetStateAction<bookmark[] | []>> }) {
  const indexEnd = useRef<number>();
  const indexStart = useRef<number>();
  const switchFactor = useRef<{ lastDirection: string, factor: number }>();

  function removeBookmark(bookmarkDate: number) {
    setBookmarks(prev => (
      prev.filter(elem => elem.creation_date !== bookmarkDate)
    ))
  }

  function onDragOver(e: React.DragEvent<HTMLUListElement>) {
    e.preventDefault();
    const container = document.querySelector(".bookmark-list__ul")
    const afterElement = dragSwitchElement(container, e.clientY);
    const card = document.querySelector('.dragging');
    if (afterElement) {

      // Updates the DOM
      if (afterElement.direction === 'up') {
        container?.insertBefore(card!, afterElement.element);
      } else if (afterElement.direction === 'down') {
        insertAfter(card!, afterElement.element)
      }

      // Updates react references in order to update the bookmarks state variable on drag end.
      for (let index in bookmarks) {
        if (bookmarks[index].creation_date.toString() === afterElement.element.getAttribute('id')) {

          if (switchFactor.current && switchFactor.current.lastDirection && switchFactor.current.lastDirection !== afterElement.direction) {
            if (switchFactor.current.lastDirection === 'up') {
              switchFactor.current! = { lastDirection: afterElement.direction, factor: 1 }
            } else {
              switchFactor.current! = { lastDirection: afterElement.direction, factor: -1 }
            }
          } else {
            switchFactor.current! = { lastDirection: afterElement.direction, factor: 0 }
          }

          indexEnd.current! = parseInt(index);
        }
      }
    }
  }

  function onDragStart(id: string) {
    const target = document.getElementById(id);
    setTimeout(() => {
      target!.classList.add('dragging');
    }, 0);
    for (let index in bookmarks) {
      if (bookmarks[index].creation_date.toString() === id) {
        indexStart.current! = parseInt(index);
      }
    }
  }

  function onDragEnd(e: React.DragEvent<HTMLLIElement>, id: string) {
    e.stopPropagation();
    const target = document.getElementById(id);
    target!.classList.remove('dragging');
    target!.removeAttribute('draggable');
    const childNode = target!.children!.item(0);
    childNode!.removeAttribute('draggable');

    // update the bookmarks state variable.
    let add = bookmarks[indexStart.current!];
    let active = [...bookmarks];
    active.splice(indexStart.current!, 1);
    const updatedIndex = indexEnd.current! + switchFactor.current!.factor
    active.splice(updatedIndex, 0, add);
    setBookmarks(active)
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

