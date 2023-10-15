import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "app/providers/StoreProvider/config/store";
import { LoginModal } from "featutres/AuthByUserName";

import { classNames } from "shared/lib/classNames/classNames";
import { getUserAuthData, userActions } from "entities/User";

import cls from "./Navbar.module.scss";
interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, [setIsAuthModal]);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, [setIsAuthModal]);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [setIsAuthModal]);

  if (authData) {
    return (
      <div className={classNames(cls.navbar, {}, [className])}>
        <button
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "5px",
            borderRadius: "8px",
          }}
          onClick={() => onLogout()}
        >
          Выйти
        </button>
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        <div className={cls.links}>Navbar</div>
      </div>
    );
  }

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
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}

      <div className={cls.links}>Navbar</div>
    </div>
  );
};
