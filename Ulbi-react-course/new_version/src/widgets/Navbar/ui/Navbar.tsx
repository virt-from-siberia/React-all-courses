import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Navbar.module.scss";
import { useCallback, useState } from "react";
import { Modal } from "widgets/Sidebar/ui/Modal";
interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isAuthModal, setIsAuthModal] = useState(true);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
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
        onClick={() => setIsAuthModal(true)}
      >
        toggle modal
      </button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
        esse expedita consectetur mollitia adipisci modi ex natus nostrum
        maiores. Ratione aperiam doloremque sed consectetur inventore itaque
        repellat recusandae, quasi amet.
      </Modal>
      <div className={cls.links}>Navbar</div>
    </div>
  );
};
