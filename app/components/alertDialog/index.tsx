"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";

interface IAlert {
  text: string;
  title: string;
  confirmText: string;
  onConfirm: () => void;
  children?: ReactNode;
}

const AlertBox = ({
  text,
  onConfirm,
  confirmText,
  children,
  title,
}: IAlert) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{text}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={onConfirm}>
              {confirmText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AlertBox;
