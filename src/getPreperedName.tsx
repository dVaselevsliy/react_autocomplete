import { Person } from './types/Person';

export const getPreperedPeople = (
  people: Person[],
  query: string,
): Person[] => {
  let preperedPeople = [...people];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    preperedPeople = preperedPeople.filter(person =>
      person.name.toLowerCase().includes(normalizedQuery),
    );
  }

  console.log(preperedPeople);

  return preperedPeople;
};
