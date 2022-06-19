import React, { useState } from 'react';
import '../styles/Bookmark.css';
import { bookmark } from '../interfaces/BookmarkInterface';
import DragHandle from './DragHandle';
import { timeDifference, updateInterval } from '../utils/timeDifference';
import DeleteButton from './DeleteButton';
import mockImage from "../assets/replacementImage.png";

export default function Bookmark({ bookmark, removeBookmark }: { bookmark: bookmark, removeBookmark: () => void }) {
const [elapsedTime, setElapsedTime] = useState<{deltaTime:number, formatted: string}>(() => timeDifference(bookmark.creation_date))

setTimeout(function updateElapsedTime () {
  setElapsedTime(timeDifference(bookmark.creation_date))

  setTimeout(() => updateElapsedTime, updateInterval(elapsedTime.deltaTime) )
}, updateInterval(elapsedTime.deltaTime) )

  return (
    <article className="bookmark-list__article">
      <div className="article__image-info">
        {bookmark.thumbnail_url ? (
          <>
            <img src={bookmark.thumbnail_url} alt="" />
            {(bookmark.duration || bookmark.height) &&
              <p>
                {bookmark.type === "video" ? (
                  bookmark.duration && bookmark.duration
                ) : (
                  bookmark.height && bookmark.width && `${bookmark.height} x ${bookmark.width}`
                )}
              </p>
            }
          </>
        ) : (
          <img src={mockImage} alt="" />
        )}
      </div>
      <div className="article__bookmark-info">
        <h2>{bookmark.title}</h2>
        {(bookmark.upload_date || bookmark.author_name) && (
          <p className="bookmark-info__publication">
            Publié{bookmark.upload_date && ` le ${bookmark.upload_date}`} {bookmark.author_name && `par ${bookmark.author_name}`}
          </p>
        )}
        <p>Url:&nbsp;
          <a href={bookmark.url} target="_blank" rel="noreferrer">
            {bookmark.url}
          </a>
        </p>
        <p className="bookmark-info__time-difference">{elapsedTime.formatted}</p>
      </div>
      <DeleteButton onClick={removeBookmark} />
      <div className="article__drag">
        <DragHandle />
      </div>
    </article>
  )
}
