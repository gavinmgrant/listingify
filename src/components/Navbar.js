import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/Section";
import { useAuth } from "util/auth";
import { useDarkMode } from "util/theme";
import { Logo } from "./Logo";
import { useUser } from "util/db";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2),
  },
  drawerList: {
    width: 250,
  },
  spacer: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const router = useRouter();

  const auth = useAuth();
  const darkMode = useDarkMode();

  const uid = auth.user ? auth.user.uid : undefined;
  const { data } = useUser(uid);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);
  const [displayTokens, setDisplayToken] = useState(data?.customers?.tokens || 0);

  const handleOpenMenu = (event, id) => {
    // Store clicked element (to anchor the menu to)
    // and the menu id so we can tell which menu is open.
    setMenuState({ anchor: event.currentTarget, id });
  };

  const handleCloseMenu = () => {
    setMenuState(null);
  };

  useEffect(() => {
    if (!data?.customers?.tokens) return;
    setDisplayToken(data?.customers?.tokens);
  }, [data?.customers?.tokens]);

  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
            <Link href="/">
              <a style={{ height: "30px" }}>
                <Logo color={darkMode.value ? "white" : "black"} />
              </a>
            </Link>
            <div className={classes.spacer} />

            <Hidden smUp={true} implementation="css">
              <IconButton
                onClick={() => {
                  setDrawerOpen(true);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown={true} implementation="css">
              {!auth.user && (
                <>
                  <Link href="/generate" passHref={true}>
                    <Button component="a" color="inherit">
                      Generate
                    </Button>
                  </Link>
                  <Link href="/auth/signin" passHref={true}>
                    <Button component="a" color="inherit">
                      Sign in
                    </Button>
                  </Link>
                </>
              )}
              {auth.user && (
                <>
                  <Button
                    variant="outlined"
                    style={{ marginRight: "1rem" }}
                    onClick={(e) => router.push("/pricing")}
                  >
                    Tokens: {displayTokens}
                  </Button>
                  <Link href="/generate" passHref={true}>
                    <Button component="a" color="inherit">
                      Generate
                    </Button>
                  </Link>
                  <Button
                    color="inherit"
                    aria-label="Account"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      handleOpenMenu(event, "account-menu");
                    }}
                  >
                    Account
                    <ExpandMoreIcon className={classes.buttonIcon} />
                  </Button>
                  <Menu
                    id="account-menu"
                    open={
                      menuState && menuState.id === "account-menu"
                        ? true
                        : false
                    }
                    anchorEl={menuState && menuState.anchor}
                    getContentAnchorEl={undefined}
                    onClick={handleCloseMenu}
                    onClose={handleCloseMenu}
                    keepMounted={true}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div>
                      <Link href="/settings/general" passHref={true}>
                        <MenuItem component="a">Settings</MenuItem>
                      </Link>
                      <Divider />
                      <MenuItem
                        onClick={(event) => {
                          auth.signout();
                        }}
                      >
                        Signout
                      </MenuItem>
                    </div>
                  </Menu>
                </>
              )}

              <IconButton
                color="inherit"
                onClick={darkMode.toggle}
                style={{ opacity: 0.6 }}
              >
                {darkMode.value && <NightsStayIcon />}

                {!darkMode.value && <WbSunnyIcon />}
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          className={classes.drawerList}
          onClick={() => setDrawerOpen(false)}
        >
          {!auth.user && (
            <Link href="/auth/signin" passHref={true}>
              <ListItem component="a" button={true}>
                <ListItemText>Sign in</ListItemText>
              </ListItem>
            </Link>
          )}

          {auth.user && (
            <>
              <Button
                variant="outlined"
                style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
                onClick={(e) => router.push("/pricing")}
              >
                Tokens: {displayTokens}
              </Button>
              <Link href="/generate" passHref={true}>
                <ListItem component="a" button={true}>
                  <ListItemText>Generate</ListItemText>
                </ListItem>
              </Link>
              <Link href="/settings/general" passHref={true}>
                <ListItem component="a" button={true}>
                  <ListItemText>Settings</ListItemText>
                </ListItem>
              </Link>
              <Divider />
              <ListItem
                button={true}
                onClick={(event) => {
                  auth.signout();
                }}
              >
                <ListItemText>Sign out</ListItemText>
              </ListItem>
            </>
          )}

          <ListItem>
            <IconButton
              color="inherit"
              onClick={darkMode.toggle}
              style={{ opacity: 0.6 }}
            >
              {darkMode.value && <NightsStayIcon />}

              {!darkMode.value && <WbSunnyIcon />}
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </Section>
  );
}

export default Navbar;
