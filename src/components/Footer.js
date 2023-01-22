import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { ListItemButton, Divider } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles, useTheme } from "@mui/styles";
import Section from "components/Section";
import { useDarkMode } from "util/theme";
import { Logo } from "./Logo";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import useMediaQuery from "@mui/material/useMediaQuery";

function Footer(props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const useStyles = makeStyles((theme) => ({
    sticky: {
      marginTop: "auto",
    },
    brand: {
      display: "block",
      height: 32,
    },
    listIcon: {
      padding: 0,
    },
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: isSmall ? "center" : "right",
    },
    grid: {
      textAlign: isSmall ? "center" : "left",
    },
    social: {
      display: "flex",
      justifyContent: isSmall ? "center" : "flex-start",
    },
    socialIcon: {
      marginTop: theme.spacing(2),
      marginRight: 12,
      color: "black",
    },
    legal: {
      marginTop: theme.spacing(2),
      fontSize: "0.875rem",
      opacity: 0.8,
      "& a": {
        color: "inherit",
        marginLeft: "0.8rem",
      },
    },
  }));

  const router = useRouter();
  const classes = useStyles();
  const darkMode = useDarkMode();

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={props.sticky && classes.sticky}
    >
      <Divider />
      <Container>
        <Grid
          container
          className={classes.grid}
          justifyContent="space-between"
          spacing={4}
          paddingTop="2rem"
        >
          <Grid item xs={12} sm={9}>
            <Link href="/" style={{ height: "30px" }}>
              <Logo color={darkMode.value ? "white" : "black"} />
            </Link>

            {props.description && (
              <Box mt={1}>
                <Typography component="p">{props.description}</Typography>
              </Box>
            )}

            <div className={classes.social}>
              <Link
                href="https://twitter.com/listingify"
                passHref={true}
                target="_blank"
                className={classes.socialIcon}
              >
                <TwitterIcon />
              </Link>
              <Link
                href="https://www.instagram.com/listingify/"
                passHref={true}
                target="_blank"
                className={classes.socialIcon}
              >
                <InstagramIcon />
              </Link>
            </div>

            <div className={classes.legal}>
              {props.copyright}
              <Link href="https://www.gavingrant.co/" passHref={true}>
                Gavin Grant
              </Link>
              <Link href="/legal/terms-of-service" passHref={true}>
                Terms
              </Link>
              <Link href="/legal/privacy-policy" passHref={true}>
                Privacy
              </Link>
            </div>
          </Grid>

          <Grid item xs={12} sm={3}>
            <List disablePadding>
              <ListItemButton
                component="a"
                className={classes.listItem}
                onClick={() => router.push("/pricing")}
              >
                <ListItemText>Pricing</ListItemText>
              </ListItemButton>
              <ListItemButton
                component="a"
                className={classes.listItem}
                onClick={() => router.push("/faq")}
              >
                <ListItemText>FAQ</ListItemText>
              </ListItemButton>
              <ListItemButton
                component="a"
                className={classes.listItem}
                onClick={() => router.push("/contact")}
              >
                <ListItemText>Contact</ListItemText>
              </ListItemButton>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default Footer;
