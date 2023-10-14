import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Navbar.module.scss";
import { useCallback, useState } from "react";
import { Modal } from "shared/ui/Modal";
import { LoginModal } from "featutres/AuthByUserName";
interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, [setIsAuthModal]);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, [setIsAuthModal]);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <button
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "5px",
          borderRadius: "8px",
        }}
        onClick={() => onShowModal()}
      >
        Войти
      </button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      <div className={cls.links}>Navbar</div>
    </div>
  );
};
