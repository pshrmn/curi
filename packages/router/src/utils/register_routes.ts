import { CompiledRoute } from "../types/route";
import { Interaction } from "../types/interaction";

export default function register_routes(
  routes: Array<CompiledRoute>,
  interaction: Interaction,
  parent_data?: any
) {
  routes.forEach(route => {
    const data = interaction.register(route.public, parent_data);
    register_routes(route.children, interaction, data);
  });
}
