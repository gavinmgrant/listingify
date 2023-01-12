import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

const useStyles = makeStyles((theme) => ({
  // Increase <Container> padding so it's
  // at least half of <Grid> spacing to
  // avoid horizontal scroll on mobile.
  // See https://material-ui.com/components/grid/#negative-margin
  container: {
    padding: `0 ${theme.spacing(3)}`,
    textAlign: "center",
  },
}));

function CtaSection(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container className={classes.container}>
        <Grid
          container={true}
          alignItems="center"
          justifyContent="center"
          spacing={5}
        >
          <Grid item={true} xs={12} md="auto">
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={4}
            />
          </Grid>
          <Grid item={true} xs={12} md="auto">
            <Button
              variant="contained"
              size="large"
              color={props.buttonColor}
              onClick={() => router.push(props.buttonPath)}
            >
              {props.buttonText}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default CtaSection;
