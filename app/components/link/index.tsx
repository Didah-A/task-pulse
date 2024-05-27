import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import { ReactNode } from "react";

interface IProps {
  href: string;
  children: string | ReactNode;
}

const Link = ({ href, children }: IProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink className="hover:underline">{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
