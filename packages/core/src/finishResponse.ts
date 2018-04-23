import { InternalRoute, RedirectProps } from "./types/route";
import { Interactions } from "./types/interaction";
import { Response, Resolved } from "./types/response";
import { Match } from "./types/match";

export default function finishResponse(
  match: Match,
  interactions: Interactions,
  resolved: Resolved | null
): Response {
  const { route, response } = match;
  if (route.response) {
    route.response({
      set: {
        redirect(redirectProps: RedirectProps): void {
          const { name, params, status = 301, ...rest } = redirectProps;
          response.status = status;
          response.redirectTo = {
            pathname: interactions.pathname(name, params),
            ...rest
          };
        },

        error(err: any): void {
          response.error = err;
        },

        status(code: number): void {
          response.status = code;
        },

        data(data: any): void {
          response.data = data;
        },

        body(body: any): void {
          response.body = body;
        },

        title(title: string): void {
          response.title = title;
        }
      },
      resolved,
      name: response.name,
      params: { ...response.params },
      location: response.location,
      route: interactions
    });
  }
  return response as Response;
}
