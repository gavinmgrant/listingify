import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    // Add border that contrasts lightly with background color.
    // We use boxShadow so that it's hidden around outer edge
    // due to container <Card> having overflow: hidden
    boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
    textAlign: "left",
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

  const items = [
    {
      title: "This is what was on the MLS.",
      body1: "MULWOOD beautiful one story mid-century home. This lovely and well cared for home offers 4 bedrooms and 2 baths with open floor plan and vaulted ceilings. The backyard is wonderful for entertaining with great patio and overhang, spacious and private with plenty of room for a pool. Located in the highly sought after LVUSD school district and in close proximity to all three schools: Chapparral Elementary, A. C. Stelle Middle School, and Calabasas High. Enjoy shopping and dining at The Commons of Calabasas and weekly farmers market in Old Town.",
      body2: "",
      icon: "no",
    },
    {
      title: "This is what Listingify wrote.",
      body1: "Welcome to 22389 Liberty Bell Rd, a 4 bed, 2 bath single family house located in the desirable Calabasas neighborhood. Built in 1964, this home has 2124 sqft of living space and sits on a 10059 sqft lot. With its vaulted ceilings, stainless steel appliances, and flat panel cabinets, this home feels bright, airy, and modern. The tile and hardwood flooring throughout the entire home add a touch of luxury. Enjoy the convenience of central air conditioning and central heat. The wood siding and stone exterior finish along with the large lot and concrete back patio, provide a beautiful outdoor living area perfect for entertaining. This property is also located in the LVUSD school district and is close to Chapparral Elementary, A. C. Stelle Middle School, and Calabasas High.",
      body2: "Calabasas is a great place to live. It’s conveniently located near the 101 freeway, shopping and dining. It’s also close to the Malibu beaches and the Santa Monica mountains. There are plenty of parks and trails in the area as well. Whether you’re looking for a place to relax and unwind or a place to explore and have fun, 22389 Liberty Bell Rd has something for everyone. Don't miss out on this great opportunity for a beautiful family home in a great neighborhood!",
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
        <Card raised={false}>
          <Grid container={true}>
            {items.map((item, index) => (
              <Grid
                item={true}
                xs={12}
                md={6}
                className={classes.gridItem}
                key={index}
              >
                <Box p={6}>
                  {item.icon === "no" && (
                    <CancelIcon style={{ fontSize: 64 }} />
                  )}
                  {item.icon === "yes" && (
                    <CheckCircleIcon style={{ fontSize: 64 }} />
                  )}
                  <Typography variant="h5" gutterBottom={true}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1">{item.body1}</Typography>
                  <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>{item.body2}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>
    </Section>
  );
}

export default CompareSection;
