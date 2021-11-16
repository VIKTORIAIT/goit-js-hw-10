export default function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(data => data.json())
    .then(data => {
      if (data.status === 404) {
        throw new Error(data);
      }
      return data;
    });
}
