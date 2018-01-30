/// <reference types="../typings/react-broadcast" />
import React from "react";
import { createContext, Context } from "react-broadcast";
import { Emitted } from "@curi/core";

const key: Emitted = {
  router: null,
  response: null,
  navigation: null
};

export default createContext<Emitted>(key);
