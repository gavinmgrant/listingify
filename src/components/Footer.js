import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles, useTheme } from "@mui/styles";
import Section from "components/Section";
import { useDarkMode } from "util/theme";
import { Logo } from "./Logo";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from '@mui/icons-material/Facebook';
import useMediaQuery from "@mui/material/useMediaQuery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThreads } from '@fortawesome/free-brands-svg-icons'

function Footer(props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const darkMode = useDarkMode();

  const useStyles = makeStyles((theme) => ({
    gridMenu: {
      marginBottom: 36,
    },
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
      paddingTop: 6,
      paddingBottom: 6,
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
      margin: isSmall ? "24px 12px 16px" : "24px 16px 16px 0",
      color: darkMode.value ? "white" : "black",
    },
    socialIconThreads: {
      margin: isSmall ? "24px 12px 16px" : "26px 16px 16px 0",
      color: darkMode.value ? "white" : "black",
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

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={props.sticky && classes.sticky}
    >
      <Container>
        <Grid
          container
          className={classes.grid}
          justifyContent="space-between"
          spacing={4}
          paddingTop="2rem"
          direction={isSmall ? "column-reverse" : "row"}
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
                href="https://www.threads.net/@listingify"
                passHref={true}
                target="_blank"
                className={classes.socialIconThreads}
              >
                <FontAwesomeIcon icon={faThreads} size="2xl" />
              </Link>
              <Link
                href="https://www.instagram.com/listingify/"
                passHref={true}
                target="_blank"
                className={classes.socialIcon}
              >
                <InstagramIcon fontSize="large" />
              </Link>
              <Link
                href="https://www.facebook.com/listingify/"
                passHref={true}
                target="_blank"
                className={classes.socialIcon}
              >
                <FacebookIcon fontSize="large" />
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

          <Grid item xs={12} sm={3} className={classes.gridMenu}>
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
