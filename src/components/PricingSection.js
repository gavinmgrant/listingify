import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckIcon from "@mui/icons-material/Check";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useAuth } from "util/auth";
import { useUser } from "util/db";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardBorder: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    border: "3px solid #546e74",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(3),
  },
  price: {
    display: "flex",
    alignItems: "baseline",
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  perkIcon: {
    minWidth: 34,
    color: theme.palette.success.main,
  },
}));

function PricingSection(props) {
  const router = useRouter();

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const allPlans = [
    {
      id: "1",
      name: "1 Free Token",
      price: "0",
      perks: ["1 description", "Try us for free!", "New customers only"],
    },
    {
      id: "5",
      name: "5 Tokens",
      price: "10",
      perks: [
        "5 descriptions",
        "$2.00 per description",
        "One time cost",
        "No reoccuring fees",
      ],
    },
    {
      id: "10",
      name: "10 Tokens",
      price: "15",
      perks: [
        "10 descriptions",
        "$1.50 per description",
        "Save 25%!",
        "One time cost",
        "No reoccuring fees",
      ],
    },
    {
      id: "20",
      name: "20 Tokens",
      price: "20",
      perks: [
        "20 descriptions",
        "$1.00 per description",
        "Save 50%!",
        "BEST VALUE!",
        "One time cost",
        "No reoccuring fees",
      ],
    },
  ];

  const [plans, setPlans] = useState([]);
  const classes = useStyles();

  const auth = useAuth();

  const uid = auth.user ? auth.user.uid : undefined;
  const { data } = useUser(uid);
  const isCustomer = !!data?.customers;

  useEffect(() => {
    if (!isCustomer) {
      setPlans(allPlans);
    } else {
      setPlans(allPlans.splice(1));
    }
  }, [isCustomer]);

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <motion.div initial="hidden" whileInView="visible">
          <motion.div
            variants={{
              visible: {
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.1,
                  staggerChildren: 0.2,
                },
              },
              hidden: {
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                },
              },
            }}
          >
            <Grid container={true} justifyContent="center" spacing={2}>
              {plans.map((plan, index) => (
                <Grid item={true} xs={12} md={isCustomer ? 4 : 3} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card
                      variant="outlined"
                      className={
                        plan.id === "1" ? classes.cardBorder : classes.card
                      }
                    >
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h6" component="h2">
                          {plan.name}
                        </Typography>
                        <Box className={classes.price} mt={1}>
                          <Typography variant="h3">${plan.price}</Typography>
                        </Box>

                        {plan.description && (
                          <Box mt={2}>
                            <Typography component="p" color="textSecondary">
                              {plan.description}
                            </Typography>
                          </Box>
                        )}

                        {plan.perks && (
                          <Box mt={1}>
                            <List aria-label="perks">
                              {plan.perks.map((perk, index) => (
                                <ListItem
                                  className={classes.listItem}
                                  disableGutters={true}
                                  key={index}
                                >
                                  <ListItemIcon className={classes.perkIcon}>
                                    <CheckIcon />
                                  </ListItemIcon>
                                  <ListItemText>{perk}</ListItemText>
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}

                        <Box mt="auto" pt={3}>
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            fullWidth
                            onClick={() =>
                              router.push(
                                auth.user
                                  ? `/purchase/${plan.id}`
                                  : `/auth/signup?next=/purchase/${plan.id}`
                              )
                            }
                          >
                            {plan.id === "1" ? "Get" : "Buy"}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default PricingSection;
