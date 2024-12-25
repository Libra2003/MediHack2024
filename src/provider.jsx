/**
 * Provider component that wraps its children with the NextUIProvider.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The NextUIProvider component wrapping the children.
*/
import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";

export function Provider({ children }) {
  const navigate = useNavigate();

  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}
