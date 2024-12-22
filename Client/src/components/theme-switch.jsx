import { useState, useEffect } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useSwitch } from "@nextui-org/switch";
import clsx from "clsx";

import { useTheme } from "../hooks/use-theme";
import { SunFilledIcon, MoonFilledIcon } from "../components/icons";

/**
 * ThemeSwitch component allows users to toggle between light and dark themes.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {Object} [props.classNames] - Additional class names for specific parts of the component.
 * @param {string} [props.classNames.base] - Class name for the base component.
 * @param {string} [props.classNames.wrapper] - Class name for the wrapper element.
 * @returns {JSX.Element} The rendered ThemeSwitch component.
 *
 * @example
 * <ThemeSwitch className="my-custom-class" classNames={{ base: "base-class", wrapper: "wrapper-class" }} />
*/

export const ThemeSwitch = ({ className, classNames }) => {
  const [isMounted, setIsMounted] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const onChange = toggleTheme;

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange,
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {isSelected ? (
          <MoonFilledIcon size={22} />
        ) : (
          <SunFilledIcon size={22} />
        )}
      </div>
    </Component>
  );
};
