/*
 * A simple router interaction that will enable adding a dynamic title
 * to routes, which can be useful for creating links. This
 * relies on the user adding a "title" property to their routes,
 * which is a function that receives parameters and returns
 * a string.
 */
export default function title(route, params) {
  const fn = route.extra && route.extra.title;
  return fn ? fn(params) : route.name;
}
