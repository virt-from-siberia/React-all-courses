import { computed } from "@preact/signals-react";
import { isLoggedInSignal, userSignal } from "./AuthSignals";

const userDisplayName = computed(() => {
  return userSignal.value
    ? `${userSignal.value.firstName} ${userSignal.value.lastName}`
    : null;
});

export const Home = () => {
  return (
    <>
      <main className="m-8">
        <h3 className="text-3xl">
          {isLoggedInSignal.value
            ? `Hello ${userDisplayName.value} you are logged`
            : "Homepage"}
        </h3>
      </main>
    </>
  );
};
