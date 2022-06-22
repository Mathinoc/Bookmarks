import React, { useState } from 'react';
import '../styles/AddBookmark.css';
import spinner from '../assets/spinner.svg';
import crossIcon from '../assets/cross.svg'

interface urlArg {
  urlInput: React.RefObject<HTMLInputElement>,
  createBookmark: () => Promise<string>
}

export default function AddBookmark({ urlInput, createBookmark }: urlArg) {
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
    <div className="AddBookmark__container">
      <form onSubmit={handleSubmit}>
        <button type="submit" className='AddBookmark__form-element AddBookmark__save-button'>
          Ajouter
        </button>
        <div className="AddBookmark__form-element AddBookmark__input-elements">
          <input
            type="url"
            ref={urlInput}
            placeholder="Coller un url ici..."
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
            id="error-AddBookmark-input"
            className={`${creationResponse.display && "AddBookmark__error-displayed"}`}
          >
            {creationResponse.message}
          </p>

        </div>

      </form>
      {isLoading &&
        <div className="AddBookmark__spinner">
          <img src={spinner} alt="spinner" />
        </div>
      }
    </div>
  )
}
