import React from "react";
import { Button, Box } from "@mui/material";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useDarkMode } from "util/theme";

function ContactSection(props) {
  const darkMode = useDarkMode();
 
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box margin="3rem 1rem 4rem 1rem">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            color={darkMode.value ? "secondary" : "primary"}
            href="mailto:hello@listingify.com"
          >
            hello@listingify.com
          </Button>
        </Box>
      </Box>
    </Section>
  );
}

export default ContactSection;
