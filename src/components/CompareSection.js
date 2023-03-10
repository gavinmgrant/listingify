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
      title: "What an agent wrote on the MLS.",
      body1:
        "Renovated 3 Bedrooms and 2 bathrooms home with a swimming pool, 2 car attached garage, and plenty of room on the side yard for your RV or boat, in a non through street. Open floor plan and beam ceilings, the kitchen has newer cabinets, laminate counters, stone backsplash and stainless steel appliances; main bathroom is completely remodeled with tile and marble shower. The backyard offers amazing mountain views with a beautiful pool , fruit trees and a covered patio. Conveniently located off Deep Canyon Road between Highway 111 and Fred Waring Drive, this home is just minutes away from upscale El Paseo, McCallum Theatre, College of the Desert, Westfield Shopping Mall, dining, shopping, banks, and entertainment.",
      body2: "",
      body3: "",
      body4: "",
      icon: "no",
    },
    {
      title: "What we wrote.",
      body1:
        "Welcome to 74460 Goleta Ave, a single-family home offering 3 bedrooms and 2 baths, with an attached 2-car garage. Built in 1973, this property boasts a floor area of 1200 sq ft and sits on a spacious lot of 8276 sq ft. This home showcases an open floor plan, shaker cabinets, stainless steel appliances, and vaulted ceilings, among other features that make it a dream come true for anyone looking for a comfortable and inviting living space.",
      body2:
        "This property's exterior features are just as impressive, with a Ranch-style design, a beautiful pool, and a back porch that provides the perfect setting for entertaining guests. Enjoy the stunning mountain views and fruit trees that surround the property. The home is located near shops and restaurants, as well as schools, which is perfect for families. Additionally, it has a unique feature that separates it from the rest: room on the side yard for your RV or boat.",
      body3:
        "One of the best features of this home is its central air conditioning. Living in Palm Desert, CA, can be quite hot, particularly during the summer months. Having an efficient air conditioning system is a must, and this home has it all. You can enjoy cool and comfortable indoor living, no matter how hot it is outside.",
      body4:
        "Palm Desert is a beautiful neighborhood that has a wide range of notable landmarks and exciting places to explore. You can enjoy the fantastic walkability of the area, with plenty of parks and shopping centers within walking distance. The community also has many highlights, such as the Palm Springs Art Museum and the Living Desert Zoo & Gardens. With so much to see and do, Palm Desert is the perfect place to call home. Don't miss your chance to see this amazing property before it's sold. Schedule a tour today and see for yourself what makes this home so special.",
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
                            color="error"
                          />
                        )}
                        {item.icon === "yes" && (
                          <CheckCircleIcon
                            style={{ fontSize: 64 }}
                            color="success"
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
                  <Typography
                    variant="subtitle1"
                    textAlign="left"
                    marginTop="1rem"
                  >
                    {item.body4}
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
