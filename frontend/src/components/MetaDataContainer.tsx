import { Box, Label, Text } from "@primer/react";

const MetaDataContainer = ({ metadata }) => {
  const statusColor = {
    Active: "success.fg",
    Pending: "severe.fg",
    Unable: "danger.fg",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border.default",
        borderRadius: 5,
        p: 3,
        gap: 3,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Detail title={"이름"} description={metadata.name} />
        <Detail title={"생성시간"} description={metadata.createdTime} />
        <Detail title={"Aged"} description={metadata.aged} />
        <Detail title={"UID"} description={metadata.uid} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Text size="medium" color="neutral.emphasis">
          레이블
        </Text>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          {Object.entries(metadata.labels).map(([key, value]) => (
            <Label key={key} size="small" sx={{ width: "fit-content" }}>
              {`${key}=${value}`}
            </Label>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Text size="medium" color="neutral.emphasis">
          Status
        </Text>
        <Text
          size="large"
          color={statusColor[metadata.status]}
          weight="semibold"
        >
          {metadata.status}
        </Text>
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
      <Text size="large">{description}</Text>
    </Box>
  );
};

export default MetaDataContainer;
