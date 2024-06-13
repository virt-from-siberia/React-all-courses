import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Option = { id: string; label: string };

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/states")
        .then((res) => res.data),
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["language"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/languages")
        .then((res) => res.data),
  });
};

export const useGenders = () => {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/genders")
        .then((res) => res.data),
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/skills")
        .then((res) => res.data),
  });
};
