import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder, updateOrderStage } from "../redux/actions";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const Home = () => {
  const orders = useSelector((state) => state.orders);
  const ordersCompleted = useSelector((state) => state.orderCompleted);
  const dispatch = useDispatch();
  const handleNext = (id) => {
    dispatch(deleteOrder(id));
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hour: hours, min: minutes, sec: secs };
  };
  const getTime = (timer) => {
    let time = formatTime(timer);
    return time.min > 0
      ? `${time.min} min : ${time.sec} sec`
      : `${time.sec} sec`;
  };

  return (
    <>
      <h2>Your Orders</h2>
      <TableContainer component={Paper} style={{ border: "1px solid #e0e0e0" }}>
        <Table style={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: "2px solid black" }}>
                Order Id
              </TableCell>
              <TableCell style={{ border: "2px solid black" }}>Stage</TableCell>
              <TableCell style={{ border: "2px solid black" }}>
                Total Time Spent
              </TableCell>
              <TableCell style={{ border: "2px solid black" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Example rows */}
            {orders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell style={{ border: "2px solid #e0e0e0" }}>
                    {order.id}
                  </TableCell>
                  <TableCell style={{ border: "2px solid #e0e0e0" }}>
                    {order.status == 1
                      ? "Order Placed"
                      : order.status == 2
                      ? "Order in making"
                      : order.status == 3
                      ? "Order ready"
                      : order.status == 4
                      ? "Order Picked"
                      : ""}
                  </TableCell>
                  <TableCell style={{ border: "2px solid #e0e0e0" }}>
                    {getTime(order.time)}
                  </TableCell>
                  <TableCell style={{ border: "2px solid #e0e0e0" }}>
                    {order.status < 3 ? (
                      <Button
                        style={{
                          border: "2px solid black",
                          height: "20px",
                          alignItem: "center",
                        }}
                        onClick={() => handleNext(order.id)}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell style={{ border: "1px solid #e0e0e0" }}>
                Total order delivered
              </TableCell>
              <TableCell rowSpan={3}>{ordersCompleted}</TableCell>
            </TableRow>

            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
