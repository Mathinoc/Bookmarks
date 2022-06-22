import { useEffect, useState, useRef } from 'react';
import '../styles/HomeView.css';
import Header from '../components/Header';
import AddBookmark from '../components/AddBookmark';
import BookmarkList from '../components/BookmarkList';
import getNoembedInfo from '../services/noembedService';
import { bookmark } from '../interfaces/BookmarkInterface';
import { formatDuration, formatDate } from '../utils/formatAdapters';

export default function HomeComponent() {

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
        return "Seuls les urls provenant de vimeo.com et flickr.com sont acceptés";
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
        <AddBookmark
          urlInput={urlInput}
          createBookmark={() => createBookmark(urlInput.current!.value)}
        />
        <BookmarkList
          bookmarks={bookmarks}
          setBookmarks={setBookmarks} />
      </main>

    </>
  )
}
