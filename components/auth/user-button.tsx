"use client";

import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import styles from "@/app/general.module.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className={styles.userButon}>
          {user?.name || user?.email || "User"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <GearIcon className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
