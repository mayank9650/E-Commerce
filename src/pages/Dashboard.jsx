import React from "react";
import Navbar from "../components/navbar/Navbar";
import Products from "../components/products/Products";

export default function Dashboard() {
  // Additional functionality can be added like footer
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Products></Products>
      </main>
    </>
  );
}
