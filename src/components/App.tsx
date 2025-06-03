import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopBar, PostCarousel, Footer } from ".";
import WelcomeStatement from "./WelcomeStatement";

export default function App() {
  return (
    <Router>
      <TopBar />
      <div style={{ maxWidth: 1200, margin: "0 auto", minHeight: "70vh", padding: "0 1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Area and other routes will go here */}
        </Routes>
      </div>
      <Footer />
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
