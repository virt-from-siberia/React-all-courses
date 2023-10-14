import React, { Suspense } from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { onClose, isOpen } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginFormAsync />
      </Suspense>
    </Modal>
  );
};
