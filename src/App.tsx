import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { getPreperedPeople } from '../src/getPreperedName';
import debounce from 'lodash.debounce';
import { DelayButton } from '../src/DelayButton/DelayButton';
import { Person } from './types/Person';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [delay, setDelay] = useState(300);
  const [isSearching, setIsSearching] = useState(true);
  const [visiblePeople, setVisiblePeople] =
    useState<Person[]>(peopleFromServer);
  const [activeId, setActiveId] = useState<Person | null>(null);

  const onActivePerson = (person: Person) => {
    if (person.name !== activeId?.name) {
      setActiveId(person);
    }
  };

  const onSelected = (person: Person) => {
    onActivePerson(person);
    setQuery(person.name);
    setIsSearching(false);
  };

  const defaultArray = useRef('');

  const applyQuery = (newQuery: string) => {
    if (defaultArray.current !== newQuery) {
      defaultArray.current = newQuery;
      setQuery(newQuery);
    }
  };

  const filterPeople = useCallback(
    debounce(() => {
      const newVisiblePeople = getPreperedPeople(peopleFromServer, query);

      if (newVisiblePeople) {
        setVisiblePeople(newVisiblePeople);
      }
    }, delay),
    [delay, query, peopleFromServer],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(event.currentTarget.value);
  };

  useEffect(() => {
    filterPeople();
  }, [query]);

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {activeId
            ? `${activeId?.name} (${activeId?.born} - ${activeId?.died})`
            : 'No selected person'}
        </h1>

        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            {isSearching ? (
              <div className="input-button">
                <input
                  type="text"
                  placeholder="Enter a part of the name"
                  className="input"
                  data-cy="search-input"
                  value={query}
                  onClick={() => {
                    if (isSearching) {
                      setIsSearching(false);
                      setActiveId(null);
                    }
                  }}
                  onChange={handleQueryChange}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setActiveId(null);
                    setQuery('');
                  }}
                  className="delete"
                ></button>
              </div>
            ) : (
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={() => {
                  setIsSearching(true);
                }}
              >
                <span>{`${activeId ? activeId?.name : 'No matching suggestions'}`}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            )}
          </div>

          <div className="delayButton">
            <DelayButton delay={delay} setterDelay={setDelay} />
          </div>

          <div
            className="dropdown-menu"
            role="menu"
            data-cy="suggestions-list"
            id="dropdown-menu"
          >
            {visiblePeople.length > 0 ? (
              isSearching && (
                <div className="dropdown-content">
                  {visiblePeople.map(people => (
                    <button
                      key={people.slug}
                      className="dropdown-item"
                      data-cy="suggestion-item"
                      onClick={() => {
                        console.log('render');
                        onSelected(people);
                      }}
                    >
                      <div className="has-text-link">
                        <p className="has-text-link">{people.name}</p>
                      </div>
                    </button>
                  ))}
                  {/* <div className="dropdown-item" data-cy="suggestion-item">
                  <p className="has-text-danger">Elisabeth Hercke</p>
                  </div> */}
                </div>
              )
            ) : (
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
