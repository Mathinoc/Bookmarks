import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import UrlSearch from '../components/UrlSearch';
import List from '../components/List';
import getNoembedInfo from '../services/noembedService';

export default function HomeView() {

  const [bookmarks, setBookmarks] = useState(() => {
    const bookmarksJson = localStorage.getItem("bookmarkList");
    const bookmarkSaved = bookmarksJson && JSON.parse(bookmarksJson);
    return bookmarkSaved || [];
  })

  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarks))
  }, [bookmarks])

  return (
    <div>
      <Header />
      <UrlSearch />
      <List />

    </div>
  )
}
