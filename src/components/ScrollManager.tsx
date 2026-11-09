import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Target section may not be mounted yet right after a route change.
    let tries = 0;
    const id = hash.slice(1);
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        // Images above the target can still shift the layout; re-align once settled.
        setTimeout(() => el.scrollIntoView({ block: "start" }), 400);
      } else if (tries++ < 20) {
        requestAnimationFrame(attempt);
      }
    };
    attempt();
  }, [pathname, hash]);

  return null;
}
