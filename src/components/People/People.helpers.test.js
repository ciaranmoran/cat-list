import getType from 'jest-get-type';

import {
  getPeopleWithPets,
  getAllPetTypes,
  getPetOwnersByType,
  groupPeopleByGender,
  getListViewItems,
  orderPetsByName,
} from './People.helpers';

test('should only return people that have pets', () => {
  const data = [
    {
      name: 'Jennifer',
      gender: 'Female',
      age: 18,
      pets: [{ name: 'Garfield', type: 'Cat' }],
    },
    { name: 'Steve', gender: 'Male', age: 45, pets: null },
  ];

  const peopleWithPets = getPeopleWithPets(data);

  // test immutability
  expect(data.filter(p => p.name === 'Steve').length).toEqual(1);

  // test filter
  expect(
    peopleWithPets.filter(p => p.name === 'Steve').length,
  ).toEqual(0);
});

test('should return a distinct list of pets', () => {
  const data = [
    {
      name: 'Jennifer',
      gender: 'Female',
      age: 18,
      pets: [
        { name: 'One', type: 'Dog' },
        { name: 'Two', type: 'Dog' },
      ],
    },
    {
      name: 'Samantha',
      gender: 'Female',
      age: 40,
      pets: [{ name: 'Tabby', type: 'Cat' }],
    },
    {
      name: 'Steve',
      gender: 'Male',
      age: 45,
      pets: [{ name: 'Fishie', type: 'Fish' }],
    },
  ];

  const petTypes = getAllPetTypes(data);

  expect(petTypes.length).toEqual(3);
  expect(petTypes.includes('Cat')).toEqual(true);
  expect(petTypes.includes('Dog')).toEqual(true);
  expect(petTypes.includes('Fish')).toEqual(true);
});

test('should only return people that have cats', () => {
  const data = [
    {
      name: 'Jennifer',
      gender: 'Female',
      age: 18,
      pets: [{ name: 'Garfield', type: 'Dog' }],
    },
    {
      name: 'Samantha',
      gender: 'Female',
      age: 40,
      pets: [{ name: 'Tabby', type: 'Cat' }],
    },
  ];

  const peopleWithCats = getPetOwnersByType({
    people: data,
    type: 'Cat',
    shouldAppendType: true,
    appendKey: 'cats',
  });

  // test immutability
  expect(data.filter(p => p.name === 'Jennifer').length).toEqual(1);
  expect(data.filter(p => p.name === 'Samantha')[0].cats).toEqual(
    undefined,
  );

  // test filter
  expect(
    peopleWithCats.filter(p => p.name === 'Jennifer').length,
  ).toEqual(0);
  expect(
    peopleWithCats.filter(p => p.name === 'Samantha').length,
  ).toEqual(1);
});

test('should group people by gender', () => {
  const data = [
    {
      name: 'Jennifer',
      gender: 'Female',
      age: 18,
      pets: [{ name: 'Garfield', type: 'Cat' }],
    },
    {
      name: 'Sam',
      gender: 'Male',
      age: 40,
      pets: [{ name: 'Tabby', type: 'Cat' }],
    },
    {
      name: 'Bruce',
      gender: 'Male',
      age: 40,
      pets: [{ name: 'Springsteen', type: 'Dog' }],
    },
    {
      name: 'Jordan',
      gender: 'Unspecified',
      age: 40,
      pets: [{ name: 'Tabby', type: 'Cat' }],
    },
  ];

  const grouped = groupPeopleByGender(data);

  // test immutability
  expect(Array.isArray(data)).toEqual(true);

  // test grouping with any gender
  const [jennifer] = grouped.Female;
  const [sam, bruce] = grouped.Male;
  const [jordan] = grouped.Unspecified;

  expect(jennifer).not.toEqual(undefined);
  expect(sam).not.toEqual(undefined);
  expect(bruce).not.toEqual(undefined);
  expect(jordan).not.toEqual(undefined);
});

test('should structure data for listview', () => {
  const data = [
    {
      name: 'Jennifer',
      gender: 'Female',
      age: 18,
      pets: [{ name: 'Garfield', type: 'Cat' }],
      Cats: [{ name: 'Garfield', type: 'Cat' }],
    },
    {
      name: 'Sam',
      gender: 'Male',
      age: 40,
      pets: [{ name: 'Tabby', type: 'Cat' }],
      Cats: [{ name: 'Tabby', type: 'Cat' }],
    },
    {
      name: 'Bruce',
      gender: 'Male',
      age: 40,
      pets: [
        { name: 'Springsteen', type: 'Dog' },
        { name: 'Tommy', type: 'Cat' },
      ],
      Cats: [{ name: 'Tommy', type: 'Cat' }],
    },
    {
      name: 'Jordan',
      gender: 'Unspecified',
      age: 40,
      pets: [{ name: 'Tabby', type: 'Cat' }],
      Cats: [{ name: 'Tabby', type: 'Cat' }],
    },
  ];

  const grouped = groupPeopleByGender(data);
  const listViewItems = getListViewItems(grouped, 'Cats');

  // test it has 1 item per gender
  expect(listViewItems.length).toEqual(3);

  // test structure
  expect(listViewItems[0].gender).not.toEqual(undefined);
  expect(listViewItems[0].pets).not.toEqual(undefined);

  expect(getType(listViewItems[0].gender)).toEqual('string');
  expect(getType(listViewItems[0].pets)).toEqual('array');
});

test('should order pets alphabetically', () => {
  const data = [
    { name: 'D', type: 'Cat' },
    { name: 'B', type: 'Cat' },
    { name: 'Z', type: 'Cat' },
    { name: 'C', type: 'Cat' },
    { name: 'A', type: 'Cat' },
  ];

  const ordered = orderPetsByName(data);

  // test immutability
  expect(data[0].name).toEqual('D');

  // test order
  expect(ordered[0].name).toEqual('A');
  expect(ordered[1].name).toEqual('B');
  expect(ordered[2].name).toEqual('C');
  expect(ordered[3].name).toEqual('D');
  expect(ordered[4].name).toEqual('Z');
});
