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
              Welcome to 702 W Upas St, a charming single-family home located in
              the desirable South Mission Hills neighborhood of San Diego, CA.
              This 1940-built property offers 3 bedrooms, 2 bathrooms, and a
              spacious 1380 sq. ft. of living space. The home is situated on a
              5227 sq. ft. cul-de-sac lot, with a large attached 2-car garage
              and an attached accessory dwelling unit with its own entrance and
              kitchenette.
              <br />
              <br />
              Inside, you'll find a bright and airy open floor plan with
              hardwood flooring, recessed lighting, and ceiling fans throughout.
              The kitchen is equipped with quartz countertops, stainless steel
              appliances, and a double vanity in the primary bathroom. The home
              has been recently renovated and is turn-key ready, with updated
              fixtures, appliances, and finishes, as well as any necessary
              repairs, so you can move in without any additional work or effort
              required.
              <br />
              <br />
              Outside, you'll find a large back porch with city skyline views,
              as well as drought-tolerant landscaping and a stucco finish. South
              Mission Hills is a vibrant and walkable neighborhood, with plenty
              of local restaurants, shops, and parks nearby. It's also close to
              the San Diego Zoo, Balboa Park, and the San Diego International
              Airport. This is the perfect place to call home!
            </Typography>
          </TabPanel>

          <TabPanel value="4" sx={tabStyle}>
            <Typography paddingTop="1rem">
              Step inside this beautiful 1940s single-family home and you'll be
              immediately impressed by its turn-key interior. With its open
              floor plan, recessed lighting, and hardwood flooring throughout,
              this home is truly a sight to behold. The kitchen features quartz
              countertops, stainless steel appliances, and a dining room to host
              family dinners. The primary bathroom has a double vanity,
              providing convenience and storage for toiletries and beauty
              products. Three bedrooms, two bathrooms, and a two-car attached
              garage complete the interior.
              <br />
              <br />
              Outside, you'll find a large cul-de-sac lot with drought-tolerant
              landscaping and a stucco finish. A back porch offers city skyline
              views, and an attached accessory dwelling unit with its own
              entrance and kitchenette adds a unique touch.
              <br />
              <br />
              Located in the South Mission Hills neighborhood of San Diego, CA,
              this home is conveniently close to local restaurants, shops, and
              attractions. With its beautiful interior and exterior features,
              this home is the perfect place to call your own.
            </Typography>
          </TabPanel>

          <TabPanel value="7" sx={tabStyle}>
            <Typography paddingTop="1rem">
              Welcome to 702 W Upas St, a stunning single-family home located in
              the desirable South Mission Hills neighborhood of San Diego, CA.
              Boasting 3 bedrooms and 2 bathrooms, this turn-key abode is the
              perfect place to call home. The 1380 square foot floor plan is
              sure to impress, featuring a double vanity in the primary bath, an
              open floor plan, recessed lighting, and hardwood flooring
              throughout. The quartz countertops and stainless steel appliances
              in the kitchen are sure to please the home chef. Enjoy
              California's beautiful weather on the back porch, with city
              skyline views, or create your own oasis in the 5227 square foot
              lot with drought-tolerant landscaping. An attached accessory
              dwelling unit with its own entrance and kitchenette provides extra
              living space and added value.
              <br />
              <br />
              Not only does this home offer modern amenities, but it also has a
              classic charm. Built in 1940, the stucco finish and attached
              two-car garage give this home its character. Plus, its cul-de-sac
              lot provides a quiet neighborhood for you and your family.
              <br />
              <br />
              This is the perfect home for a family, or anyone looking for the
              combination of modern luxury and classic elegance. Located in the
              heart of South Mission Hills, you're just a short drive from the
              best of San Diego. Enjoy the iconic Balboa Park, just minutes
              away, or explore the many restaurants, shops, and other
              attractions that this vibrant community has to offer. With its
              perfect combination of modern luxury and classic charm, 702 W Upas
              St is the perfect place to call home.
            </Typography>
          </TabPanel>

          <TabPanel value="10" sx={tabStyle}>
            <Typography paddingTop="1rem">
              Welcome home to 702 W Upas Street in South Mission Hills, San
              Diego! This amazing single-family home has something for everyone
              in the family. With 3 bedrooms, 2 bathrooms, and a generous 1380
              square feet of living space, this residence is the perfect size
              for families on the go. The interior has been professionally
              renovated to be turn-key. All the main living areas boast lush
              hardwood flooring, custom ceiling fans, and recessed lighting for
              that modern aesthetic. The kitchen is beautifully updated with
              quartz countertops, stainless steel appliances and a double vanity
              in the primary bath. Homeowners will love the ease of upkeep and
              durability that comes with hardwood flooring, making it both
              aesthetically pleasing and a practical choice.
              <br />
              <br />
              The benefits extend beyond the interior of 702 W Upas. This
              5227-square-foot lot size comes with a unique feature - an
              attached, separate unit with its own kitchenette and entrance. The
              home is finished off with a drought-tolerant landscaping, gleaming
              stucco finish, and a back porch offering beautiful city skyline
              views.
              <br />
              <br />
              If location is important to you, this is the perfect spot. South
              Mission Hills offers easy access to highways and freeways,
              comprehensive shopping, great restaurants, and activities for the
              whole family. Surrounded by many notable landmarks and parks, it's
              a perfect place to live and experience all that San Diego has to
              offer.
              <br />
              <br />
              Don’t miss out on this great opportunity to own this amazing
              residence!
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
