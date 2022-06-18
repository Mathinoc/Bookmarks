import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import UrlSearch from '../components/UrlSearch';
import List from '../components/List';
import getNoembedInfo from '../services/noembedService';
import { bookmark } from '../interfaces/BookmarkInterface';

export default function HomeView() {
const mockData = {
  "duration": 1070,
  "thumbnail_url": "https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166",
  "title": "Sylvain Lhommée @ Nation Entreprenante - Episode #5",
  "upload_date": "2021-06-21 02:42:24",
  "author_name": "BARTERLINK",
  "type": "video",
  "url": "https://vimeo.com/565486457",
};


  const [bookmarks, setBookmarks] = useState<bookmark[] | []>(() => {
    const bookmarksJson = localStorage.getItem("bookmarkList");
    const bookmarkSaved = bookmarksJson && JSON.parse(bookmarksJson);
    return [mockData] || [mockData];
  })

  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarks))
  }, [bookmarks]);

  async function createBookmark (url: string) {
    
    const newBookmark = await getNoembedInfo(url);
    if (newBookmark.error) {
      console.log(newBookmark.error)
    } else {
      console.log(newBookmark)
      setBookmarks(prev => [newBookmark, ...prev])
    }
    console.log(url)
  }

  const urlInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Header />
      <UrlSearch urlInput={urlInput} createBookmark={() => createBookmark(urlInput.current!.value)}/>
      <List bookmarks={bookmarks}/>

    </div>
  )
}


