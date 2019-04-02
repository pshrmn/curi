import { PreparedRoute, Interaction } from "@curi/types";

export default function register_routes(
  routes: Array<PreparedRoute>,
  interaction: Interaction,
  parent_data?: any
) {
  routes.forEach(route => {
    const data = interaction.register(route.public, parent_data);
    register_routes(route.children, interaction, data);
  });
}
