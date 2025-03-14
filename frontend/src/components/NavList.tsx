import { NavList } from "@primer/react";

const MyNav = ({ setResource }) => (
  <NavList
    sx={{
      width: "15%",
      height: "100vh",
      textAlign: "center",
      backgroundColor: "neutral.muted",
    }}
  >
    <NavList.Item onClick={() => setResource("namespace")}>
      namespace
    </NavList.Item>
    <NavList.Item onClick={() => setResource("deployment")}>
      deployment
    </NavList.Item>
  </NavList>
);

export default MyNav;
