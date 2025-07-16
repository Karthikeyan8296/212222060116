import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography, Divider } from "@mui/material";
import UrlShortener from "./components/UrlShortener";
import UrlStatistics from "./components/UrlStatistics";
import RedirectHandler from "./components/RedirectHandler";

function App() {
  return (
    <Router>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography fontWeight={"600"} variant="h4" align="center" gutterBottom>
          React URL Shortener
        </Typography>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UrlShortener />
                <Divider sx={{ my: 5 }} />
                <UrlStatistics />
              </>
            }
          />
          <Route path="/:slug" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
