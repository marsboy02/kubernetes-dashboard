import { ActionList } from "@primer/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Namespace {
  name: string;
  createdTime: string;
  aged: number;
  status: string;
  uid: string;
  labels: Record<string, string>;
}

const NamespaceContainer = () => {
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNamespace = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/daangn-monitor/namespaces",
        );
        const namespaces = response.data.data.namespaces;
        setNamespaces(namespaces);
      } catch (error) {
        console.error(error);
      }
    };
    getNamespace();
  }, []);

  return (
    <ActionList sx={{ width: "100%" }}>
      {namespaces.map((namespace) => (
        <ActionList.Item
          key={namespace.name}
          onClick={() => {
            navigate(`/namespace/${namespace.name}`, {
              state: {
                name: namespace.name,
                createdTime: namespace.createdTime,
                aged: namespace.aged,
                status: namespace.status,
                uid: namespace.uid,
                labels: namespace.labels,
              },
            });
          }}
        >
          {namespace.name}
        </ActionList.Item>
      ))}
    </ActionList>
  );
};

export default NamespaceContainer;
