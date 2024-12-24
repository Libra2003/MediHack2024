import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarBrand,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import { Avatar, Button } from "@nextui-org/react";
import clsx from "clsx";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

import { siteConfig } from "../config/site";
import { ThemeSwitch } from "../components/theme-switch";

export const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <img src="/images/medilearnlogo.png" alt="MediLearn Logo" width="100" height="100" />
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {auth.token ? (
        <NavbarItem className="hidden sm:flex gap-2">
          <Avatar className="w-6 h-6 text-tiny" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" isBordered color="danger" />
        </NavbarItem>) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button color="danger" size="sm" radius="sm" onPress={handleLogin}>
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
