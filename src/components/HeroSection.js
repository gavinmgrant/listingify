import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function HeroSection(props) {
  const router = useRouter();

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box textAlign="center" py={12}>
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={3}
            typewriter={props.typewriter}
          />
          <Button
            variant="contained"
            size="large"
            color={props.buttonColor}
            onClick={() => router.push(props.buttonPath)}
          >
            {props.buttonText}
          </Button>
        </Box>
      </Container>
    </Section>
  );
}

export default HeroSection;
