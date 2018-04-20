import { InternalRoute } from "../types/route";
import { Interaction } from "../types/interaction";

export default function registerRoutes(
  routes: Array<InternalRoute>,
  interaction: Interaction,
  parentData?: any
) {
  routes.forEach(route => {
    const data = interaction.register(route.public, parentData);
    registerRoutes(route.children, interaction, data);
  });
}
