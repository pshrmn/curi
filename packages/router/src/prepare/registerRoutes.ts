import { Interaction } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

export default function registerRoutes(
  routes: Array<PreparedRoute>,
  interaction: Interaction,
  parentData?: any
) {
  routes.forEach(route => {
    const data = interaction.register(route.public, parentData);
    registerRoutes(route.children, interaction, data);
  });
}
