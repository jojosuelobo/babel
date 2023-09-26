/* eslint-disable no-unused-vars */
import { db } from "./config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {

  const [emailError, setEmailError] = useState(null);
  const [emailPasswordError, setEmailPasswordError] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;
    } catch (error) {

      let systemErrorMessage;

      if (error.message.includes("weak-password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado. Por favor tente outro e-mail";
      } else if (error.message.includes("invalid-email")) {
        systemErrorMessage = "E-mail inválido. Por favor digite um e-mail válido"
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    setEmailError(null);
    setEmailPasswordError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {

      let systemErrorMessage;

      if (error.message.includes("invalid-login-credentials")) {
        systemErrorMessage = "E-mail ou senha incorretos. Confira seus dados e preencha corretamente";
        setEmailPasswordError(systemErrorMessage);
      } else if (error.message.includes("invalid-email")) {
        systemErrorMessage = "E-mail inválido. Por favor digite um e-mail válido"
        setEmailError(systemErrorMessage);
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
        setError(systemErrorMessage)
      }

    }

    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
    emailError,
    emailPasswordError
  };
};