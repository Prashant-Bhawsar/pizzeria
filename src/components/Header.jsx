import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrderStage,
  updateOrderStageTime,
  updateOrderTime,
} from "../redux/actions";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  linkButton: {
    marginLeft: theme.spacing(2),
    textDecoration: "none", // Remove underline from links
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const orders = useSelector((state) => state.orders);
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(updateOrderTime());
      dispatch(updateOrderStageTime());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
  return (
    <AppBar position="static" style={{ marginBottom: "30px" }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Pizzeria!
          </Link>
        </Typography>

        <Link to="/pizzaOrderForm" className={classes.linkButton}>
          <Button
            variant="outlined"
            style={{ color: "white", border: "2px solid black" }}
          >
            <strong>Add Order</strong>
          </Button>
        </Link>
        <Link to="/pizzaOrderList" className={classes.linkButton}>
          <Button
            variant="outlined"
            style={{ color: "white", border: "2px solid black" }}
          >
            <strong>Orders</strong>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
