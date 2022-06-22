import ReactDom from 'react-dom';
import '../styles/ModalWindow.css';
import { bookmark } from '../interfaces/BookmarkInterface';
import cross from "../assets/crossLg.svg";


export default function ModalWindow({ onClose, bookmark }: { onClose: any, bookmark: bookmark }) {

  function extractUrl(str: string) {
    const url = str.match(/(?<=\s+src=")\S*(?="\s)/);
    if (url) {
      return url[0];
    }
    return undefined;
  }

  function ratio() {
    const ratio = ((parseInt(bookmark.height!) / parseInt(bookmark.width!)) * 100).toFixed(2);
    return ratio
  }

  function isIframeData() {
    return bookmark.width && bookmark.height && bookmark.title && bookmark.html && extractUrl(bookmark.html)
  }
  function isImageData() {
    return bookmark.width && bookmark.height && bookmark.media_url
  }


  return ReactDom.createPortal(
    <>
      <div className="Modal-background" onClick={onClose} />
      <div className="Modal-container">
        <button onClick={onClose}>
          <img src={cross} alt="" />
        </button>
        {bookmark.type === "video" ?

          (isIframeData() ?
            <div
              className="Modal-container__iframe-container"
              style={{ paddingTop: `${ratio()}%` }}
            >
              <iframe
                src={extractUrl(bookmark.html!)}
                title={bookmark.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
            :
            <div className="Modal-container__error-message">
              <p>Le contenu média n'a pas pu être chargé.</p>
              {bookmark.url &&
                <>
                  <p>Vous pouvez accéder à la page en cliquant sur le lien ci-dessous.</p>
                  <a href={bookmark.url} target="_blank" rel="noreferrer">
                    {bookmark.url}
                  </a>
                </>
              }
            </div>
          )
          :
          (isImageData() ?
            <img
              className="Modal-img"
              src={bookmark.media_url}
              alt=""
              style={{ height: `${parseInt(ratio()) / 100}` }}
            />
            :
            <div className="Modal-container__error-message">
              <p>Le contenu média n'a pas pu être chargé.</p>
              {bookmark.url &&
                <>
                  <p>Vous pouvez accéder à la page en cliquant sur le lien ci-dessous.</p>
                  <a href={bookmark.url} target="_blank" rel="noreferrer">
                    {bookmark.url}
                  </a>
                </>
              }
            </div>
          )
        }
      </div>
    </>,
    document.getElementById("portal")!
  )
}
