import { profileReducer } from "entities/Profile";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  return (
    <DynamicModuleLoader reducers={reducers}>
      ProfilePage active
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
