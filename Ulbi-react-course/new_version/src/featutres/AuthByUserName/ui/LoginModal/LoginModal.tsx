import React from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { onClose, isOpen } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <LoginForm />
    </Modal>
  );
};