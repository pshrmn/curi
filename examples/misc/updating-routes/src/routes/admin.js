import Admin from "../components/Admin";
import routes from "./base";

export default [
  {
    name: "Admin",
    path: "admin",
    response() {
      return {
        body: Admin
      };
    }
  },
  ...routes
];
