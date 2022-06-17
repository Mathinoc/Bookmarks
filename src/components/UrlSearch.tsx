import React, { useRef } from 'react'

export default function UrlSearch ({urlInput, createBookmark}: {urlInput: React.Ref<HTMLInputElement>, createBookmark: () => Promise<void>}) {//! fix type //: {createBookmark: React.FormEventHandler<HTMLFormElement>}

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createBookmark()
  }

  return (
    <div className="url-search-container">
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Save
        </button>
        <input type="url" ref={urlInput}/>
      </form>
    </div>
  )
}
