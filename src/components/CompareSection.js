import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, useTheme } from "@mui/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    textAlign: "center",
  },
  imageContainer: {
    margin: "0 auto",
    maxWidth: "200px",
    marginBottom: "30px",
    "& img": {
      width: "100%",
    },
  },
}));

function CompareSection(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    setTimeout(setShowIcons(true), 1000);
  }, [showIcons]);

  const items = [
    {
      title: "This is what was on the MLS.",
      body1:
        "MULWOOD beautiful one story mid-century home. This lovely and well cared for home offers 4 bedrooms and 2 baths with open floor plan and vaulted ceilings. The backyard is wonderful for entertaining with great patio and overhang, spacious and private with plenty of room for a pool. Located in the highly sought after LVUSD school district and in close proximity to all three schools: Chapparral Elementary, A. C. Stelle Middle School, and Calabasas High. Enjoy shopping and dining at The Commons of Calabasas and weekly farmers market in Old Town.",
      body2: "",
      body3: "",
      icon: "no",
    },
    {
      title: "This is what Listingify wrote.",
      body1:
        "Welcome to 22389 Liberty Bell Rd, a beautiful single-family home located in Mulwood, a sought-after neighborhood in Calabasas, CA. This 4-bedroom, 2-bathroom home includes an attached 2-car garage and was built in 1964. With 2,124 square feet of interior space and a 10,057 square foot lot, this home is perfect for your growing family.",
      body2:
        "Inside the home, you'll find luxurious tile and hardwood flooring, stainless steel appliances, vaulted ceiling, ceiling fans, a wood-burning fireplace, and a double vanity in the primary bathroom. Outside, the large lot features a concrete back patio and a shingle roof. Additionally, this home is located in the highly sought after LVUSD school district. The double vanity in the primary bathroom is an especially desirable feature, as it provides ample space for couples to get ready in the morning as well as a luxurious feel.",
      body3:
        "Lastly, the Greater Mulwood neighborhood of Calabasas is a great place to call home. With its convenient location near world-class shopping and entertainment, as well as the nearby Calabasas Country Club and Topanga State Park, there's plenty to do and see in the area. Plus, with its quiet, family-friendly atmosphere, Mulwood is the perfect place to raise a family.",
      icon: "yes",
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
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />

        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid
              key={index}
              item={true}
              xs={12}
              md={6}
              className={classes.gridItem}
            >
              <Card variant="outlined">
                <Box p={isSmall ? 3 : 6}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    {showIcons && (
                      <>
                        {item.icon === "no" && (
                          <CancelIcon
                            style={{ fontSize: 64 }}
                            color="primary"
                          />
                        )}
                        {item.icon === "yes" && (
                          <CheckCircleIcon
                            style={{ fontSize: 64 }}
                            color="primary"
                          />
                        )}
                      </>
                    )}
                  </motion.div>
                  <Typography variant="h5" gutterBottom={true}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    textAlign="left"
                    marginTop="1rem"
                  >
                    {item.body1}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    textAlign="left"
                    marginTop="1rem"
                  >
                    {item.body2}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    textAlign="left"
                    marginTop="1rem"
                  >
                    {item.body3}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default CompareSection;
