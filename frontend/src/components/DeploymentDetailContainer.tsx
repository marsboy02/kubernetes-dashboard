import { Box, Heading, Label, Text } from "@primer/react";
import ButtonContainer from "./ButtonContainer";
import EventList from "./EventList";

const DeploymentDetailContainer = ({ deployment, namespace }) => {
  return (
    <Box
      sx={{
        flexDirection: "column",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border.default",
        borderRadius: 5,
        p: 3,
        gap: 3,
      }}
    >
      {deployment.replicas === deployment.availableReplicas ? (
        <Label size="large" sx={{ width: "fit-content", color: "success.fg" }}>
          Healthy
        </Label>
      ) : (
        <Label size="large" sx={{ width: "fit-content", color: "danger.fg" }}>
          Unhealthy
        </Label>
      )}
      <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
        <Heading variant="medium">{deployment.name}</Heading>
        <Box>
          <Box sx={{ display: "flex" }}>
            <Detail title={"name"} description={deployment.name} />
            <Detail title={"container"} description={deployment.container} />
            <Detail title={"replicas"} description={deployment.replicas} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Detail title={"status"} description={deployment.status} />
            <Detail title={"image"} description={deployment.image} />
          </Box>
        </Box>
        <ButtonContainer deployment={deployment} namespace={namespace} />
        <EventList events={deployment.event} />
      </Box>
    </Box>
  );
};

const Detail = ({ title, description }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Text size="medium" color="neutral.emphasis">
        {title}
      </Text>
      <Text size="large" sx={{ overflowWrap: "break-word" }}>
        {description}
      </Text>
    </Box>
  );
};

export default DeploymentDetailContainer;
