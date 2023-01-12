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
} from "@mui/material";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  p: 4,
};

const featuresGridStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

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

let interiorCategories = interiorOptions.reduce((acc, option) => {
  if (!acc[option.category]) {
    acc[option.category] = option.category;
  }
  return acc;
}, {});

interiorCategories = Object.values(interiorCategories);

let exteriorCategories = exteriorOptions.reduce((acc, option) => {
  if (!acc[option.category]) {
    acc[option.category] = option.category;
  }
  return acc;
}, {});

exteriorCategories = Object.values(exteriorCategories);

let landCategories = landOptions.reduce((acc, option) => {
  if (!acc[option.category]) {
    acc[option.category] = option.category;
  }
  return acc;
}, {});

landCategories = Object.values(landCategories);

function GenerateSection(props) {
  const router = useRouter();
  const auth = useAuth();
  const descriptionRef = useRef(null);
  const classes = useStyles();
  const darkMode = useDarkMode();

  const uid = auth.user ? auth.user.uid : undefined;
  const { data } = useUser(uid);
  const noTokens = !data?.customers?.tokens || data?.customers?.tokens < 1;

  const isUser = !!auth.user;

  const currentYear = new Date().getFullYear();

  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState(undefined);
  const [baths, setBaths] = useState(undefined);
  const [parking, setParking] = useState("");
  const [yearBuilt, setYearBuilt] = useState(undefined);
  const [floorArea, setFloorArea] = useState(undefined);
  const [lotSize, setLotSize] = useState(undefined);
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [landFeatures, setLandFeatures] = useState([]);
  const [uniqueFeatures, setUniqueFeatures] = useState("");
  const [editText, setEditText] = useState(false);

  const [isAttached, setIsAttached] = useState(false);
  const [isLand, setIsLand] = useState(false);
  const [landUnits, setLandUnits] = useState("sf");

  const [apiOutput, setApiOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [error, setError] = useState("");

  const callGenerateEndpoint = async (currentTokens) => {
    setIsGenerating(true);
    setError("");

    try {
      const body = isLand
        ? JSON.stringify({
            address,
            neighborhood,
            propertyType,
            lotSize: lotSize ? lotSize.toString() + " " + landUnits : "",
            landFeatures:
              landFeatures.length > 0 ? landFeatures.join(", ") : "",
            uniqueFeatures,
          })
        : JSON.stringify({
            address,
            neighborhood,
            propertyType,
            bedrooms,
            baths,
            parking,
            yearBuilt,
            floorArea: floorArea ? floorArea.toString() + " sf" : "",
            lotSize: lotSize ? lotSize.toString() + " " + landUnits : "",
            interiorFeatures:
              interiorFeatures.length > 0 ? interiorFeatures.join(", ") : "",
            exteriorFeatures:
              exteriorFeatures.length > 0 ? exteriorFeatures.join(", ") : "",
            uniqueFeatures,
          });

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      const { output } = data;

      setApiOutput(`${output.text}`);

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

  useEffect(() => {
    if (apiOutput) {
      window.scrollTo({
        top: descriptionRef.current.offsetTop + 80,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [descriptionRef.current, apiOutput]);

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

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Modal
          open={!!router.query.paid}
          onClose={() => router.push("/generate")}
        >
          <Box sx={modalStyle}>
            <Typography variant="h5" component="h5" style={{ marginBottom: 8 }}>
              Success!
            </Typography>
            <Typography padding="1rem 0">
              Tokens have been added to your balance.
            </Typography>
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
              color="primary"
              onClick={() => router.push("/auth/signup")}
            >
              Create an account
            </Button>
          </Box>
        )}
        <FormControl variant="standard" fullWidth autoComplete="off">
          <Accordion
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
            >
              <Typography variant="h5">General Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Address"
                    name="address"
                    placeholder="Enter the full address of property"
                    margin="normal"
                    value={address}
                    onChange={(e) => handleInput(e, setAddress)}
                    fullWidth
                    style={{ margin: 1 }}
                    helperText="Enter street number, name, city and state"
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
                        placeholder="Enter number of bedrooms"
                        margin="normal"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={bedrooms}
                        onChange={(e) => handleInput(e, setBedrooms)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        variant="outlined"
                        type="number"
                        label="Baths"
                        name="baths"
                        placeholder="Enter number of baths"
                        margin="normal"
                        InputProps={{ inputProps: { min: 0, step: 0.25 } }}
                        value={baths}
                        onChange={(e) => handleInput(e, setBaths)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        select
                        variant="outlined"
                        label="Parking"
                        name="parking"
                        helperText="Please select a parking option"
                        margin="normal"
                        value={parking}
                        onChange={(e) => handleInput(e, setParking)}
                        fullWidth
                        disabled={isLand}
                        style={{ margin: 1 }}
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
                        placeholder="Enter floor area"
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
                >
                  <Typography variant="h5">Interior Features</Typography>
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
                                control={<Checkbox color={darkMode.value ? "secondary" : "primary"} />}
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
                >
                  <Typography variant="h5">Exterior Features</Typography>
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
                                control={<Checkbox color={darkMode.value ? "secondary" : "primary"} />}
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
              >
                <Typography variant="h5">Land Features</Typography>
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
            >
              <Typography variant="h5">Unique Features</Typography>
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
              color="primary"
              onClick={() => {
                noTokens
                  ? router.push("/pricing")
                  : callGenerateEndpoint(data?.customers?.tokens);
              }}
              style={{ marginTop: "1rem" }}
              disabled={!isUser || !address || apiOutput}
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
            ) : (
              <Typography
                variant="subtitle1"
                onClick={() => apiOutput && setEditText(true)}
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
                    delay: apiOutput ? 10 : 40,
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
              color="primary"
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
