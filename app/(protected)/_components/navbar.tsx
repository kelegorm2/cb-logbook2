"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SearchBar from "@/components/Search/SearchBar";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 py-3 relative">
      <div className="container mx-auto flex px-8">
        <div className="flex items-center justify-center">
          <Link href="/dashboard">
            <Image
              src="/ctrlb-complete.svg"
              width={50}
              height={30}
              alt="CtrlB Logo"
            />
          </Link>
        </div>
        <div className="lg:hidden text-white grow flex justify-end">
          <HamburgerMenuIcon />
        </div>
        <div className="lg:flex justify-between grow absolute lg:relative lg:top-0 left-0 w-full top-10 py-10 lg:py-0 lg:bg-inherit bg-black">
          <div className="flex flex-col lg:flex-row">
            <Link className="text-white lg:mr-7" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-white lg:mr-7" href="/projects">
              Projects
            </Link>
          </div>
          <div className="text-center">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
    /* <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/ctrlb-complete.svg"
            width={200}
            height={128}
            className="h-8"
            alt="CtrlB Logo"
          />
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Projects
              </a>
            </li>
          </ul>
        </div>
        <div>
          <SearchBar />
        </div>
        <UserButton />
      </div>
    </nav>
    /*
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button 
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">
            Server
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">
            Client
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">
            Admin
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">
            Settings
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>*/
  );
};
