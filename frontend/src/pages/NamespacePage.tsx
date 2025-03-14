import { useLocation, useParams } from "react-router-dom";
import MyHeader from "../components/Header";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MetaDataContainer from "../components/MetaDataContainer";
import { Box, Heading } from "@primer/react";
import DeploymentList from "../components/DeploymentList";
import { Deployment } from "../types/deployment";

const NameSpacePage = () => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const { state: metadata } = useLocation();
  const { namespace } = useParams();
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getNamespaceDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/deployments/${namespace}`
        );
        const deployments = response.data.data.deployments;
        setDeployments(deployments);
      } catch (error) {
        console.error(error);
      }
    };

    getNamespaceDetail();

    interval.current = setInterval(() => {
      getNamespaceDetail();
    }, 5000);

    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    };
  }, [namespace]);

  return (
    <div>
      <MyHeader />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
        <Heading variant="medium">metadata</Heading>
        <MetaDataContainer metadata={metadata} />
        <Heading variant="medium">deployments</Heading>
        {deployments && deployments.length > 0 ? (
          <DeploymentList deployments={deployments} namespace={namespace} />
        ) : (
          <Heading variant="small" sx={{ color: "fg.muted" }}>
            No Resource
          </Heading>
        )}
      </Box>
    </div>
  );
};
export default NameSpacePage;
