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

  return (
    <div className="bookmark-list__container">
      <ul>
        {bookmarks && bookmarks.map(bookmark => (
          <li key={bookmark.creation_date}>
            <Bookmark bookmark={bookmark} removeBookmark={() => removeBookmark(bookmark.creation_date)}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
