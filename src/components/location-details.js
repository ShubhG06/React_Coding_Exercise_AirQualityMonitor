import { Container, Message, Segment, Statistic } from "semantic-ui-react";

const LocationDetails = ({ locationInfo }) => {
  // If locationInfo doesn't exist, show a message in `red` color
  if (!locationInfo) {
    return (
      <Message negative>
        <Message.Header>No location info available</Message.Header>
      </Message>
    );
  }
  return (
    <Container>
      <Segment vertical>Location: {locationInfo.location}</Segment>
      <Segment vertical>
        <Statistic.Group size="mini">
          {locationInfo.measurements?.map(
            ({ parameter, unit, value }, index) => {
              return (
                <Statistic key={index}>
                  <Message>
                    <Statistic.Value>{value}</Statistic.Value>
                    <Statistic.Label>{`${parameter} (${unit})`}</Statistic.Label>
                  </Message>
                </Statistic>
              );
            }
          )}
        </Statistic.Group>
      </Segment>
    </Container>
  );
};

export default LocationDetails;
