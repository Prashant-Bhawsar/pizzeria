// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import PizzaOrderForm from "./components/PizzaOrderForm";
import Header from "./components/Header";
import Home from "./components/Home";
import PizzaOrderList from "./components/PizzaOrderList";

const store = createStore(reducer);

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizzaOrderForm" element={<PizzaOrderForm />} />
          <Route path="/pizzaOrderList" element={<PizzaOrderList />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
