import { isLoggedInSignal } from "./AuthSignals";

export const Home = () => {
  return (
    <>
      <main className="m-8">
        <h3 className="text-3xl">
          {isLoggedInSignal.value ? "Hello you are logged" : "Homepage"}
        </h3>
      </main>
    </>
  );
};
