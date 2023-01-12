import React from "react";
// import Link from "next/link";
import { Button, Box } from "@mui/material";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function ContactSection(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box>
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
            color="primary"
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
