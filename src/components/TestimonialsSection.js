import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 0,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function TestimonialsSection(props) {
  const classes = useStyles();

  const items = [
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-5.jpeg",
      name: "Sarah Kline",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      company: "Company",
    },
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-48.jpeg",
      name: "Shawna Murray",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!",
      company: "Company",
    },
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-12.jpeg",
      name: "Blake Elder",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae.",
      company: "Company",
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
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" component="p">
                    "{item.testimonial}"
                  </Typography>
                </CardContent>
                <CardHeader
                  className={classes.header}
                  avatar={
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      className={classes.avatar}
                    />
                  }
                  title={item.name}
                  subheader={item.company}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default TestimonialsSection;
