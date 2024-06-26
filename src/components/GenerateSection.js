import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  FormControl,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
  CircularProgress,
  Box,
  Typography,
  Modal,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import CountertopsRoundedIcon from "@mui/icons-material/CountertopsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LandscapeRoundedIcon from "@mui/icons-material/LandscapeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import TemperatureModal from "./TemperatureModal";
import { typeOptions } from "lib/type-options";
import { parkingOptions } from "lib/parking-options";
import { interiorOptions } from "lib/interior-options";
import { exteriorOptions } from "lib/exterior-options";
import { landOptions } from "lib/land-options";
import { useAuth } from "util/auth";
import { useUser, updateCustomer } from "util/db";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import { useDarkMode } from "util/theme";

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
    display: "flex",
    alignItems: "center",
    spacing: "8px",
  },
}));

let temperatureMarks = [];
for (let i = 0; i <= 10; i++) {
  temperatureMarks = temperatureMarks.concat({ value: i / 10, label: i });
}

function GenerateSection(props) {
  const router = useRouter();
  const auth = useAuth();
  const descriptionRef = useRef(null);
  const generalRef = useRef(null);
  const landRef = useRef(null);
  const interiorRef = useRef(null);
  const exteriorRef = useRef(null);
  const uniqueRef = useRef(null);
  const creativityRef = useRef(null);
  const classes = useStyles();
  const darkMode = useDarkMode();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const uid = auth.user ? auth.user.uid : undefined;
  const { data } = useUser(uid);
  const noTokens = !data?.customers?.tokens || data?.customers?.tokens < 1;

  const isUser = !!auth.user;

  const currentYear = new Date().getFullYear();

  const [address, setAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [baths, setBaths] = useState("");
  const [parking, setParking] = useState("");
  const [parkingType, setParkingType] = useState("attached");
  const [yearBuilt, setYearBuilt] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [landFeatures, setLandFeatures] = useState([]);
  const [uniqueFeatures, setUniqueFeatures] = useState("");
  const [editText, setEditText] = useState(false);

  const [interiorCategories, setInteriorCategories] = useState([]);
  const [exteriorCategories, setExteriorCategories] = useState([]);
  const [landCategories, setLandCategories] = useState([]);

  const [isAttached, setIsAttached] = useState(false);
  const [isLand, setIsLand] = useState(false);
  const [landUnits, setLandUnits] = useState("sf");

  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const [apiTemperature, setApiTemperature] = useState(0.7);
  const [apiOutput, setApiOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [error, setError] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: darkMode.value ? "#000" : "#fff",
    p: 3,
    maxHeight: "100vh",
    maxWidth: "100vw",
    borderRadius: "7px",
    border: "1px solid #fff",
  };

  const featuresGridStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const callGenerateEndpoint = async (currentTokens) => {
    setIsGenerating(true);
    setError("");

    const randomIndex = Math.floor(
      Math.random() * (isLand ? landFeatures.length : interiorFeatures.length)
    );
    const highlightedFeature = isLand
      ? landFeatures[randomIndex]
      : interiorFeatures[randomIndex];

    try {
      const body = isLand
        ? JSON.stringify({
            apiTemperature,
            address,
            cityState,
            neighborhood,
            propertyType,
            lotSize: lotSize ? lotSize.toString() + " " + landUnits : "",
            landFeatures:
              landFeatures.length > 0 ? landFeatures.join(", ") : "",
            uniqueFeatures,
            highlightedFeature,
          })
        : JSON.stringify({
            apiTemperature,
            address,
            cityState,
            neighborhood,
            propertyType,
            bedrooms,
            baths,
            parking: parking.includes("space")
              ? parking
              : parkingType + " " + parking,
            yearBuilt,
            floorArea: floorArea ? floorArea.toString() + " sf" : "",
            lotSize: lotSize ? lotSize.toString() + " " + landUnits : "",
            interiorFeatures:
              interiorFeatures.length > 0 ? interiorFeatures.join(", ") : "",
            exteriorFeatures:
              exteriorFeatures.length > 0 ? exteriorFeatures.join(", ") : "",
            uniqueFeatures,
            highlightedFeature,
          });

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = response.body;
      if (!data) return;
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setApiOutput((prev) => prev + chunkValue);
      }

      await updateCustomer(auth.user.id, {
        tokens: currentTokens - 1,
      });
    } catch (error) {
      setError(
        "Sorry, we're having trouble writing your desciption. Please try again later."
      );
      console.log(`Generate error: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInput = (event, action) => {
    action(event.target.value);
  };

  const handleInteriorFeatures = (event) => {
    const value = event.target.value;
    if (interiorFeatures.includes(value)) {
      setInteriorFeatures(interiorFeatures.filter((feat) => feat !== value));
    } else {
      setInteriorFeatures([...interiorFeatures, value]);
    }
  };

  const handleExteriorFeatures = (event) => {
    const value = event.target.value;
    if (exteriorFeatures.includes(value)) {
      setExteriorFeatures(exteriorFeatures.filter((feat) => feat !== value));
    } else {
      setExteriorFeatures([...exteriorFeatures, value]);
    }
  };

  const handleLandFeatures = (event) => {
    const value = event.target.value;
    if (landFeatures.includes(value)) {
      setLandFeatures(landFeatures.filter((feat) => feat !== value));
    } else {
      setLandFeatures([...landFeatures, value]);
    }
  };

  const handleUniqueFeatures = (event) => {
    setUniqueFeatures(event.target.value);
  };

  const handleApiOutput = (event) => {
    setApiOutput(event.target.value);
  };

  const handleScroll = (ref) => {
    setTimeout(() => {
      window.scrollTo({
        top: ref.current.offsetTop + (isSmall ? 400 : 200),
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    if (isGenerating) {
      window.scrollTo({
        top: descriptionRef.current.offsetTop + 80,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [descriptionRef.current, isGenerating]);

  useEffect(() => {
    const confirmationMessage =
      "Are you sure you want to leave? When you leave this page the description will be deleted. Remember to copy your description!";
    const beforeUnloadHandler = (e) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };
    const beforeRouteHandler = (url) => {
      if (router.pathname !== url && !confirm(confirmationMessage)) {
        // to inform NProgress or something ...
        router.events.emit("routeChangeError");
        // tslint:disable-next-line: no-string-throw
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };
    if (apiOutput) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
      router.events.on("routeChangeStart", beforeRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      router.events.off("routeChangeStart", beforeRouteHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [apiOutput]);

  useEffect(() => {
    // These statements in this effect hook generate the feature categories
    let interiorCategories = interiorOptions.reduce((acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = option.category;
      }
      return acc;
    }, {});

    if (propertyType === "condo" || propertyType === "mobile home") {
      interiorCategories = Object.values(interiorCategories).filter(
        (opt) => opt !== "Basement"
      );
      setInteriorCategories(interiorCategories);
    } else {
      interiorCategories = Object.values(interiorCategories);
      setInteriorCategories(interiorCategories);
    }

    let exteriorCategories = exteriorOptions.reduce((acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = option.category;
      }
      return acc;
    }, {});

    if (
      propertyType === "condo" ||
      propertyType === "mobile home" ||
      propertyType === "townhouse"
    ) {
      exteriorCategories = Object.values(exteriorCategories)
        .filter((opt) => opt !== "Accessory Structures")
        .filter((opt) => opt !== "Lot")
        .filter((opt) => opt !== "Pool")
        .filter((opt) => opt !== "Roof Types");
      setExteriorCategories(exteriorCategories);
    } else {
      exteriorCategories = Object.values(exteriorCategories);
      setExteriorCategories(exteriorCategories);
    }

    let landCategories = landOptions.reduce((acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = option.category;
      }
      return acc;
    }, {});

    landCategories = Object.values(landCategories);
    setLandCategories(landCategories);
  }, [propertyType]);

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {/* <Container>
        <Alert severity="error" style={{ marginBottom: "2rem" }}>
          <Typography>
            We are experiencing issues with our service and cannot currently
            generate any descriptions. We are working on a fix as soon as
            possible. Our apologies for the inconvenience.
          </Typography>
        </Alert>
      </Container> */}

      <Container>
        <TemperatureModal
          isOpen={isTempModalOpen}
          handleOpen={() => setIsTempModalOpen(!isTempModalOpen)}
        />
        <Modal
          open={!!router.query.paid}
          disableAutoFocus
          onClose={() => router.push("/generate")}
        >
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              marginBottom={1}
            >
              <CheckCircleOutlineIcon fontSize="large" />
              <Typography variant="h5" component="h5" marginLeft={1}>
                Success!
              </Typography>
            </Box>
            <Typography padding="1rem 0">
              Tokens have been added to your balance. Your new balance is{" "}
              <span style={{ fontWeight: "bold" }}>
                {data?.customers?.tokens}
              </span>
              .
            </Typography>
            <Box marginTop="1rem" textAlign="center">
              <Button
                variant="contained"
                size="large"
                color={darkMode.value ? "secondary" : "primary"}
                onClick={() => router.push("/generate")}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>

        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        {!isUser && (
          <Box textAlign="center" marginY="2rem" marginBottom="3rem">
            <p>Don't have an account? Sign up and get a free token!</p>
            <Button
              variant="contained"
              size="large"
              color={darkMode.value ? "secondary" : "primary"}
              onClick={() => router.push("/auth/signup")}
            >
              Create an account
            </Button>
          </Box>
        )}

        <FormControl variant="standard" fullWidth autoComplete="off">
          <Accordion
            ref={generalRef}
            classes={{
              root: classes.accordion,
              expanded: classes.expanded,
            }}
            defaultExpanded
          >
            <AccordionSummary
              classes={{
                root: classes.summary,
                content: classes.summaryContent,
              }}
              expandIcon={<ExpandMoreIcon />}
              onClick={() => handleScroll(generalRef)}
            >
              <PlayCircleFilledWhiteRoundedIcon />
              <Typography variant="h5" style={{ marginLeft: "8px" }}>
                General Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Street Address"
                    name="address"
                    placeholder="Enter street number and name"
                    margin="normal"
                    value={address}
                    onChange={(e) => handleInput(e, setAddress)}
                    fullWidth
                    style={{ margin: 1 }}
                    helperText="Enter street number and name (required)"
                    autoComplete="off"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    variant="outlined"
                    type="text"
                    label="City and State"
                    name="city-state"
                    placeholder="Enter the city and state names"
                    margin="normal"
                    value={cityState}
                    onChange={(e) => handleInput(e, setCityState)}
                    fullWidth
                    style={{ margin: 1 }}
                    helperText="Enter the city and state names"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Neighborhood"
                    name="neighborhood"
                    placeholder="Enter the neighborhood's name"
                    margin="normal"
                    value={neighborhood}
                    onChange={(e) => handleInput(e, setNeighborhood)}
                    fullWidth
                    style={{ margin: 1 }}
                    helperText="Enter the community or neighborhood name"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    select
                    variant="outlined"
                    label="Property Type"
                    name="property-type"
                    helperText="Please select a property type"
                    margin="normal"
                    value={propertyType}
                    onChange={(e) => {
                      handleInput(e, setPropertyType);
                      if (e.target.value === "vacant land") {
                        setIsLand(true);
                        setIsAttached(false);
                        setInteriorFeatures([]);
                        setExteriorFeatures([]);
                      } else {
                        if (isLand) {
                          setIsLand(false);
                          setLandFeatures([]);
                        }
                        if (
                          e.target.value === "condo" ||
                          e.target.value === "townhouse"
                        ) {
                          setIsAttached(true);
                        } else if (isAttached) {
                          setIsAttached(false);
                        }
                      }
                    }}
                    fullWidth
                    style={{ margin: 1 }}
                  >
                    {typeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {!isLand && (
                  <>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        variant="outlined"
                        type="number"
                        label="Bedrooms"
                        name="bedrooms"
                        placeholder="# of bedrooms"
                        helperText="# of bedrooms"
                        margin="normal"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={bedrooms}
                        onChange={(e) => handleInput(e, setBedrooms)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 0, marginRight: "4%", width: "48%" }}
                      />
                      <TextField
                        variant="outlined"
                        type="number"
                        label="Baths"
                        name="baths"
                        placeholder="# of baths"
                        helperText="# of baths"
                        margin="normal"
                        InputProps={{ inputProps: { min: 0, step: 0.25 } }}
                        value={baths}
                        onChange={(e) => handleInput(e, setBaths)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 0, width: "48%" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        select
                        variant="outlined"
                        label="Parking"
                        name="parking"
                        helperText="Please select a parking option and if attached"
                        margin="normal"
                        value={parking}
                        onChange={(e) => handleInput(e, setParking)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 1 }}
                        InputProps={{
                          inputProps: { min: 0, step: 0.25 },
                          endAdornment: !parking.includes("space") && (
                            <InputAdornment
                              style={{
                                cursor: "pointer",
                                padding: "16px 12px",
                                border: "1px solid rgb(118, 118, 118)",
                                color: "rgb(118, 118, 118)",
                                borderRadius: "32px",
                                position: "absolute",
                                right: "2rem",
                              }}
                              position="end"
                              onClick={() => {
                                if (parkingType === "attached") {
                                  setParkingType("detached");
                                } else {
                                  setParkingType("attached");
                                }
                              }}
                            >
                              {parkingType}
                            </InputAdornment>
                          ),
                        }}
                      >
                        {parkingOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        variant="outlined"
                        type="number"
                        label="Year Built"
                        name="year-built"
                        placeholder="Enter the year the property was built"
                        helperText="Enter the year the property was built"
                        margin="normal"
                        InputProps={{
                          inputProps: { min: 1800, max: currentYear },
                        }}
                        value={yearBuilt}
                        onChange={(e) => handleInput(e, setYearBuilt)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        variant="outlined"
                        type="number"
                        label="Floor Area"
                        name="floor-area"
                        placeholder="Enter floor area of property"
                        helperText="Enter floor area of property"
                        margin="normal"
                        InputProps={{
                          inputProps: { min: 0 },
                          endAdornment: (
                            <InputAdornment position="end">sf</InputAdornment>
                          ),
                        }}
                        value={floorArea}
                        onChange={(e) => handleInput(e, setFloorArea)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 1 }}
                      />
                    </Grid>
                  </>
                )}
                {!isAttached && (
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      variant="outlined"
                      type="number"
                      label="Lot Size"
                      name="lot-size"
                      placeholder="Enter lot size"
                      margin="normal"
                      helperText="Click the button on the right to toggle units"
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment
                            style={{
                              cursor: "pointer",
                              padding: "16px 12px",
                              border: "1px solid rgb(118, 118, 118)",
                              color: "rgb(118, 118, 118)",
                              borderRadius: "32px",
                            }}
                            position="end"
                            onClick={() => {
                              if (landUnits === "sf") {
                                setLandUnits("acres");
                              } else {
                                setLandUnits("sf");
                              }
                            }}
                          >
                            {landUnits}
                          </InputAdornment>
                        ),
                      }}
                      value={lotSize}
                      onChange={(e) => handleInput(e, setLotSize)}
                      fullWidth
                      style={{ margin: 1 }}
                    />
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {!isLand ? (
            <>
              <Accordion
                ref={interiorRef}
                classes={{
                  root: classes.accordion,
                  expanded: classes.expanded,
                }}
              >
                <AccordionSummary
                  classes={{
                    root: classes.summary,
                    content: classes.summaryContent,
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => handleScroll(interiorRef)}
                >
                  <CountertopsRoundedIcon />
                  <Typography variant="h5" style={{ marginLeft: "8px" }}>
                    Interior Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2} columns={12}>
                    {interiorCategories.map((category) => (
                      <Grid
                        key={category}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        style={featuresGridStyle}
                      >
                        <Typography variant="h6">{category}</Typography>
                        {interiorOptions
                          .filter((o) => o.category === category)
                          .map((opt) => (
                            <Box key={opt.option}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color={
                                      darkMode.value ? "secondary" : "primary"
                                    }
                                  />
                                }
                                label={opt.option}
                                value={opt.option}
                                style={{ margin: "0.25rem" }}
                                onChange={handleInteriorFeatures}
                              />
                            </Box>
                          ))}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion
                ref={exteriorRef}
                classes={{
                  root: classes.accordion,
                  expanded: classes.expanded,
                }}
              >
                <AccordionSummary
                  classes={{
                    root: classes.summary,
                    content: classes.summaryContent,
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => handleScroll(exteriorRef)}
                >
                  <HomeRoundedIcon />
                  <Typography variant="h5" style={{ marginLeft: "8px" }}>
                    Exterior Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2} columns={12}>
                    {exteriorCategories.map((category) => (
                      <Grid
                        key={category}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        style={featuresGridStyle}
                      >
                        <Typography variant="h6">{category}</Typography>
                        {exteriorOptions
                          .filter((o) => o.category === category)
                          .map((opt) => (
                            <Box key={opt.option}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color={
                                      darkMode.value ? "secondary" : "primary"
                                    }
                                  />
                                }
                                label={opt.option}
                                value={opt.option}
                                style={{ margin: "0.25rem" }}
                                onChange={handleExteriorFeatures}
                              />
                            </Box>
                          ))}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </>
          ) : (
            <Accordion
              ref={landRef}
              classes={{
                root: classes.accordion,
                expanded: classes.expanded,
              }}
            >
              <AccordionSummary
                classes={{
                  root: classes.summary,
                  content: classes.summaryContent,
                }}
                expandIcon={<ExpandMoreIcon />}
                onClick={() => handleScroll(landRef)}
              >
                <LandscapeRoundedIcon />
                <Typography variant="h5" style={{ marginLeft: "8px" }}>
                  Land Features
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} columns={12}>
                  {landCategories.map((category) => (
                    <Grid
                      key={category}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      style={featuresGridStyle}
                    >
                      <Typography variant="h6">{category}</Typography>
                      {landOptions
                        .filter((o) => o.category === category)
                        .map((opt) => (
                          <Box key={opt.option}>
                            <FormControlLabel
                              control={<Checkbox />}
                              label={opt.option}
                              value={opt.option}
                              style={{ margin: "0.25rem" }}
                              onChange={handleLandFeatures}
                            />
                          </Box>
                        ))}
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion
            ref={uniqueRef}
            classes={{
              root: classes.accordion,
              expanded: classes.expanded,
            }}
            defaultExpanded
          >
            <AccordionSummary
              classes={{
                root: classes.summary,
                content: classes.summaryContent,
              }}
              expandIcon={<ExpandMoreIcon />}
              onClick={() => handleScroll(uniqueRef)}
            >
              <AutoAwesomeRoundedIcon />
              <Typography variant="h5" style={{ marginLeft: "8px" }}>
                Unique Features
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                variant="outlined"
                type="text"
                label="Unique Features"
                name="unique-features"
                placeholder="Type in unique features about this property"
                margin="normal"
                value={uniqueFeatures}
                onChange={handleUniqueFeatures}
                helperText="Add any unique features of the property not listed above. Separate features with commas."
                fullWidth
                autoComplete="off"
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            ref={creativityRef}
            classes={{
              root: classes.accordion,
              expanded: classes.expanded,
            }}
            defaultExpanded
          >
            <AccordionSummary
              classes={{
                root: classes.summary,
                content: classes.summaryContent,
              }}
              expandIcon={<ExpandMoreIcon />}
              onClick={() => handleScroll(creativityRef)}
            >
              <AutoFixHighRoundedIcon />
              <Typography variant="h5" style={{ marginLeft: "8px" }}>
                Creativity
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                margin="1rem"
              >
                <Typography textAlign="center">
                  Select how creative you want us to be when writing your
                  description.
                </Typography>
                <Typography textAlign="center" marginBottom="1rem">
                  From 0 (not so creative) and 10 (very creative). To read
                  examples,{" "}
                  <span
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    onClick={() => setIsTempModalOpen(true)}
                  >
                    click here
                  </span>
                  .
                </Typography>
                <Slider
                  value={apiTemperature}
                  onChange={(e) => handleInput(e, setApiTemperature)}
                  step={0.1}
                  marks={temperatureMarks}
                  min={0}
                  max={1}
                  color={darkMode.value ? "secondary" : "primary"}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop="1rem"
          >
            <Button
              variant="contained"
              size="large"
              color={darkMode.value ? "secondary" : "primary"}
              onClick={() => {
                noTokens
                  ? router.push("/pricing")
                  : callGenerateEndpoint(data?.customers?.tokens);
              }}
              style={{ marginTop: "1rem" }}
              disabled={!isUser || !!address === false || !!apiOutput === true}
            >
              {isUser ? (
                isGenerating ? (
                  <CircularProgress size={28} color="inherit" />
                ) : noTokens ? (
                  "Buy More Tokens to Generate"
                ) : (
                  "Generate"
                )
              ) : (
                "Sign in to Generate"
              )}
            </Button>
            {error && (
              <Alert
                variant="filled"
                severity="warning"
                style={{ marginTop: "2rem" }}
              >
                {error}
              </Alert>
            )}
          </Box>
        </FormControl>

        <Container
          ref={descriptionRef}
          style={{ marginTop: "5rem", padding: 0 }}
        >
          <SectionHeader
            title={
              address ? `Your Description for ${address}` : "Your Description"
            }
            subtitle={
              apiOutput
                ? "Review the text below and confirm the information is accurate. Click text to make edits, then copy it to your clipboard and use!"
                : "Text will appear below after pressing the generate button."
            }
            size={4}
            textAlign="center"
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
          >
            <Button
              variant="outlined"
              color={darkMode.value ? "secondary" : "primary"}
              disabled={!apiOutput}
              onClick={() => {
                setApiOutput("");
                setEditText(false);
              }}
              style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}
            >
              Clear Description
            </Button>
          </Box>
          <Box>
            {editText ? (
              <TextField
                variant="outlined"
                type="text"
                label="Description"
                name="description"
                margin="normal"
                value={apiOutput}
                onChange={handleApiOutput}
                fullWidth
                multiline
                minRows={14}
                disabled={!apiOutput}
                onClick={() => {
                  if (copied) setCopied(false);
                }}
              />
            ) : isGenerating ? (
              <Box textAlign="center">
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Typography
                variant="subtitle1"
                onClick={() => apiOutput && setEditText(true)}
                textAlign={isGenerating ? "center" : "left"}
                style={{
                  cursor: "pointer",
                  border: darkMode.value ? "1px solid #fff" : "1px solid #000",
                  borderRadius: "4px",
                  padding: "13px",
                }}
              >
                <Typewriter
                  options={{
                    strings: apiOutput || "Waiting for your information above.",
                    autoStart: true,
                    delay: apiOutput ? 5 : 40,
                    loop: apiOutput ? false : true,
                    style: {
                      color: "red",
                    },
                  }}
                />
              </Typography>
            )}
          </Box>
          <Box textAlign="center" style={{ marginTop: "1.5rem" }}>
            <Button
              variant="contained"
              size="large"
              color={darkMode.value ? "secondary" : "primary"}
              disabled={!apiOutput}
              onClick={() => {
                navigator.clipboard.writeText(apiOutput);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 5000);
              }}
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </Button>
          </Box>
        </Container>
      </Container>
    </Section>
  );
}

export default GenerateSection;
