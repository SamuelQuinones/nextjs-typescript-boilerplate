import { useEffect, useState } from "react";

/**
 * Custom hook that returns a boolean to be used to control rendering / postpone until the dom mounts.
 *
 * SHOULD NOT BE USED TO BLOCK ENTIRE PAGES.
 *
 * Intended for use with state that can differ from their initial value:
 * - toggle switch values
 * - rendering that requires info from the client
 */
function useClientRender() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
}

export default useClientRender;
