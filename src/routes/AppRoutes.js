import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCard from "../pages/AddCard";
import CardDetailList from "../pages/CardDetailList";
import EditCardStatus from "../pages/EditCardStatus";
import ExpireCron from "../pages/ExpireCron";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<CardDetailList />}></Route>
        <Route path="/add" element={<AddCard />}></Route>
        <Route path="/edit" element={<EditCardStatus />}></Route>
        <Route path="/expire" element={<ExpireCron />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
