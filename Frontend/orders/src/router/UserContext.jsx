import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/user';
import Loader from '../components/modules/Loader';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { data } = useQuery(['profile'], getProfile);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userUnit, setUserUnit] = useState(null);

  useEffect(() => {
    if (data && data.data) {
      /* console.log('Received Profile Data:', data.data); */
      setUserRole(data.data.role);
       setUserId(data.data._id)
       setUserUnit(data.data.organization);
      /*  console.log("User Unit in UserContext:", data.data.organization?._id); */
      /* console.log("User Unit in UserContext:", data.data.organization);  */

    }
  }, [data]);
  return (
    <UserContext.Provider value={{ userRole, userId, userUnit }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
