import React from "react";

import useResponse from "./useResponse";

export default function useFinishNavigation() {
  const { navigation } = useResponse();
  React.useEffect(() => {
    if (navigation.finish) {
      navigation.finish();
    }
  }, [navigation]);
}
