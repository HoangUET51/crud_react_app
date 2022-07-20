import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import TableUsers from "../components/TableUsers";
import TableComments from "../components/TableComments";
import Login from "../components/Login";
import Private from "./Private";
import NotFound from "./NotFound";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <Private>
              <TableUsers />
            </Private>
          }
        />
        <Route
          path="/comments"
          element={
            <Private>
              <TableComments />
            </Private>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
