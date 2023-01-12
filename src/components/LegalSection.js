import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NextLinkComposed } from "./Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Section from "components/Section";
import LegalTerms from "components/LegalTerms";
import LegalPrivacy from "components/LegalPrivacy";

function LegalSection(props) {
  const validSections = {
    "terms-of-service": true,
    "privacy-policy": true,
  };

  const section = validSections[props.section]
    ? props.section
    : "terms-of-service";

  const data = {
    domain: "listingify.com",
    companyName: "Listingify",
  };

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Tabs
        value={section}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
      >
        <Tab
          component={NextLinkComposed}
          label="Terms of Service"
          value="terms-of-service"
          to={{
            pathname: "/legal/terms-of-service",
          }}
        />
        <Tab
          component={NextLinkComposed}
          label="Privacy Policy"
          value="privacy-policy"
          to={{
            pathname: "/legal/privacy-policy",
          }}
        />
      </Tabs>
      <Box mt={5}>
        <Container>
          {section === "terms-of-service" && <LegalTerms {...data} />}

          {section === "privacy-policy" && <LegalPrivacy {...data} />}
        </Container>
      </Box>
    </Section>
  );
}

export default LegalSection;
