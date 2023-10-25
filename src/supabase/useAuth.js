import { useState, useEffect } from 'react'
import { supabase } from './config'

export const useAuthentication = () => {

  const [emailError, setEmailError] = useState(null);
  const [emailPasswordError, setEmailPasswordError] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [userData, setUser] = useState();

  const [email, setEmail] = useState();

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = supabase.auth;//getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Pega o usuario da sessao atual, pode retornar nulo
  const getUserId = async (uuid) => {
    const {user} = (await supabase.auth.getUser(uuid)).data
    //console.log("userId: " + user.id)
    setUser(user.id)
    return user.id
  }

  const getEmail = async (uuid) => {
    const {user} = (await supabase.auth.getUser(uuid)).data
    //console.log("email: " + user.email)
    setEmail(user.email)
    return user.email
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user, session, errorSignUp } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
      // const { user } = await createUserWithEmailAndPassword(
      //   auth,
      //   data.email,
      //   data.password
      // );

      // await updateProfile(user, {
      //   displayName: data.displayName,
      // });

      return user;
    } catch (erroCatch) {

      let systemErrorMessage;

      systemErrorMessage = erroCatch.message;

      // if (error.message.includes("weak-password")) {
      //   systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      // } else if (error.message.includes("email-already")) {
      //   systemErrorMessage = "E-mail já cadastrado. Por favor tente outro e-mail";
      // } else if (error.message.includes("invalid-email")) {
      //   systemErrorMessage = "E-mail inválido. Por favor digite um e-mail válido"
      // } else {
      //   systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      // }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  const logout = async () => {
    checkIfIsCancelled();

    const {error} = await supabase.auth.signOut()
    //signOut(auth);
  };

  const login = async (loginData) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    setEmailError(null);
    setEmailPasswordError(null);

    try {
      //await supabase.auth.signInWithPassword(data.email, data.password);
      //await signInWithEmailAndPassword(auth, data.email, data.password);
      const{ _, errorSignIn } = await auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })
    } catch (erroCatch) {

      console.log(erroCatch);
      let systemErrorMessage;

      systemErrorMessage = erroCatch.message;
      setError(systemErrorMessage);
      // if (error.message.includes("invalid-login-credentials")) {
      //   systemErrorMessage = "E-mail ou senha incorretos. Confira seus dados e preencha corretamente";
      //   setEmailPasswordError(systemErrorMessage);
      // } else if (error.message.includes("invalid-email")) {
      //   systemErrorMessage = "E-mail inválido. Por favor digite um e-mail válido"
      //   setEmailError(systemErrorMessage);
      // } else {
      //   systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      //   setError(systemErrorMessage)
      // }

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
    emailPasswordError,
    getUserId,
    getEmail,
    userData,
    email
  };
};