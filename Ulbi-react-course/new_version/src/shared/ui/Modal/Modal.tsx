import { classNames } from "shared/lib/classNames/classNames";
import { useCallback, useEffect, useState } from "react";

import { Portal } from "../Portal";

import cls from "./Modal.module.scss";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
  element?: HTMLElement;
  lazy?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  className,
  children,
  isOpen = false,
  onClose,
  element,
  lazy,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) setIsMounted(true);
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeHandler();
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onKeyDown]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  };

  if (lazy && !isMounted) return null;

  return (
    <Portal element={element}>
      <div
        className={classNames(cls.modal, mods, [className])}
        onClick={closeHandler}
      >
        <div className={cls.overlay}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
