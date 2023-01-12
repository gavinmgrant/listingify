import React from "react";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

const useStyles = makeStyles((theme) => ({
  accordion: {
    // Remove shadow
    boxShadow: "none",
    "&:before": {
      // Remove default divider
      display: "none",
    },
    // Add a custom border
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  expanded: {
    margin: `0 !important`,
  },
  summary: {
    minHeight: 78,
  },
  summaryContent: {
    margin: "0 !important",
  },
}));

function FaqSection(props) {
  const classes = useStyles();

  const items = [
    {
      question: "Why should I use your service?",
      answer:
        "Stories sell. Crafting a well-written property description that tells a compelling story about what makes the seller's property special is key to selling your listing. Using our service, you'll save valuable time you can then spend on more important things like lead generation!",
    },
    {
      question: "How does it work?",
      answer:
        "First, take a few minutes and enter key details about the property you're selling, next click the generate button, and in a few seconds a detailed, unique listing description is written for you!",
    },
    {
      question: "How do I pay for a description?",
      answer:
        "Go to the pricing page and select a package of tokens. One token generates one description.",
    },
    {
      question: "How long are your listing descriptions?",
      answer:
        "It varies depending on the amount of information provided, but typically they fall in the 175 to 300 word range.",
    },
    {
      question: "What AI technology do you use?",
      answer:
        "We use Generative Pre-trained Transformer 3, or GPT-3, which is an autoregressive language model that uses deep learning to produce human-like text. We use the latest model text-davinci-003 that produces higher-quality writing, can handle more complex instructions, and generates longer text results.",
    },
  ];

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

        {items.map((item, index) => (
          <Accordion
            classes={{
              root: classes.accordion,
              expanded: classes.expanded,
            }}
            key={index}
          >
            <AccordionSummary
              classes={{
                root: classes.summary,
                content: classes.summaryContent,
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-panel-${index}`}
            >
              <Typography variant="h6">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails id={`faq-panel-${index}`}>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Section>
  );
}

export default FaqSection;
