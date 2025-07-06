import { Trash2 } from "lucide-react";
import React from "react";

type DeleteProps = {
  show?: boolean;
  title?: string;
  desc?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isLoadingText?: string;
  cancelText?: string;
  okText?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  size?: string;
  onHide: () => void;
  onProceed: () => void;
};

export default function Confirm({
  show,
  onHide,
  onProceed,
  title,
  desc,
  disabled,
  isLoading,
  isLoadingText,
  size,
  children,
  cancelText,
  okText,
}: DeleteProps) {
  return show ? (
    <div className="fixed top-0 left-0 z-[999999] flex h-full min-h-screen w-full items-center justify-center dark:bg-transparent bg-neutral-500/40 backdrop-blur-sm px-4 py-5">
      <div
        className={`${
          size ? size : "w-full max-w-[500px]"
        } rounded-lg bg-white py-6 px-6 dark:bg-black relative`}
      >
        <h3 className="pb-2 font-semibold text-zinc-700 tracking-tight leading-tight dark:text-white text-lg">
          {title || children}
        </h3>
        <p className="mb-10 dark:text-white/90">{desc}</p>
        <div className="-mx-3 flex flex-row justify-end gap-x-1">
          <div className="px-3">
            <button
              onClick={() => onHide()}
              className="block rounded-md py-2.5 px-2 text-center text-black/80 dark:text-white/80 dark:hover:text-white font-semibold hover:text-black transition"
            >
              {cancelText || "Cancel"}
            </button>
          </div>
          <div className="px-3">
            <button
              disabled={disabled}
              onClick={() => onProceed()}
              className="block w-full rounded-md border-none bg-brand-500 py-2.5 px-6 text-center font-semibold text-white transition hover:bg-brand-600"
            >
              {isLoading ? isLoadingText : okText || "Proceed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
