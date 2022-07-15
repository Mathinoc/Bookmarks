import React from 'react'

export default function SearchBookmark({ searchString, setSearchString }: { searchString: string | undefined, setSearchString: React.Dispatch<React.SetStateAction<string | undefined>> }) {
  return (
    <div className="SearchBookmark" >
      <input
        type="search"
        placeholder="Recherche..."
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  )
}
