import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, useTheme } from "@mui/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsIcon from "@mui/icons-material/Payments";
import TwitterIcon from "@mui/icons-material/Twitter";
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

function FeaturesSection(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    setTimeout(setShowIcons(true), 1000);
  }, [showIcons]);

  const items = [
    {
      title: "Writing descriptions sucks!",
      body: "Listing agents are experts at selling, but writing can be a challenge. It takes time thinking of what features to write about and gather your thoughts. Use our system to quickly select the highlights and we take care of the rest.",
      icon: "thumb",
    },
    {
      title: "You have better things to do.",
      body: "Writing a 250-word description can take 50 minutes. Spend a few minutes completing our unique form and get a well-written description in seconds. Review and tweak the copy and you're done. Go find your next listing!",
      icon: "time",
    },
    {
      title: "Save money.",
      body: "You can spend $50 to $250 on a freelance copywriter. Our descriptions cost $1 to $2 each and it's a one time cost. Don't subscribe to another service! Use us as little or as much as you want to meet your business needs.",
      icon: "money",
    },
    {
      title: "Get content for social media.",
      body: "Don't just use this for your listing description. Use your shiny, new property description to promote your listing on social media! Captions and tweets can take so long to write. Now, you don't need to worry. Just copy and paste!",
      icon: "social",
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
              item={true}
              xs={12}
              md={6}
              className={classes.gridItem}
              key={index}
            >
              <Card variant="outlined">
                <Box p={isSmall ? 3 : 6}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  >
                    {showIcons && (
                      <>
                        {item.icon === "thumb" && (
                          <ThumbDownOffAltIcon
                            style={{ fontSize: 64 }}
                            color="primary"
                          />
                        )}
                        {item.icon === "time" && (
                          <AccessTimeIcon
                            style={{ fontSize: 64 }}
                            color="primary"
                          />
                        )}
                        {item.icon === "money" && (
                          <PaymentsIcon
                            style={{ fontSize: 64 }}
                            color="primary"
                          />
                        )}
                        {item.icon === "social" && (
                          <TwitterIcon
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
                  <Typography variant="subtitle1">{item.body}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
