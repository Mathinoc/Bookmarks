import "../styles/SearchBookmark.css";
import search from "../assets/search.svg";

export default function SearchBookmark({ searchString, setSearchString }: { searchString: string | undefined, setSearchString: React.Dispatch<React.SetStateAction<string | undefined>> }) {
  return (
    <div className="SearchBookmark" >
      <button>
        <img src={search} alt="magnifier button to trigger filter" />
      </button>
      <input
        type="search"
        placeholder="Recherche..."
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  )
}
