import React, { useState, useEffect, useRef } from "react";
import {
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
} from "@material-ui/core";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { typeOptions } from "lib/type-options";
import { parkingOptions } from "lib/parking-options";
import { interiorOptions } from "lib/interior-options";
import { exteriorOptions } from "lib/exterior-options";
import { landOptions } from "lib/land-options";
import { useAuth } from "util/auth";
import { useUser, updateCustomer, updateUser } from "util/db";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  p: 4,
};

function GenerateSection(props) {
  const router = useRouter();
  const auth = useAuth();
  const descriptionRef = useRef(null);

  const uid = auth.user ? auth.user.uid : undefined;
  const { data } = useUser(uid);
  const noTokens = !data?.customers?.tokens || data?.customers?.tokens < 1;

  const isUser = !!auth.user;

  const currentYear = new Date().getFullYear();

  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [baths, setBaths] = useState(0);
  const [parking, setParking] = useState("");
  const [yearBuilt, setYearBuilt] = useState(currentYear);
  const [floorArea, setFloorArea] = useState(0);
  const [lotSize, setLotSize] = useState(0);
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [landFeatures, setLandFeatures] = useState([]);
  const [uniqueFeatures, setUniqueFeatures] = useState("");
  const [editText, setEditText] = useState(false);

  const [isLand, setIsLand] = useState(false);
  const [landUnits, setLandUnits] = useState("sf");

  const [apiOutput, setApiOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async (currentTokens) => {
    setIsGenerating(true);

    const body = isLand
      ? JSON.stringify({
          address,
          neighborhood,
          propertyType,
          lotSize: lotSize.toString() + " " + landUnits,
          landFeatures: landFeatures.join(", "),
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
          floorArea: floorArea.toString() + " sf",
          lotSize: lotSize.toString() + " " + landUnits,
          interiorFeatures: interiorFeatures.join(", "),
          exteriorFeatures: exteriorFeatures.join(", "),
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

    setIsGenerating(false);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleNeighborhood = (event) => {
    setNeighborhood(event.target.value);
  };
  const handlePropertyType = (event) => {
    setPropertyType(event.target.value);
    if (event.target.value === "vacant land") {
      setIsLand(true);
    } else {
      if (isLand) setIsLand(false);
    }
  };
  const handleBedrooms = (event) => {
    setBedrooms(event.target.value);
  };
  const handleBaths = (event) => {
    setBaths(event.target.value);
  };
  const handleParking = (event) => {
    setParking(event.target.value);
  };
  const handleYearBuilt = (event) => {
    setYearBuilt(event.target.value);
  };
  const handleFloorArea = (event) => {
    setFloorArea(event.target.value);
  };
  const handleLotSize = (event) => {
    setLotSize(event.target.value);
  };
  const handleInteriorFeatures = (event, value) => {
    setInteriorFeatures(value);
  };
  const handleExteriorFeatures = (event, value) => {
    setExteriorFeatures(value);
  };
  const handleLandFeatures = (event, value) => {
    setLandFeatures(value);
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
        <FormControl fullWidth>
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
                onChange={handleAddress}
                fullWidth
                style={{ margin: 1 }}
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
                onChange={handleNeighborhood}
                fullWidth
                style={{ margin: 1 }}
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
                onChange={handlePropertyType}
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
                    onChange={handleBedrooms}
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
                    InputProps={{ inputProps: { min: 0 } }}
                    value={baths}
                    onChange={handleBaths}
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
                    onChange={handleParking}
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
                    InputProps={{ inputProps: { min: 1800, max: currentYear } }}
                    value={yearBuilt}
                    onChange={handleYearBuilt}
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
                    onChange={handleFloorArea}
                    fullWidth
                    disabled={isLand}
                    style={{ margin: 1 }}
                  />
                </Grid>
              </>
            )}
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
                onChange={handleLotSize}
                fullWidth
                style={{ margin: 1 }}
              />
            </Grid>
          </Grid>
          {isLand ? (
            <Autocomplete
              variant="outlined"
              multiple
              options={landOptions.sort(
                (a, b) => -b.charAt(0).localeCompare(a.charAt(0))
              )}
              getOptionLabel={(option) => option}
              groupBy={(option) => option.charAt(0)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Vacant Land Features" />
              )}
              value={landFeatures}
              onChange={handleLandFeatures}
              style={{ margin: "1rem 0" }}
            />
          ) : (
            <>
              <Autocomplete
                variant="outlined"
                multiple
                options={interiorOptions.sort(
                  (a, b) => -b.charAt(0).localeCompare(a.charAt(0))
                )}
                getOptionLabel={(option) => option}
                groupBy={(option) => option.charAt(0)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Interior Features" />
                )}
                value={interiorFeatures}
                onChange={handleInteriorFeatures}
                style={{ margin: "1rem 0" }}
              />
              <Autocomplete
                variant="outlined"
                multiple
                options={exteriorOptions.sort(
                  (a, b) => -b.charAt(0).localeCompare(a.charAt(0))
                )}
                getOptionLabel={(option) => option}
                groupBy={(option) => option.charAt(0)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Exterior Features" />
                )}
                value={exteriorFeatures}
                onChange={handleExteriorFeatures}
                style={{ margin: "1rem 0" }}
              />
            </>
          )}

          <TextField
            variant="outlined"
            type="text"
            label="Unique Features"
            name="unique-features"
            placeholder="Enter any unique features about this property"
            margin="normal"
            value={uniqueFeatures}
            onChange={handleUniqueFeatures}
            helperText="Write any other features of the property not listed above. Separate features with commas."
            fullWidth
          />
          <Box textAlign="center" style={{ marginTop: "1rem" }}>
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
              disabled={!isUser || !address}
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
            {!isUser && (
              <>
                <p>Don't have an account? Sign up and get a free token!</p>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => router.push("/auth/signup")}
                >
                  Create an account
                </Button>
              </>
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
                style={{ cursor: "pointer" }}
              >
                <Typewriter
                  options={{
                    strings: apiOutput,
                    autoStart: true,
                    delay: 15,
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
