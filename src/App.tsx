import React, { useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { getPreperedName } from './getPreperedName';

export const App: React.FC = () => {
  const { name, born, died } = peopleFromServer[0];
  const [nameInput, selectNameInput] = useState('')
  const [query, setQuery] = useState('')

  const visibleNames = getPreperedName(peopleFromServer, {query})

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {`${name} (${born} - ${died})`}
        </h1>

        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            <input
              type="text"
              placeholder="Enter a part of the name"
              className="input"
              data-cy="search-input"
              value={nameInput}
              onChange={event => selectNameInput(event.target.value)}
            />
          </div>

          <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
            <div className="dropdown-content">

              <div className="dropdown-item" data-cy="suggestion-item">
                {visibleNames.map(people => (
                  <p className="has-text-link">{people.name}</p>
                ))}
              </div>

              <div className="dropdown-item" data-cy="suggestion-item">
                <p className="has-text-danger">Elisabeth Hercke</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
          role="alert"
          data-cy="no-suggestions-message"
        >
          <p className="has-text-danger">No matching suggestions</p>
        </div>
      </main>
    </div>
  );
};
