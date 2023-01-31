import React, { useState } from "react";
import { Box, Typography, Modal, Tab, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDarkMode } from "util/theme";

function TemperatureModal({ isOpen, handleOpen }) {
  const darkMode = useDarkMode();

  const [value, setValue] = useState("7");

  const handleValue = (event, newValue) => {
    setValue(newValue);
  };

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

  const tabStyle = {
    maxHeight: "50vh",
    overflow: "auto",
    padding: "1rem 0",
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setValue("7");
        handleOpen();
      }}
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h5">
          Example Descriptions by Creativity Number
        </Typography>

        <Typography marginTop="1rem">
          The default value is 7 and is a good starting point.
        </Typography>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1 }}>
            <TabList
              onChange={handleValue}
              aria-label="Creativity values"
              textColor={darkMode.value ? "secondary" : "primary"}
              indicatorColor={darkMode.value ? "secondary" : "primary"}
              style={{ maxWidth: "90vw" }}
            >
              <Tab label="1" value="1" />
              <Tab label="4" value="4" />
              <Tab label="7" value="7" />
              <Tab label="10" value="10" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={tabStyle}>
            <Typography paddingTop="1rem">
              Welcome to 702 W Upas St, a stunning single-family home located in
              the desirable South Mission Hills neighborhood of San Diego, CA.
              This turn-key property features 3 bedrooms, 2 baths, and a
              spacious 1380 sf of living space. The open floor plan is perfect
              for entertaining, with recessed lighting, hardwood flooring, and
              tile flooring in the bathrooms. The kitchen boasts quartz
              countertops, shaker cabinets, and stainless steel appliances. The
              exterior of the home is equally impressive, with an attached
              accessory dwelling unit, a cul-de-sac lot, drought-tolerant
              landscaping, and a stucco finish. Enjoy city skyline views from
              the backyard, and modern farmhouse design throughout. The attached
              2-car garage provides plenty of parking. South Mission Hills is a
              vibrant community with easy access to local restaurants, shops,
              and parks. Don't miss out on this incredible opportunity to own a
              piece of San Diego paradise!
            </Typography>
          </TabPanel>

          <TabPanel value="4" sx={tabStyle}>
            <Typography paddingTop="1rem">
              This stunning single-family home offers a unique modern farmhouse
              design with a turn-key interior and city skyline views. Located in
              the desirable South Mission Hills neighborhood of San Diego, this
              1940-built property is situated on a cul-de-sac lot and boasts a
              spacious open floor plan with 1380 square feet of living space.
              Enjoy the convenience of an attached 2-car garage, as well as an
              attached accessory dwelling unit. The interior features recessed
              lighting, hardwood flooring, and tile flooring in the bathrooms.
              The kitchen is equipped with quartz countertops, shaker cabinets,
              and stainless steel appliances. The exterior features stucco
              finish and drought-tolerant landscaping. <br />
              <br />
              South Mission Hills is a vibrant and diverse neighborhood with a
              variety of amenities and attractions. Enjoy easy access to the
              freeway, local parks, and the San Diego Zoo. Explore the shops and
              restaurants of Old Town, or take a stroll along the picturesque
              San Diego Bay. With its convenient location, modern amenities, and
              unique features, this property is sure to be a prized possession
              for the lucky buyer.
            </Typography>
          </TabPanel>

          <TabPanel value="7" sx={tabStyle}>
            <Typography paddingTop="1rem">
              Welcome to 702 W Upas St, a recently renovated and turn-key
              3-bedroom, 2-bath single-family home in the desirable South
              Mission Hills neighborhood of San Diego. Boasting a modern
              farmhouse design, this 1380 square foot home is situated on a 5227
              square foot cul-de-sac lot with a fully landscaped and
              drought-resistant yard, stucco finish, and stunning city skyline
              views. Inside, you'll find an open floor plan with recessed
              lighting, hardwood and tile flooring, quartz countertops in the
              kitchen, shaker cabinets, and stainless steel appliances. There is
              also an attached accessory dwelling unit, providing extra living
              space and income potential. Plus, an attached 2-car garage for
              your convenience. <br />
              <br />
              South Mission Hills is a vibrant, walkable community with many
              nearby parks, shops, restaurants, and landmarks. Enjoy easy access
              to the San Diego-Coronado Bridge, Balboa Park, Mission Hills Park,
              and more. With its unique features and convenient location, this
              is the perfect home for anyone looking to live in San Diego.
              Schedule a showing today to view this beautiful property.
            </Typography>
          </TabPanel>

          <TabPanel value="10" sx={tabStyle}>
            <Typography paddingTop="1rem">
              This modern farmhouse in the idyllic South Mission Hills
              neighborhood of San Diego is warm and inviting. Meticulously
              renovated, the turn-key 3-bedroom, 2-bath home boasts an open
              floor plan with plenty of natural light, recessed lighting,
              ceiling fans, hardwood flooring, and gorgeous tile flooring in the
              bathrooms. The stylish kitchen features quartz countertops, shaker
              cabinets, and stainless steel appliances. The exterior of the home
              includes a unique attached accessory dwelling unit,
              drought-tolerant landscaping, stucco finish on a cul-de-sac lot,
              and city skyline views. This property also includes a two-car
              attached garage. <br />
              <br />
              With this home, you'll enjoy an unparalleled quality of life.
              Explore all that South Mission Hills has to offer, from its
              vibrant arts and culinary communities to its variety of local
              shops and open spaces. You'll also be conveniently close to Balboa
              Park, the San Diego Zoo, and the Gaslamp Quarter. Contact us today
              for a private tour of this stunning home and fall in love with the
              South Mission Hills lifestyle.
            </Typography>
          </TabPanel>
        </TabContext>
        <Box marginTop="1rem" textAlign="center">
          <Button
            variant="contained"
            size="large"
            color={darkMode.value ? "secondary" : "primary"}
            onClick={() => {
              setValue("7");
              handleOpen();
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default TemperatureModal;
