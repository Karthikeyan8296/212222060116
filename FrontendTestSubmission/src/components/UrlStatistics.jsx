import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  Divider,
  Stack,
  Paper,
  Grid,
} from "@mui/material";

const dummyClicks = () => [
  { time: new Date(), source: "Chrome", location: "India" },
  { time: new Date(), source: "Firefox", location: "USA" },
];

const UrlStatistics = () => {
  const [stats] = useState([
    {
      originalUrl: "https://example.com",
      shortcode: "YT",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60000),
      clicks: dummyClicks(),
    },
  ]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        URL Statistics
      </Typography>

      <Stack spacing={3}>
        {stats.map((item, index) => (
          <Card key={index} sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    <strong>Short Code:</strong> {item.shortcode}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Original URL:</strong> {item.originalUrl}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    <strong>Created At:</strong>{" "}
                    {item.createdAt.toLocaleString()}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Expires At:</strong>{" "}
                    {item.expiresAt.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Click Statistics ({item.clicks.length})
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  bgcolor: "#f9f9f9",
                  borderRadius: 2,
                  maxHeight: 200,
                  overflow: "auto",
                }}
              >
                <List dense>
                  {item.clicks.map((click, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <Typography variant="body2">
                        {click.time.toLocaleString()} - {click.source} -{" "}
                        {click.location}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default UrlStatistics;
