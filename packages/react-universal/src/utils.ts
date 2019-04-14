export function stringifyFlatObject(obj: { [key: string]: any } = {}) {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join("&");
}
