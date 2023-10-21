export { Profile, ProfileSchema } from "./model/types/profile";

export { profileActions, profileReducer } from "./model/slice/profileSlice";

export { getProfileData } from "./model/selectors/getProfileData/getProfileData";
export { getProfileError } from "./model/selectors/getProfileError/getProfileError";
export { getProfileIsLoading } from "./model/selectors/getProfileIsLoading/getProfileIsLoading";
export { fetchProfileData } from "./model/service/fetchProfileData";
