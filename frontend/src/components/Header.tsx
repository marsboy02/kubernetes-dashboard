import { Header } from "@primer/react";

const MyHeader = () => {
  return (
    <Header sx={{ display: "flex", justifyContent: "space-between" }}>
      <Header.Item>
        <Header.Link
          href="/"
          sx={{
            fontSize: 3,
          }}
        >
          <span>kubernetes dashboard</span>
        </Header.Link>
      </Header.Item>
      <Header.Item>
        <span>HyeongJun Kang</span>
      </Header.Item>
    </Header>
  );
};
export default MyHeader;
