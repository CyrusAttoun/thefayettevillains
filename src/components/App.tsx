import "@mantine/core/styles.css";
import { MantineProvider, AppShell, Container } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopBar, PostCarousel, Footer } from ".";
import WelcomeStatement from "./WelcomeStatement";
import { theme } from "../theme";

export default function App() {
  return (
    <Router>
      <MantineProvider theme={theme}>
        <AppShell padding={0}>
          <TopBar />
          <Container size="lg" px="md" style={{ minHeight: "70vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Area and other routes will go here */}
            </Routes>
          </Container>
          <Footer />
        </AppShell>
      </MantineProvider>
    </Router>
  );
}

function Home() {
  return (
    <>
      <WelcomeStatement />
      <PostCarousel />
    </>
  );
}
