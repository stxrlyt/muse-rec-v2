import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "el-dropdown": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        class?: string;
      };
      "el-menu": Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "popover"> & {
        anchor?: string;
        popover?: boolean | string | "" | "auto" | "manual";
        class?: string;
      };
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "el-dropdown": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        class?: string;
      };
      "el-menu": Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "popover"> & {
        anchor?: string;
        popover?: boolean | string | "" | "auto" | "manual";
        class?: string;
      };
    }
  }
}
