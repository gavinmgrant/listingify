import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { motion } from "framer-motion";
import { useTheme } from "@mui/styles";

function HeroSection(props) {
  const router = useRouter();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box textAlign="center" py={isSmall ? 8 : 12}>
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={3}
            typewriter={props.typewriter}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 }}
            viewport={{ once: true }}
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
