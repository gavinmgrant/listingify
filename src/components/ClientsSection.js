import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useDarkMode } from "util/theme";
import Image from "next/image";
import { motion } from "framer-motion";

function ClientsSection(props) {
  const darkMode = useDarkMode();

  const items = [
    {
      name: "Keller Williams",
      image: darkMode.value
        ? "/images/logo-kw-white.png"
        : "/images/logo-kw-black.png",
      width: 175,
      height: 81,
      url: "https://www.kw.com/",
    },
    {
      name: "Compass",
      image: darkMode.value
        ? "/images/logo-compass-white.png"
        : "/images/logo-compass-black.png",
      width: 250,
      height: 147,
      url: "https://www.compass.com/",
    },
    {
      name: "Coldwell Banker",
      image: darkMode.value
        ? "/images/logo-cb-white.png"
        : "/images/logo-cb-black.png",
      width: 175,
      height: 117,
      url: "https://www.coldwellbanker.com/",
    },
  ];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box textAlign="center">
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
            textAlign="center"
          />
          <Grid container={true} justifyContent="center" alignItems="center">
            {items.map((item, index) => (
              <Grid item={true} xs={12} md="auto" key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box py={0} px={3}>
                    <a href={item.url} target="_blank">
                      <Image
                        src={item.image}
                        width={item.width}
                        height={item.height}
                        alt={item.name}
                      />
                    </a>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Section>
  );
}

export default ClientsSection;
