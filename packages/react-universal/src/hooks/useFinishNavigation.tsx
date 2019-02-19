import React from "react";

import useCuri from "./useCuri";

export default function useFinishNavigation() {
  const { navigation } = useCuri();
  React.useEffect(() => {
    navigation.finish();
  }, [navigation]);
}
