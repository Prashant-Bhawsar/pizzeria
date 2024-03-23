import React from "react";
import { useDispatch } from "react-redux";
import {
  updateOrderStage,
  resetOrderStageTime,
  updateCompletedOrder,
} from "../redux/actions";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
}));

const Pizza = ({ order }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // Helper function to format time
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
  const handleNext = (e) => {
    let stage = order.status + 1;

    if (stage > 3) {
      dispatch(updateCompletedOrder());
    }
    dispatch(resetOrderStageTime());
    dispatch(updateOrderStage(order.id, stage));
  };

  return (
    <>
      <Card
        className={classes.card}
        style={{
          backgroundColor: (function () {
            let time = formatTime(order.stageTime);
            if (order.status < 4) {
              if (order.pizzaSize === "Large") {
                if (time.min > 4) {
                  return "red";
                }
              } else if (order.pizzaSize === "Medium") {
                if (time.min > 3) {
                  return "red";
                }
              } else {
                if (time.min > 2) {
                  return "red";
                }
              }
            }
          })(),
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {/* {formatTime(timer)} */}
            {`Order - ${order.id}`}
          </Typography>
          {order.status < 4 ? (
            <>
              <Typography color="textSecondary">
                {getTime(order.stageTime)}
              </Typography>
              <Typography variant="body2" component="p">
                <Button
                  style={{
                    border: "2px solid black",
                    height: "20px",
                    alignItem: "center",
                  }}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Typography>
            </>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};

export default Pizza;
