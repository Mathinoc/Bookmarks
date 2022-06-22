import { useState } from 'react';
import '../styles/Bookmark.css';
import { bookmark } from '../interfaces/BookmarkInterface';
import DragHandle from './DragHandle';
import { timeDifference, updateInterval } from '../utils/timeDifference';
import DeleteButton from './DeleteButton';
import mockImage from "../assets/replacementImage.png";
import ModalWindow from './ModalWindow';

export default function Bookmark({ bookmark, removeBookmark }: { bookmark: bookmark, removeBookmark: () => void }) {
  const [elapsedTime, setElapsedTime] = useState<{ deltaTime: number, formatted: string }>(() => timeDifference(bookmark.creation_date))
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  setTimeout(function updateElapsedTime() {
    setElapsedTime(timeDifference(bookmark.creation_date))

    setTimeout(() => updateElapsedTime, updateInterval(elapsedTime.deltaTime))
  }, updateInterval(elapsedTime.deltaTime));

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      {isModalOpen &&
        <ModalWindow onClose={() => setIsModalOpen(false)} bookmark={bookmark} />
      }
      <div className="Bookmark-container">
        <div className="Bookmark-container__image-info">
          {bookmark.thumbnail_url ? (
            <>
              <img
                src={bookmark.thumbnail_url}
                alt="thumbnail"
                draggable="false"
                onClick={openModal}
              />

              {(bookmark.type === "video" && bookmark.duration) ?
                <p>
                  {bookmark.duration}
                </p>
                : (bookmark.type === "photo" && bookmark.height && bookmark.width) &&
                <p>
                  {`${bookmark.height} x ${bookmark.width}`}
                </p>
              }

            </>
          ) : (
            <img src={mockImage} alt="" />
          )}
        </div>
        <div className="Bookmark-container__bookmark-info">
          <h2 onClick={openModal}>{bookmark.title}</h2>
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
        <DragHandle id={bookmark.creation_date} />
      </div>
    </>
  )
}
