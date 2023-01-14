import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { motion } from "framer-motion";

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
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.75 }}
          >
            <Button
              variant="contained"
              size="large"
              color={props.buttonColor}
              onClick={() => router.push(props.buttonPath)}
            >
              {props.buttonText}
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Section>
  );
}

export default HeroSection;
