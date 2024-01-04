import { isLoggedInSignal, userSignal } from "./AuthSignals";

const btnClassnames =
  "px-3 py-1.5 bg-white transition-all duration-200 text-slate-800 rounded-md cursor-pointer hover:bg-slate-800 hover:border-white border-transparent border hover:text-white";

export const Header = () => {
  console.log("userSignal?.value", userSignal?.value);

  return (
    <header className="h-14 bg-slate-800 text-white px-4 py-2 flex items-center">
      <nav className="flex items-center w-full justify-between">
        <div>React Signals</div>
        <ul className="flex gap-4">
          <li>{userSignal.value?.firstName}</li>
          {isLoggedInSignal.value ? (
            <li
              className={btnClassnames}
              onClick={() => {
                userSignal.value = null;
              }}
            >
              Logout
            </li>
          ) : (
            <li
              className={btnClassnames}
              onClick={() =>
                (userSignal.value = {
                  firstName: "Aleksey",
                  lastName: "Hrustolov",
                  email: "Aleksey@mail.ru",
                })
              }
            >
              Login
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
