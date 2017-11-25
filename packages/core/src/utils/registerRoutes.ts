import { InternalRoute } from '../route';
import { Addon } from '../interface';

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
