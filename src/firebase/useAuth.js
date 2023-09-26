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

  const [loading, setLoading] = useState(null);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    global: null //erro global, não associado a um campo específico
  });

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
    setErrors({
      email: null,
      password: null,
      global: null
    });

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
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorsMessages = {
        email: null,
        password: null,
        global: null
      };


      if (error.message.includes("weak-password")) {
        systemErrorsMessages.password = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("missing-email")) {
        systemErrorsMessages.email = "O E-mail é obrigatório.";
      } else if (error.message.includes("email-already")) {
        systemErrorsMessages.email = "E-mail já cadastrado. Por favor tente outro e-mail.";
      } else if (error.message.includes("invalid-email")) {
        systemErrorsMessages.email = "E-mail inválido. Por favor digite um e-mail válido."
      } else {
        systemErrorsMessages.global = "Ocorreu um erro, por favor tente mais tarde.";
      }

      console.log(error);
      setErrors(systemErrorsMessages);
      setLoading(false);
    }
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setErrors({
      email: null,
      password: null,
      global: null
    });

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {

      let systemErrorsMessages = {
        email: null,
        password: null,
        global: null
      };

      if (error.message.includes("invalid-login-credentials")) {
        systemErrorsMessages.global = "E-mail ou senha incorretos. Confira seus dados e preencha corretamente.";
      } else if (error.message.includes("invalid-email")) {
        systemErrorsMessages.email = "E-mail inválido. Por favor digite um e-mail válido."
      } else {
        systemErrorsMessages.global = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setErrors(systemErrorsMessages);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    createUser,
    logout,
    login,
    auth,
    loading,
    errors
  };
};