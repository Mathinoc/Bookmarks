import React from 'react'

export default function UrlSearch () {
  function createBookmark () {
    console.log('creating bookmarks')
  }
  return (
    <div className="url-search-container">
      <form onSubmit={createBookmark}>
        <button type="submit">
          Save
        </button>
        <input type="url" />
      </form>
    </div>
  )
}
