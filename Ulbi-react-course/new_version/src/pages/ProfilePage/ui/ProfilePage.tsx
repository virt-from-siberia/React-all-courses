import { useEffect } from "react";

import { useAppDispatch } from "app/providers/StoreProvider/config/store";
import { fetchProfileData, profileReducer } from "entities/Profile";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      ProfilePage active
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
