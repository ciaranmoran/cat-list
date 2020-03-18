import { isResponseOK, endpoints, GET } from 'services/apis';

export const getPeople = async ({
  setLoading,
  setPeople,
  setError,
}) => {
  setLoading(true);

  const res = await GET(endpoints.get.people);

  if (isResponseOK(res)) {
    const { data } = res;

    setLoading(false);
    setPeople(data);

    return res;
  } else {
    setLoading(false);
    setError(res);
  }
};
