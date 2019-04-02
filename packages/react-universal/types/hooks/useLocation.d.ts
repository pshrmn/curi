import { RouteLocation } from "@curi/types";
export default function useLocation(props: RouteLocation): {
    pathname: any;
    hash: string;
    query: any;
    state: any;
};
