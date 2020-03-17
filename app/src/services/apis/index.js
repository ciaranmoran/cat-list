import axios from 'axios';
const baseUrl = 'https://gist.githubusercontent.com/medibank-digital';
const gistId = 'a1fc81a93200a7b9d5f8b7eae0fac6f8';
const revisionId = 'de10a4fcf717e6c431e88c965072c784808fd6b2';
const fileName = 'people.json';

const OK_STATUSES = [200, 204];

export const endpoints = {
  get: {
    people: `${baseUrl}/${gistId}/raw/${revisionId}/${fileName}`,
  },
};

export const GET = async endpoint => {
  try {
    return await axios.get(endpoint);
  } catch (err) {
    return err.toString();
  }
};

export const isResponseOK = response =>
  response && OK_STATUSES.includes(response.status);
