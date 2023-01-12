import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Section from "components/Section";

function PageLoader(props) {
  const { height = 350 } = props;

  return (
    <Section bgColor="default">
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={height}
        >
          {!props.children && <CircularProgress size={32} />}

          {props.children && <>{props.children}</>}
        </Box>
      </Container>
    </Section>
  );
}

export default PageLoader;
