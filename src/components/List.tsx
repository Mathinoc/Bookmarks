import React from 'react';
import { bookmark } from '../interfaces/BookmarkInterface';
import Bookmark from './Bookmark';

export default function List({bookmarks}: {bookmarks: bookmark[]}) {
  console.log(bookmarks)
  return (
    <div className="bookmark-list__container">
      {bookmarks.map(bookmark => (
        <Bookmark bookmark={bookmark} />
      ))}
    </div>
  )
}
