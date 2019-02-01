import { RouteLocation } from "@curi/router";
export default function useLocation(props: RouteLocation): {
    pathname: any;
    hash: string;
    query: any;
    state: any;
};
