import React, { useEffect, useState, useRef } from 'react';
import '../styles/HomeView.css';
import Header from '../components/Header';
import UrlSearch from '../components/UrlSearch';
import List from '../components/List';
import getNoembedInfo from '../services/noembedService';
import { bookmark } from '../interfaces/BookmarkInterface';
import formatDuration from '../utils/formatDuration';
import formatDate from '../utils/formatDate';

export default function HomeView() {
  const mockData = {
    "duration": 1070,
    "thumbnail_url": "https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166",
    "title": "Sylvain Lhommée @ Nation Entreprenante - Episode #5",
    "upload_date": "2021-06-21 02:42:24",
    "author_name": "BARTERLINK",
    "type": "video",
    "url": "https://vimeo.com/565486457",
    "creation_date": 1655569767848
  };


  const [bookmarks, setBookmarks] = useState<bookmark[] | []>(() => {
    const bookmarksJson = localStorage.getItem("bookmarkList");
    const bookmarkSaved = bookmarksJson && JSON.parse(bookmarksJson);
    return bookmarkSaved;
  });
  const urlInput = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState<{trigger: boolean, message:string}>({trigger: false, message:""});

  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarks))
  }, [bookmarks]);

  async function createBookmark(url: string) {
    let newBookmark = await getNoembedInfo(url);
    if (newBookmark.error) { //! handle error
      let errorMessage = "";
      if (newBookmark.error.indexOf("404") > -1) {
        errorMessage = "Aucune ressource trouvée, vérifiez l'url.";
      } else if (newBookmark.error.indexOf("500") > -1) {
        errorMessage = "Erreur serveur, réessayez plus tard";
      }
      setInputError({trigger: true, message: errorMessage})
    } else if (bookmarks.filter(elem => elem.url === newBookmark.url).length ) {
      setInputError({trigger: true, message: "Un bookmark existe dejà pour cet url"})
    } else {
      newBookmark = {
        ...newBookmark,
        creation_date: Date.now(),
        duration: newBookmark.duration ? formatDuration(newBookmark.duration) : false,
        upload_date: newBookmark.upload_date ? formatDate(newBookmark.upload_date) : false,
      }
      setBookmarks(prev => [newBookmark, ...prev]);
      setInputError({trigger: false, message: ""});
      urlInput.current!.value = "";
    }
  }



  return (
    <>
      <Header />
      <main>
        <UrlSearch
          urlInput={urlInput}
          createBookmark={() => createBookmark(urlInput.current!.value)}
          inputError={inputError}
        />
        <pre>
          {`
          https://vimeo.com/565486457
          https://vimeo.com/502231941
          https://vimeo.com/486857633
          https://www.flickr.com/photos/feuilllu/45771361701/in/photostream/
          https://www.flickr.com/photos/feuilllu/31899892028/in/photostream/`}
        </pre>
        <List
          bookmarks={bookmarks}
          setBookmarks={setBookmarks} />
      </main>

    </>
  )
}


