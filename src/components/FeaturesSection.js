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
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
import TwitterIcon from '@mui/icons-material/Twitter';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    // Add border that contrasts lightly with background color.
    // We use boxShadow so that it's hidden around outer edge
    // due to container <Card> having overflow: hidden
    boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
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

  const items = [
    {
      title: "Writing a description sucks!",
      body: "Listing agents are experts at selling, but writing can be a challenge. It takes time thinking of what features to write about and gather your thoughts. Use our system to quickly select the highlights and we take care of the rest.",
      icon: "thumb",
    },
    {
      title: "Your time is valuable.",
      body: "Writing a 250-word essay can take 50 minutes. Spend a few minutes completing our unique form and get a well-written description in seconds. Review and tweak the copy and you're done. Go find your next listing!",
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
                  {item.icon === "thumb" && <ThumbDownOffAltIcon style={{ fontSize: 64 }} />}
                  {item.icon === "time" && <AccessTimeIcon style={{ fontSize: 64 }} />}
                  {item.icon === "money" && <PaymentsIcon style={{ fontSize: 64 }} />}
                  {item.icon === "social" && <TwitterIcon style={{ fontSize: 64 }} />}
                  <Typography variant="h5" gutterBottom={true}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1">{item.body}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
