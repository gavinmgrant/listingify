import React from "react";
import Link from "next/link";
import { Button, Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
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
      <Container maxWidth="md">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <Box textAlign="center">
          <Link href="mailto:hello@listingify.com">
            <Button variant="contained" size="large" color="primary">
              <a>hello@listingify.com</a>
            </Button>
          </Link>
        </Box>
      </Container>
    </Section>
  );
}

export default ContactSection;
