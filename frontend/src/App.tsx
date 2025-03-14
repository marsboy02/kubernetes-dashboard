import { theme, ThemeProvider } from "@primer/react";
import MainPage from "./pages/MainPage.tsx";
import NameSpacePage from "./pages/NamespacePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/namespace/:namespace" element={<NameSpacePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
