import { active } from "@curi/router";

import useRouter from "./useRouter";
import useResponse from "./useResponse";

import { SessionLocation } from "@hickory/root";
import { Params } from "@curi/types";

export type ValidateComponents = (l: SessionLocation) => boolean;

export interface ActiveHookProps {
  name: string;
  params?: Params;
  partial?: boolean;
  components?: ValidateComponents;
}

export default function useActive(props: ActiveHookProps) {
  const router = useRouter();
  const { response } = useResponse();
  const route = router.route(props.name);
  if (!route) {
    return false;
  }
  return active(route, response, {
    params: props.params,
    partial: props.partial,
    components: props.components
  });
}
