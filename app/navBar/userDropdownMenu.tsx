import { DropdownMenu, Avatar, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

const UserDropdownMenu = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size={"2"}
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text>{session.user?.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href={"/api/auth/signout"}>Sign out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserDropdownMenu;
