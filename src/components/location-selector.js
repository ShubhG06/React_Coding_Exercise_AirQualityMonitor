import React, { useEffect, useState } from "react";
import { Grid, Select } from "semantic-ui-react";
import {
  getCitiesInCountry,
  getLocationsInCity,
  LOCATION_SEPARATOR,
} from "../services/data-fetcher";

const CompareAirQuality = ({ countries, onSelect }) => {
  const [cities, setCities] = useState(null);
  const [locations, setLocations] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      getCitiesInCountry(selectedCountry).then(setCities);
    }
    setCities(null);
    setSelectedCity(null);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) {
      let [city, count] = selectedCity.split(LOCATION_SEPARATOR);
      if (Number(count) !== 0) {
        getLocationsInCity(city, selectedCountry).then(setLocations);
      }
    }
    setLocations(null);
  }, [selectedCity]);

  return (
    <Grid>
      <Grid.Row centered>
        <Select
          search
          placeholder="Select Country"
          onChange={(_, event) => setSelectedCountry(event.value)}
          options={countries}
        />
      </Grid.Row>
      <Grid.Row centered>
        {cities ? (
          <Select
            search
            placeholder="Select City"
            onChange={(_, event) => setSelectedCity(event.value)}
            options={cities}
          />
        ) : (
          "--"
        )}
      </Grid.Row>
      <Grid.Row centered>
        {locations ? (
          <Select
            search
            placeholder="Select Location"
            onChange={(_, event) => onSelect(event.value)}
            options={locations}
          />
        ) : (
          "--"
        )}
      </Grid.Row>
    </Grid>
  );
};

export default CompareAirQuality;
