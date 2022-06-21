import React, { useEffect, useState, useRef } from 'react';
import '../styles/HomeView.css';
import Header from '../components/Header';
import UrlSearch from '../components/UrlSearch';
import List from '../components/List';
import getNoembedInfo from '../services/noembedService';
import { bookmark } from '../interfaces/BookmarkInterface';
import { formatDuration, formatDate } from '../utils/formatAdapters';
import Modal from '../components/Modal';

export default function HomeView() {

  const [bookmarks, setBookmarks] = useState<bookmark[] | []>(() => {
    const bookmarksJson = localStorage.getItem("bookmarkList");
    const bookmarkSaved = bookmarksJson && JSON.parse(bookmarksJson);
    return bookmarkSaved || [];
  });
  const urlInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarks))
  }, [bookmarks]);

  async function createBookmark(url: string): Promise<string> {
    const urlCheck = url.slice(url.length - 1) === '/' ? url.slice(0, -1) : url;
    let newBookmark = await getNoembedInfo(urlCheck);
    if (newBookmark.error) {
      if (newBookmark.error.indexOf("404") > -1) {
        return "Aucune ressource trouvée, vérifiez l'url.";
      } else if (newBookmark.error.indexOf("500") > -1) {
        return "Erreur serveur, réessayez plus tard";
      } else if (newBookmark.error === "no matching providers found") {
        return "Url non valide";
      }

    } else if (bookmarks && bookmarks.filter(elem => elem.url === newBookmark.url).length) {
      return "Un bookmark existe dejà pour cet url"

    } else {
      newBookmark = {
        ...newBookmark,
        creation_date: Date.now(),
        duration: newBookmark.duration ? formatDuration(newBookmark.duration) : false,
        upload_date: newBookmark.upload_date ? formatDate(newBookmark.upload_date) : false,
      }
      setBookmarks(prev => [newBookmark, ...prev]);
      urlInput.current!.value = "";
      return "Un bookmark a été créé !"
    }
    return "Erreur"
  }

  return (
    <>
      <Header />
      <main>
        <UrlSearch
          urlInput={urlInput}
          createBookmark={() => createBookmark(urlInput.current!.value)}
        />
        <Modal>HEy I'm a modal</Modal>
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
