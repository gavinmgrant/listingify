import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Typewriter from "typewriter-effect";

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
        <Typography
          variant={`h${size}`}
          gutterBottom={props.subtitle ? true : false}
        >
          {title}
        </Typography>
      )}

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
    </Box>
  );
}

export default SectionHeader;
