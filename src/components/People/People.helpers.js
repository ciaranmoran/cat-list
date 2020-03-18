import {
  cloneArray,
  groupByKey,
  orderByKey,
  deDuplicate,
} from 'helpers/utils';

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

export const getAllPetTypes = petOwners => {
  const allTypes = [];

  petOwners.forEach(owner =>
    allTypes.push(...owner.pets.map(pet => pet.type)),
  );

  const distinctTypes = deDuplicate(allTypes);

  return distinctTypes;
};

export const groupPeopleByGender = people =>
  groupByKey(people, 'gender');

export const getListViewItems = (genderGroups, petTypeKey) => {
  const out = [];

  Object.entries(genderGroups).forEach(group => {
    const [gender, people] = group;
    const pets = [];

    people.forEach(person => pets.push(...person[petTypeKey]));

    out.push({ gender, pets });
  });

  return out;
};

export const orderPetsByName = pets => {
  const out = cloneArray(pets);

  return orderByKey(out, 'name');
};
