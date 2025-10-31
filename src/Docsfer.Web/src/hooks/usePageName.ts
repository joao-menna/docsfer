import { useLocation } from "react-router";

const usePageName = () => {
  const location = useLocation();

  // Custom mapping for specific routes
  const routeNameMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/files": "All Files",
    "/relationships": "Relationships",
    "/@me": "My friends",
  };

  // Function to get page name from pathname
  const getPageName = (pathname: string) => {
    // Check if custom mapping
    if (routeNameMap[pathname]) {
      return routeNameMap[pathname];
    }

    const segments = pathname.slice(1).split("/");

    if (segments[0] === "") return "Home";

    if (segments.length === 1) {
      return capitalizeFirst(segments[0]);
    }

    const lastSegment = segments[segments.length - 1];

    const formatted = lastSegment
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();

    return formatted;
  };

  const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return getPageName(location.pathname);
};

export default usePageName;
