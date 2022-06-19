import React, { useState } from 'react';
import '../styles/UrlSearch.css';

interface urlArg {
  urlInput: React.RefObject<HTMLInputElement>,
  createBookmark: () => Promise<string>
}

export default function UrlSearch({ urlInput, createBookmark }: urlArg) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [creationResponse, setCreationResponse] = useState<{display: boolean, message: string}>({display: false, message: ""}); //useState({trigger: false, message: ""});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let response = "";
    if (!(urlInput.current && urlInput.current.value === "")) {
      response = await createBookmark();
    } else {
      response = "Pas d'url détecté"
    }
      setCreationResponse({display: true, message: response});
      setTimeout(()=>setCreationResponse({display: false, message: response}), 3000)
  }
  function handleClick() {
    if (urlInput.current) {
      urlInput.current.value = "";
      setToggle(false);
    }
  }
  function updateToggle() {
    if (urlInput.current && urlInput.current.value) {
      setToggle(true);
    } else {
      setToggle(false);
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
            onChange={updateToggle}
          />

          {toggle &&
            <button onClick={handleClick} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          }
          {
            <p id="error-url-input" className={`${creationResponse.display && "url-search__error-displayed"}`}>
              {creationResponse.message}
            </p>
          }
        </div>

      </form>
    </div>
  )
}
