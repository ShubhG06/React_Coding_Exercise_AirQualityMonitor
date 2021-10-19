import "./App.css";
import "semantic-ui-css/semantic.min.css";
import LocationSelect from "./components/location-selector";
import { useState } from "react";
import { getCountriesList, getLocationInfo } from "./services/data-fetcher";
import { useEffect } from "react/cjs/react.development";
import { Segment, Grid, Divider, Container } from "semantic-ui-react";
import LocationDetails from "./components/location-details";
import ComparisonInfo from './components/comparison-info';

/*
  App: Main component which renders the App
  - As we don't have multiple pages, not integrating the react-router
  - Using Hooks for development throughout the application
*/

function App() {
  const [countriesList, setCountriesList] = useState(null);
  const [locationAInfo, setLocationAInfo] = useState(null);
  const [locationBInfo, setLocationBInfo] = useState(null);
  const onLocationASelect = (location) =>
    (async () => setLocationAInfo(await getLocationInfo(location)))();
  const onLocationBSelect = (location) =>
    (async () => setLocationBInfo(await getLocationInfo(location)))();

  useEffect(
    () => (async () => setCountriesList(await getCountriesList()))(),
    []
  );

  return (
    <Container>
      {countriesList && (
        <>
          <Segment placeholder>
            <Grid columns={2} rows={1} relaxed="very" stackable>
              <Grid.Row>
                <Grid.Column>
                  <LocationSelect
                    onSelect={onLocationASelect}
                    countries={countriesList}
                  />
                </Grid.Column>
                <Grid.Column>
                  <LocationSelect
                    onSelect={onLocationBSelect}
                    countries={countriesList}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider vertical />
          </Segment>
          <Segment>
            <Grid columns={2} rows={1} relaxed="very" stackable>
              <Grid.Row>
                <Grid.Column>
                  {locationAInfo && (
                    <LocationDetails locationInfo={locationAInfo} />
                  )}
                </Grid.Column>
                <Grid.Column>
                  {locationBInfo && (
                    <LocationDetails locationInfo={locationBInfo} />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider vertical>vs</Divider>
          </Segment>
        </>
      )}
      {locationAInfo && locationBInfo && <ComparisonInfo locationAInfo={locationAInfo} locationBInfo={locationBInfo} />}
    </Container>
  );
}

export default App;
