"use client";

import { forwardRef } from "react";
import { SnackbarContent, CustomContentProps } from "notistack";

export const StylessContent = forwardRef<HTMLDivElement, CustomContentProps>(
  function StylessContent(props, ref) {
    const { id, message, autoHideDuration, persist, ...other } = props;

    return (
      <SnackbarContent ref={ref} role="alert">
        {message}
      </SnackbarContent>
    );
  },
);
