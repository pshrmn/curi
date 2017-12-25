import { InternalRoute } from '../types/route';
import { Addon } from '../types/addon';

export default function registerRoutes(
  routes: Array<InternalRoute>,
  addon: Addon,
  parentData?: any
) {
  routes.forEach(route => {
    const data = addon.register(route.public, parentData);
    registerRoutes(route.children, addon, data);
  });
}
