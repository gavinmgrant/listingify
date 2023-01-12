import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Section from "components/Section";

function StatsSection(props) {
  const items = [
    {
      title: "Tweets",
      stat: "3,456",
    },
    {
      title: "Following",
      stat: "123",
    },
    {
      title: "Followers",
      stat: "456k",
    },
    {
      title: "Likes",
      stat: "789",
    },
  ];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} sm={3} key={index}>
              <Box textAlign="center">
                <Typography variant="overline">{item.title}</Typography>
                <Typography variant="h4">{item.stat}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default StatsSection;
