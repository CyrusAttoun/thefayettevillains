import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { TopBar, PostCarousel, Footer } from ".";
import WelcomeStatement from "./WelcomeStatement";
import RummageMap from "./rummages/RummageMap";
import AuthCallback from "./AuthCallback";
import { AuthProvider } from "../contexts/AuthContext";
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
        <div style={{ maxWidth: 1200, margin: "0 auto", minHeight: "70vh", padding: "0 1rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rummage" element={<RummageMap />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* Area and other routes will go here */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
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
