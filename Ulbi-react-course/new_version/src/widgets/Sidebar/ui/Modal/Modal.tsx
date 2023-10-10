import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  className,
  children,
  isOpen = false,
  onClose,
}) => {
  const closeHandler = () => {
    if (onClose) onClose();
  };

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  };

  return (
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
  );
};
