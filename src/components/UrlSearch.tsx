import { info } from 'console';
import React, { useRef } from 'react';
import '../styles/UrlSearch.css';

export default function UrlSearch({ urlInput, createBookmark }: { urlInput: React.RefObject<HTMLInputElement>, createBookmark: () => Promise<void> }) {//! fix type //: {createBookmark: React.FormEventHandler<HTMLFormElement>}

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createBookmark()
  }
  function handleClick() {
    if (urlInput && urlInput.current) {
      urlInput.current.value = "";
    }
  }

  return (
    <div className="url-search__container">
      <form onSubmit={handleSubmit}>
        <button type="submit" className='url-search__element url-search__save-button'>
          Save
        </button>
        <div className="url-search__element url-search__input-elements">
          <input
            type="url"
            ref={urlInput}
            placeholder="Paste url..."
          />
          <button onClick={handleClick} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

      </form>
    </div>
  )
}
