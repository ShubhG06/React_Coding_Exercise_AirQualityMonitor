const OPENAQ_V2_ENDPOINT = `https://docs.openaq.org/v2`;

// This is required as we can only have strings as value of the Select/Dropdown component.
export const LOCATION_SEPARATOR = "_$$_";

export const getLocationInfo = async (location) => {
  const resp = await fetch(`${OPENAQ_V2_ENDPOINT}/latest/${location}`);
  const { results } = await resp.json();
  return results[0];
};

export const getCountriesList = async () => {
  const resp = await fetch(`${OPENAQ_V2_ENDPOINT}/countries`);
  const { results } = await resp.json();
  return results.map(({ code, name }) => ({
    value: code,
    text: name,
  }));
};

export const getCitiesInCountry = async (country) => {
  const resp = await fetch(`${OPENAQ_V2_ENDPOINT}/cities?country=${country}`);
  const { results } = await resp.json();
  return results.map(({ city, locations }) => ({
    key: city,
    text: city,
    value: `${city}${LOCATION_SEPARATOR}${locations}`,
  }));
};

/* 
  Getting all locations in a particular city (in a country)
  City name + Country code becomes the key here for filtering
*/
export const getLocationsInCity = async (city, country) => {
  const resp = await fetch(
    `${OPENAQ_V2_ENDPOINT}/locations?country=${country}&city=${city}`
  );
  const { results } = await resp.json();
  return results.map(({ id, name }) => ({
    key: id,
    value: id,
    text: name,
  }));
};
