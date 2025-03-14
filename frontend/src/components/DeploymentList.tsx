import { Box } from "@primer/react";
import DeploymentDetailContainer from "./DeploymentDetailContainer";

const DeploymentList = ({ deployments, namespace }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {deployments.map((deployment) => (
        <DeploymentDetailContainer
          deployment={deployment}
          namespace={namespace}
        />
      ))}
    </Box>
  );
};
export default DeploymentList;
