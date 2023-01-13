import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    // Add bottom margin if element below
    "&:not(:last-child)": {
      marginBottom: "2rem",
    },
  },
  subtitle: {
    // Subtitle text generally isn't very long
    // so usually looks better to limit width.
    maxWidth: 800,
    // So we can have max-width but still
    // have alignment controlled by text-align.
    display: "inline-block",
  },
}));

function SectionHeader(props) {
  const classes = useStyles();

  const { typewriter, subtitle, title, size, className, ...otherProps } = props;

  // Render nothing if no title or subtitle
  if (!title && !subtitle) {
    return null;
  }

  return (
    <Box
      component="header"
      className={classes.root + (props.className ? ` ${props.className}` : "")}
      {...otherProps}
    >
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Typography
            variant={`h${size}`}
            gutterBottom={props.subtitle ? true : false}
          >
            {title}
          </Typography>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {subtitle &&
          (typewriter ? (
            <Typography variant="subtitle1" className={classes.subtitle}>
              <Typewriter
                options={{
                  strings: subtitle,
                  autoStart: true,
                  delay: 16,
                }}
              />
            </Typography>
          ) : (
            <Typography variant="subtitle1" className={classes.subtitle}>
              {subtitle}
            </Typography>
          ))}
      </motion.div>
    </Box>
  );
}

export default SectionHeader;
