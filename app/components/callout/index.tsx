import { Callout } from "@radix-ui/themes";
import React from "react";

const CalloutComponent = ({ text }: { text: string | null }) => {
  return (
    <Callout.Root color="red">
      <Callout.Text>{text}</Callout.Text>
    </Callout.Root>
  );
};

export default CalloutComponent;
