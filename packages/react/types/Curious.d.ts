/// <reference types="react" />
/// <reference types="../typings/react-broadcast" />
import React from "react";
import { Emitted } from "@curi/core";
import { ConsumerProps } from 'react-broadcast';
declare const Curious: React.ComponentClass<ConsumerProps<Emitted>>;
export default Curious;
