import React, { useState } from 'react';
import '../styles/UrlSearch.css';
import spinner from '../assets/spinner.svg';
import crossIcon from '../assets/cross.svg'

interface urlArg {
  urlInput: React.RefObject<HTMLInputElement>,
  createBookmark: () => Promise<string>
}

export default function UrlSearch({ urlInput, createBookmark }: urlArg) {
  const [crossToggle, setCrossToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creationResponse, setCreationResponse] = useState<{ display: boolean, message: string }>({ display: false, message: "" }); //useState({trigger: false, message: ""});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response = "";
      if (!(urlInput && urlInput.current && urlInput.current.value === "")) {
        response = await createBookmark();
      } else {
        response = "Pas d'url détecté"
      }
      setCreationResponse({ display: true, message: response });
      setTimeout(() => setCreationResponse({ display: false, message: response }), 3000)
    } finally {
      setIsLoading(false);
    }
  }

  function handleDeleteClick() {
    if (urlInput && urlInput.current) {
      urlInput.current.value = "";
      setCrossToggle(false);
    }
  }
  function updateCrossToggle() {
    if (urlInput && urlInput.current && urlInput.current.value) {
      setCrossToggle(true);
    } else {
      setCrossToggle(false);
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
            onChange={updateCrossToggle}
          />
          {crossToggle &&
            <button
              onClick={handleDeleteClick}
              type="button"
              aria-label="clear-input"
            >
              <img src={crossIcon} alt="erase" />
            </button>}

          <p
            id="error-url-input"
            className={`${creationResponse.display && "url-search__error-displayed"}`}
          >
            {creationResponse.message}
          </p>

        </div>

      </form>
      {isLoading &&
        <div className="url-search__spinner">
          <img src={spinner} alt="spinner" />
        </div>
      }
    </div>
  )
}
