import ReactDom from 'react-dom';
import '../styles/Modal.css';
import { bookmark } from '../interfaces/BookmarkInterface';
import cross from "../assets/cross.svg";


export default function Modal({ onClose, bookmark }: { onClose: any, bookmark: bookmark }) {

  return ReactDom.createPortal(
    <>
      <div className="modal-background" onClick={onClose} />
      <div className='modal-container'>
        <button onClick={onClose}>
          <img src={cross} alt="" />
        </button>
        <iframe src={bookmark.url} width="450" height="280" allowFullScreen title={bookmark.title} />
        {/* {bookmark.html} */}
      </div>
    </>,
    document.getElementById("portal")!
  )
}
