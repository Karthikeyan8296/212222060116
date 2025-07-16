import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

const generateShortUrl = (originalUrl, custom, expiryMinutes) => {
  const shortcode = custom || Math.random().toString(36).substring(2, 7);
  const createdAt = new Date();
  const expiresAt = expiryMinutes
    ? new Date(Date.now() + expiryMinutes * 60000)
    : new Date(Date.now() + 30 * 60000);

  return {
    originalUrl,
    shortcode,
    createdAt,
    expiresAt,
    clicks: [],
  };
};

const UrlShortener = () => {
  const [urls, setUrls] = useState([]);
  const [inputs, setInputs] = useState([
    { originalUrl: "", custom: "", expiry: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { originalUrl: "", custom: "", expiry: "" }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUrls = inputs.map(({ originalUrl, custom, expiry }) =>
      generateShortUrl(originalUrl, custom, parseInt(expiry))
    );

    setUrls([...urls, ...newUrls]);

    const storedLinks =
      JSON.parse(localStorage.getItem("shortenedLinks")) || {};
    newUrls.forEach((url) => {
      storedLinks[url.shortcode] = url;
    });
    localStorage.setItem("shortenedLinks", JSON.stringify(storedLinks));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Shorten a New URL
      </Typography>
      <Stack spacing={2}>
        {inputs.map((input, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              required
              fullWidth
              label="Original URL"
              value={input.originalUrl}
              onChange={(e) =>
                handleInputChange(index, "originalUrl", e.target.value)
              }
            />
            <TextField
              label="Custom Shortcode"
              value={input.custom}
              onChange={(e) =>
                handleInputChange(index, "custom", e.target.value)
              }
            />
            <TextField
              label="Validity (minutes)"
              type="number"
              value={input.expiry}
              onChange={(e) =>
                handleInputChange(index, "expiry", e.target.value)
              }
            />
          </Box>
        ))}

        <Box>
          <Button onClick={handleAddInput} variant="outlined" sx={{ mr: 2 }}>
            Add Another
          </Button>
          <Button type="submit" variant="contained">
            Shorten
          </Button>
        </Box>
      </Stack>

      {urls.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Generated Short Links</Typography>
          {urls.map((url, i) => (
            <Card key={i} sx={{ mt: 2 }}>
              <CardContent>
                <Typography>
                  <strong>Original:</strong> {url.originalUrl}
                </Typography>
                <Typography>
                  <strong>Shortened:</strong>{" "}
                  <a href={`/${url.shortcode}`}>
                    http://localhost:3000/{url.shortcode}
                  </a>
                </Typography>
                <Typography>
                  <strong>Valid Until:</strong> {url.expiresAt.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UrlShortener;
