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
  return router.route.active(props.name, response, {
    params: props.params,
    partial: props.partial,
    components: props.components
  });
}
