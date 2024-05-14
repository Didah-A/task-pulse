import { Text } from "@radix-ui/themes";
import React from "react";

const ErrorDisplay = ({ error }: { error: string | undefined }) => {
  return (
    <div className="mt-1 text-sm">
      <Text color="red" className="text-sm">
        {error}
      </Text>
    </div>
  );
};

export default ErrorDisplay;
