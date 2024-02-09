"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { use, useRef, useState } from "react";
import styles from "./styles.module.css";

export const Navbar = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
    if (ref.current) {
      ref.current.classList.toggle(styles.menuHidden);
    }
  };

  return (
    <nav className={styles.navContainer}>
      <div>
        <Link href="/dashboard">
          <Image
            src="/ctrlb-complete.svg"
            width={80}
            height={50}
            alt="CtrlB Logo"
          />
        </Link>
      </div>

      <div ref={ref} className={styles.menuContainer}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/projects">Projects</Link>
      </div>
      <div>
        <UserButton />
      </div>

      <div className={styles.HamburgerMenuIcon}>
        <HamburgerMenuIcon onClick={toggleMenu} />
      </div>
    </nav>
  );
};
