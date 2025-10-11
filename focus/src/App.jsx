import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { Background } from "./components/ui/Background";
import { Setbackground } from "./components/ui/Setbackground";
import { Outlet } from "react-router";

function App() {
  const [quot, setQuot] = useState("To get something you never had you have to do something you never did.")
  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
