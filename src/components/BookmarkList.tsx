import React, { useEffect, useRef, useState } from 'react';
import { bookmark } from '../interfaces/BookmarkInterface';
import Bookmark from './Bookmark';
import SearchBookmark from './SearchBookmark';
import { insertAfter, dragSwitchElement } from '../utils/domOperation';
import '../styles/BookmarkList.css';

export default function BookmarkList({ bookmarks, setBookmarks }: { bookmarks: bookmark[], setBookmarks: React.Dispatch<React.SetStateAction<bookmark[] | []>> }) {
  const [searchString, setSearchString] = useState<string>();
  const indexStart = useRef<number | null>();
  const indexEnd = useRef<number | null>();
  const switchFactor = useRef<{ lastDirection: string, factor: number }>({ lastDirection: "", factor: 0 });
  const [filteredBookmarks, setFilteredBookmarks] = useState<bookmark[]>();

  useEffect(() => {
    const filteredList = bookmarks
      .filter(el => {
        if (searchString) {
          return el.title.toLocaleLowerCase().includes(searchString?.toLocaleLowerCase());
        }
        return el
      })
    setFilteredBookmarks(filteredList);
  }, [searchString])

  function removeBookmark(bookmarkDate: number) {
    setBookmarks(prev => (
      prev.filter(elem => elem.creation_date !== bookmarkDate)
    ))
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

  function onDragOver(e: React.DragEvent<HTMLUListElement>) {
    e.preventDefault();
    const container = document.querySelector(".BookmarkList__ul");
    const afterElement = dragSwitchElement(container, e.clientY);
    const card = document.querySelector('.dragging');
    if (afterElement) {

      // Updates the DOM
      if (afterElement.direction === 'up') {
        container?.insertBefore(card!, afterElement.element);
      } else if (afterElement.direction === 'down') {
        insertAfter(card!, afterElement.element);
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
            switchFactor.current! = { ...switchFactor.current, lastDirection: afterElement.direction }
          }

          indexEnd.current! = parseInt(index);
        }
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
    const updatedIndex = indexEnd.current! + switchFactor.current!.factor;
    if ((indexEnd.current! !== null) && indexStart.current !== updatedIndex) {
      // if drop in the list && if position different than on dropStart
      let add = bookmarks[indexStart.current!];
      let active = [...bookmarks];
      active.splice(indexStart.current!, 1);
      active.splice(updatedIndex, 0, add);
      setBookmarks(active);
    };

    indexEnd.current = null;
    indexStart.current = null;
    switchFactor.current = { lastDirection: "", factor: 0 };
  }

  return (
    <div className="BookmarkList__container" >
      <SearchBookmark searchString={searchString} setSearchString={setSearchString} />
      <ul
        className="BookmarkList__ul"
        onDragOver={onDragOver}
      >
        {bookmarks && bookmarks.length === 0 &&
          <p className="BookmarkList__error">La liste de bookmarks est vide</p>
        }
        {filteredBookmarks && filteredBookmarks.length > 0 ?
          filteredBookmarks.map(bookmark => (
            <li
              id={bookmark.creation_date.toString()}
              className="BookmarkList__li"
              key={bookmark.creation_date}
              onDragStart={() => onDragStart(bookmark.creation_date.toString())}
              onDragEnd={(e) => onDragEnd(e, bookmark.creation_date.toString())}
            >
              <Bookmark bookmark={bookmark} removeBookmark={() => removeBookmark(bookmark.creation_date)} />
            </li>
          ))
          :
          <p className="BookmarkList__error">Aucun bookmark ne correspond à votre recherche</p>
        }
      </ul>
    </div>
  )
}

