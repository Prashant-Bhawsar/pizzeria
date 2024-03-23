import React from "react";
import { useSelector } from "react-redux";
import Pizza from "./Pizza";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cell: {
    padding: theme.spacing(2),
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid black",
  },
}));

const PizzaOrderList = () => {
  const orders = useSelector((state) => state.orders);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>
              <strong>Order Placed</strong>
            </TableCell>
            <TableCell className={classes.cell}>
              <strong>Order in making</strong>
            </TableCell>
            <TableCell className={classes.cell}>
              <strong>Order Ready</strong>
            </TableCell>
            <TableCell className={classes.cell}>
              <strong>Order Picked</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(
            (order) =>
              order.status && (
                <TableRow key={order.id}>
                  <TableCell className={classes.cell}>
                    {order.status === 1 && <Pizza order={order} />}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {order.status === 2 && <Pizza order={order} />}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {order.status === 3 && <Pizza order={order} />}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {order.status === 4 && <Pizza order={order} />}
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PizzaOrderList;
