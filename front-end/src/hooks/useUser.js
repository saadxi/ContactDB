// const user = useUser();
// check if user is logged in, alongside additional user info
// custom hook
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setisLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, isLoading };
};

export default useUser;
