import React from 'react';
import '../styles/Bookmark.css';
import { bookmark } from '../interfaces/BookmarkInterface';
import DragHandle from './DragHandle';

export default function Bookmark({bookmark}: {bookmark: bookmark}) {
  return (
      //! Fix key
      <article className="bookmark-list__container" key={bookmark.title}>
        <div>
          <img src={bookmark.thumbnail_url} alt="" />
        </div>
        <div>
          <h2>{bookmark.title}</h2>
          <p>Publié{bookmark.upload_date && ` le ${bookmark.upload_date}`} par {bookmark.author_name}</p>
          <p>Url: {bookmark.url}</p>
          <p>Ajouté il y a ....</p>
        </div>
        <DragHandle />
      </article>
  )
}
