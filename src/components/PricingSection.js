import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useAuth } from "util/auth";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
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
  const classes = useStyles();

  const auth = useAuth();

  const plans = [
    {
      id: "5",
      name: "5 Tokens",
      price: "10",
      perks: [
        "5 real estate listing descriptions",
        "$2.00 per description",
        "One time cost",
        "No reoccuring, monthly fee",
      ],
    },
    {
      id: "10",
      name: "10 Tokens",
      price: "15",
      perks: [
        "10 real estate listing descriptions",
        "$1.50 per description",
        "Save 25%!",
        "One time cost",
        "No reoccuring, monthly fee",
      ],
    },
    {
      id: "20",
      name: "20 Tokens",
      price: "20",
      perks: [
        "20 real estate listing descriptions",
        "$1.00 per description",
        "Save 50%!",
        "One time cost",
        "No reoccuring, monthly fee",
      ],
    },
  ];

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
        <Grid container={true} justifyContent="center" spacing={4}>
          {plans.map((plan, index) => (
            <Grid item={true} xs={12} md={4} key={index}>
              <Card className={classes.card}>
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
                    <Link
                      // href={
                      //   auth.user
                      //     ? `/purchase/${plan.id}`
                      //     : `/auth/signup?next=/purchase/${plan.id}`
                      // }
                      // passHref={true}
                      href={""}
                    >
                      <Button
                        component="a"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth={true}
                      >
                        {/* Buy */}
                        Coming Soon
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default PricingSection;