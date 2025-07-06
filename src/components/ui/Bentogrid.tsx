import { cn, formatDate } from "@/lib/utils";
import { Circle } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 w-full mx-auto ",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  props,
  actions,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  props?: any;
  actions: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-strokedark bg-white border border-transparent flex flex-col space-y-2",
        className,
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm dark:text-slate-50 font-medium font-sans flex items-center">
            {props?.author}{" "}
            <span className="ml-1.5 text-xs">
              <Circle size={6} />
            </span>
            <span className="ml-1.5">{formatDate(props?.created_at)}</span>
          </p>
          {actions}
        </div>
        <div className="font-bold text-neutral-600 dark:text-neutral-200 mb-1.5 mt-2">
          {title}
        </div>
        <div className="font-normal text-neutral-600 text-sm dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
