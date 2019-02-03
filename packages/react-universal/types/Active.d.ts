import { ReactNode } from "react";
import { ActiveHookProps, CheckActiveResponse } from "./hooks/useActive";
export interface ActiveProps extends ActiveHookProps {
    responseCheck?: CheckActiveResponse;
    children(active: boolean): ReactNode;
}
export default function Active(props: ActiveProps): ReactNode;
