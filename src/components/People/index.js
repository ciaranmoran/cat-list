import React from 'react';
import { PeopleCtx } from 'components/context/PeopleContext';
import { getPeople } from 'services';
import ListView from 'components/ListView';
import {
  getPeopleWithPets,
  getAllPetTypes,
  getPetOwnersByType,
  groupPeopleByGender,
  getListViewItems,
  orderPetsByName,
} from './People.helpers';
import './People.css';

export default function People() {
  const [petType, setPetType] = React.useState('Cat');
  const [loading, setLoading] = React.useState(false);

  const ctx = React.useContext(PeopleCtx);
  const { people, setPeople, error, setError } = ctx;

  React.useEffect(() => {
    getPeople({ setLoading, setPeople, setError });
    // eslint-disable-next-line
  }, []);

  const updatePetType = () => e => {
    setPetType(e.target.value);
  };

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>{'Loading...'}</>;
  }

  const petOwners = getPeopleWithPets(people);
  const petTypes = getAllPetTypes(petOwners);
  const petTypeOwners = getPetOwnersByType({
    people: petOwners,
    type: petType,
    shouldAppendType: true,
    appendKey: `${petType}s`,
  });
  const groupedByGender = groupPeopleByGender(petTypeOwners);
  const listViewItems = getListViewItems(
    groupedByGender,
    `${petType}s`,
  );

  return (
    <div className="people-container">
      <select onChange={updatePetType()}>
        {petTypes.map(petType => (
          <option key={petType} value={petType}>
            {petType}
          </option>
        ))}
      </select>
      {listViewItems.map(listViewItem => {
        const { gender, pets } = listViewItem;
        const orderedPets = orderPetsByName(pets);

        return (
          <div key={gender}>
            <p>
              <b>{gender}</b>
            </p>
            <ListView items={orderedPets.map(pet => pet.name)} />
          </div>
        );
      })}
    </div>
  );
}
