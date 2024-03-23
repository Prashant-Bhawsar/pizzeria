import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/actions";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const PizzaOrderForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const id = useSelector((state) => state.orderIdCounter);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [pizzaType, setPizzaType] = useState("");
  const [pizzaSize, setPizzaSize] = useState("");
  const [pizzaBase, setPizzaBase] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pizzaType || !pizzaSize || !pizzaBase) {
      alert("Please fill all the fields");
      return;
    }
    if (orders.length < 10) {
      const order = {
        id: id,
        pizzaType,
        pizzaSize,
        pizzaBase,
        status: 1,
        time: 0,
        stageTime: 0,
      };
      dispatch(placeOrder(order));
      navigate("/");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">
            Customize Your Pizza
          </Typography>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={pizzaType}
              onChange={(event) => handleChange(event, setPizzaType)}
            >
              <MenuItem value="Veg">Veg</MenuItem>
              <MenuItem value="Non-Veg">Non-Veg</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="size-label">Size</InputLabel>
            <Select
              labelId="size-label"
              id="size"
              value={pizzaSize}
              onChange={(event) => handleChange(event, setPizzaSize)}
            >
              <MenuItem value="Large">Large</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Small">Small</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="base-label">Base</InputLabel>
            <Select
              labelId="base-label"
              id="base"
              value={pizzaBase}
              onChange={(event) => handleChange(event, setPizzaBase)}
            >
              <MenuItem value="Thin">Thin</MenuItem>
              <MenuItem value="Thick">Thick</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            className={classes.button}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PizzaOrderForm;
