import { cloneArray, groupByKey, orderByKey } from 'helpers/utils';

export const getPetOwnersByType = ({
  people,
  type,
  shouldAppendType,
  appendKey,
}) => {
  const out = cloneArray(people);

  return out
    .map(person => {
      const requestedPets = person.pets.filter(
        pet => pet.type === type,
      );

      const hasPetType = requestedPets.length > 0;

      if (!hasPetType) {
        return null;
      }

      if (shouldAppendType) {
        person[appendKey] = requestedPets;
      }

      return person;
    })
    .filter(i => i !== null);
};

export const getPeopleWithPets = people =>
  people.filter(person => {
    if (!person.pets) {
      return false;
    }
    return true;
  });

export const groupPeopleByGender = people =>
  groupByKey(people, 'gender');

export const getListViewItems = groups => {
  const out = [];

  Object.entries(groups).forEach(group => {
    const [key, value] = group;
    out.push({ gender: [key], pets: value });
  });

  return out;
};

export const orderPetsByName = pets => {
  const out = cloneArray(pets);

  return orderByKey(out, 'name');
};
