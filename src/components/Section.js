import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import BackgroundImage from "components/BackgroundImage";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // Ensure child <Container> is above background
    // image (if one is set with the bgImage prop).
    "& > .MuiContainer-root": {
      position: "relative",
    },
  },

  // Create color classes that set background color and determine
  // text color and dividing border automatically based on background color.
  // Adds the keys colorDefault, colorLight, etc
  ...[
    ["default", theme.palette.background.default],
    ["light", theme.palette.background.default],
    ["primary", theme.palette.primary.main],
    ["secondary", theme.palette.secondary.main],
  ].reduce((acc, [name, value]) => {
    acc[`color${name}`] = {
      backgroundColor: value,
      // Ensure text is legible on background
      color: theme.palette.getContrastText(value),
      // Sibling selector that adds a top border if section above
      // has the same color class.
      // We use emphasize to compute border based on background color
      // and make sure it's always lightly visible.
      [`& + &`]: {
        borderTop: `1px solid ${value}`,
      },
    };
    return acc;
  }, {}),

  colorInherit: {
    color: "inherit",
  },

  colorTransparent: {
    backgroundColor: "transparent",
    color: "inherit",
  },
}));

function Section(props) {
  const classes = useStyles();

  const {
    bgColor = "default",
    bgImage,
    bgImageOpacity,
    size = "normal",
    className,
    children,
    ...otherProps
  } = props;

  // Get MUI responsize size object based
  // on size prop (normal, medium, large, auto)
  const verticalPadding = {
    normal: { xs: 4 },
    medium: { xs: 4, sm: 6 },
    large: { xs: 4, sm: 8 },
    auto: 0,
  }[size];

  return (
    <Box
      component="section"
      py={verticalPadding}
      className={
        classes.root +
        ` ${classes[`color${bgColor}`]}` +
        (className ? ` ${className}` : "")
      }
      {...otherProps}
    >
      {bgImage && <BackgroundImage image={bgImage} opacity={bgImageOpacity} />}

      {props.children}
    </Box>
  );
}

export default Section;
