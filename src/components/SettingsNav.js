import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NextLinkComposed } from "./Link";

function SettingsNav(props) {
  return (
    <Tabs
      value={props.activeKey}
      indicatorColor="primary"
      textColor="primary"
      centered={true}
    >
      <Tab
        component={NextLinkComposed}
        label="General"
        value="general"
        to={{
          pathname: "/settings/general",
        }}
      />
      <Tab
        component={NextLinkComposed}
        label="Password"
        value="password"
        to={{
          pathname: "/settings/password",
        }}
      />
    </Tabs>
  );
}

export default SettingsNav;
