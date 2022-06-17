import React from 'react';
import { bookmark } from '../interfaces/BookmarkInterface';

export default function List({bookmarks}: {bookmarks: bookmark[]}) {
  console.log(bookmarks)
  return (
    <div className="bookmark-list__container">
      {bookmarks.map(bookmark => (
        <article className="bookmark-list__container" key="d">
          <div>
            <img src={bookmark.thumbnail_url} alt=""/>
          </div>
          <div>
            <h2>{bookmark.title}</h2>
            <p>Publié{bookmark.upload_date && `le ${bookmark.upload_date}`} par {bookmark.author_name}</p>
            <p>Url: {bookmark.url}</p>
            <p>Ajouté il y a ....</p>
          </div>

        </article>
      ))}
    </div>
  )
}
