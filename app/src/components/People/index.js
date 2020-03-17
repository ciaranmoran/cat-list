import React from 'react';
import { getPeople } from 'services';
import ListView from 'components/ListView';
import {
  getPeopleWithPets,
  getPetOwnersByType,
  groupPeopleByGender,
  getListViewItems,
  orderPetsByName,
} from './People.helpers';

export default function People() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    getPeople({ setLoading, setPeople, setError });
  }, []);

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>{'Loading...'}</>;
  }

  const petOwners = getPeopleWithPets(people);
  const catOwners = getPetOwnersByType({
    people: petOwners,
    type: 'Cat',
    shouldAppendType: true,
    appendKey: 'cats',
  });
  const groupedByGender = groupPeopleByGender(catOwners);
  const listViewItems = getListViewItems(groupedByGender);

  return (
    <div>
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
