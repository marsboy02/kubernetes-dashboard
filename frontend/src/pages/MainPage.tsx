import { Box } from "@primer/react";
import MyHeader from "../components/Header";
import MyNav from "../components/NavList";
import NamespaceContainer from "../components/NamespaceContainer";
import DeploymenContainer from "../components/DeploymentContainer";
import { useState } from "react";

type ResourceType = "namespace" | "deployment";

const MainPage = () => {
  const [resource, setResource] = useState<ResourceType>("namespace");

  const Container = {
    namespace: <NamespaceContainer />,
    deployment: <DeploymenContainer />,
  };

  return (
    <div>
      <MyHeader />
      <Box sx={{ display: "flex" }}>
        <MyNav setResource={setResource} />
        {Container[resource]}
      </Box>
    </div>
  );
};

export default MainPage;
