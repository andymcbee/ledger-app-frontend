import React, { useState, createContext, useContext, useEffect } from "react";
import { userPermissions } from "./permissions";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/user";
import { authorizedUserData } from "./types";
import { fetchCurrentUser } from "../utils/fetchCurrentUser";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../components/loadingSpinner/loadingSpinner";

interface UserContextProps {
  user: authorizedUserData | null;
  signIn: (email: string, password: string) => Promise<void> | null;
  signOut: () => Promise<void> | null;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextProps | null>(null);

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<authorizedUserData | null>({
    user: {
      role: "",
      authChecked: false,
      email: "",
      id: "",
      current_organization: "",
    },
    organizations: [],
  });

  const navigate = useNavigate();

  const loginSuccessRedirectDestination = "/dashboard";

  const signOut = async (): Promise<void> => {
    try {
      await userApi.signout();

      navigate("/signin");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userInputData = {
        user_email: email,
        user_password: password,
      };

      const response = await userApi.signin(userInputData);

      if (response.success) {
        const currentUser = await fetchCurrentUser();

        setUser(currentUser);

        navigate(loginSuccessRedirectDestination);
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  
     useEffect(() => {
      if (!user?.user?.authChecked) {
        const fetchData = async () => {
          const currentUser = await fetchCurrentUser();
          console.log("CURRENT USER DATA....");
          console.log(currentUser);
  
          setUser(currentUser);
  
          // navigate(loginSuccessRedirectDestination);
        };
  
        fetchData();
      }
    }, []); 

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
      {...props}
    />
  );
}

export function PrivateRoute(props) {
  const { user } = useContext(UserContext) ?? { user: null }; // Provide a default value for user
  console.log("Test...")
  console.log(user)



  if (user) {
    if (user?.user.role && userPermissions[user.user.role][props.permission]) {
      return <>{props.children}</>;
    }
  }

  if (user?.user.authChecked) {
    return <>Not allowed access! Direct to signin page</>;
  }
  if (!user?.user.authChecked) {
    return <LoadingSpinner />;
  }
}
