import { Box, Text } from "@primer/react";

const EventList = ({ events }) => {
  return (
    <Box>
      <Text size="medium" color="neutral.emphasis">
        event
      </Text>
      <Box
        sx={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "border.default",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {events.map((event) => (
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: "20%",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "border.default",
                p: 2,
              }}
            >
              {event.reason}
            </Box>
            <Box
              sx={{
                width: "80%",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "border.default",
                p: 2,
              }}
            >
              {event.message}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EventList;
