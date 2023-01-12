import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
  const [displayTokens, setDisplayToken] = useState(
    data?.customers?.tokens || 0
  );

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
            <Box
              style={{ height: "30px", cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              <Logo color={darkMode.value ? "white" : "black"} />
            </Box>
            <div className={classes.spacer} />
            <Hidden smUp={true} implementation="css">
              <IconButton
                onClick={() => {
                  setDrawerOpen(true);
                }}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown={true} implementation="css">
              {!auth.user && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => router.push("/generate")}
                  >
                    Generate
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => router.push("/auth/signin")}
                  >
                    Sign in
                  </Button>
                </>
              )}
              {auth.user && (
                <>
                  <Button
                    variant="outlined"
                    style={{ marginRight: "0.5rem" }}
                    onClick={() => router.push("/pricing")}
                  >
                    Tokens: {displayTokens}
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => router.push("/generate")}
                  >
                    Generate
                  </Button>
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
                      <MenuItem
                        onClick={() => router.push("/settings/general")}
                      >
                        Settings
                      </MenuItem>
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
                size="large"
              >
                {darkMode.value && <NightsStayIcon />}

                {!darkMode.value && <WbSunnyIcon />}
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
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
            <>
              <ListItemButton
                component="a"
                onClick={() => router.push("/generate")}
              >
                <ListItemText>Generate</ListItemText>
              </ListItemButton>
              <ListItemButton
                component="a"
                onClick={() => router.push("/auth/signin")}
              >
                <ListItemText>Sign in</ListItemText>
              </ListItemButton>
            </>
          )}

          {auth.user && (
            <>
              <Button
                variant="outlined"
                style={{
                  marginLeft: "1rem",
                  marginBottom: "0.5rem",
                  marginTop: "0.5rem",
                }}
                onClick={() => router.push("/pricing")}
              >
                Tokens: {displayTokens}
              </Button>
              <ListItemButton
                component="a"
                onClick={() => router.push("/generate")}
              >
                <ListItemText>Generate</ListItemText>
              </ListItemButton>
              <ListItemButton
                component="a"
                onClick={() => router.push("/settings/general")}
              >
                <ListItemText>Settings</ListItemText>
              </ListItemButton>
              <Divider />
              <ListItemButton
                onClick={(event) => {
                  auth.signout();
                }}
              >
                <ListItemText>Sign out</ListItemText>
              </ListItemButton>
            </>
          )}

          <ListItem>
            <IconButton
              color="inherit"
              onClick={darkMode.toggle}
              style={{ opacity: 0.6 }}
              size="large"
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
