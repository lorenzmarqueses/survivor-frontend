import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const AppPagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
AppPagination.displayName = "Pagination";

const AppPaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  )
);
AppPaginationContent.displayName = "AppPaginationContent";

const AppPaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />
);
AppPaginationItem.displayName = "AppPaginationItem";

type AppPaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const AppPaginationLink = ({ className, isActive, size = "icon", ...props }: AppPaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
AppPaginationLink.displayName = "AppPaginationLink";

const AppPaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof AppPaginationLink>) => (
  <AppPaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </AppPaginationLink>
);
AppPaginationPrevious.displayName = "AppPaginationPrevious";

const AppPaginationNext = ({ className, ...props }: React.ComponentProps<typeof AppPaginationLink>) => (
  <AppPaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </AppPaginationLink>
);
AppPaginationNext.displayName = "AppPaginationNext";

const AppPaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
AppPaginationEllipsis.displayName = "AppPaginationEllipsis";

export {
  AppPagination,
  AppPaginationContent,
  AppPaginationLink,
  AppPaginationItem,
  AppPaginationPrevious,
  AppPaginationNext,
  AppPaginationEllipsis,
};
