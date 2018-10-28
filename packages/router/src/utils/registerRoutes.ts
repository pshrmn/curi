import { CompiledRoute } from "../types/route";
import { Interaction } from "../types/interaction";

export default function registerRoutes(
  routes: Array<CompiledRoute>,
  interaction: Interaction,
  parentData?: any
) {
  routes.forEach(route => {
    const data = interaction.register(route.public, parentData);
    registerRoutes(route.children, interaction, data);
  });
}
