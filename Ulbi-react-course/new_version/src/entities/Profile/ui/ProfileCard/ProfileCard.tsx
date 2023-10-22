import { FC } from "react";
import { useSelector } from "react-redux";
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";

import "./ProfileCard.scss";

export const ProfileCard: FC = () => {
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  return (
    <div>
      <div className="header">
        <h1>Текст</h1>
        <button
          style={{
            border: "1px solid white",
            padding: "2px 5px",
            borderRadius: "5px",
          }}
        >
          Редактировать
        </button>
      </div>
      <div className="data">
        <input
          className="input"
          type="text"
          value={data?.first}
          placeholder="Ваше имя"
        />
        <input
          className="input"
          type="text"
          value={data?.lastname}
          placeholder="Ваше фамилия"
        />
      </div>
    </div>
  );
};
