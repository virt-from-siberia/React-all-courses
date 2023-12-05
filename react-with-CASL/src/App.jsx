import { useState } from "react";
import { AbilityContext, getAbility } from "./access-control";
import { Posts } from "./post";
import { PermissionsEditor } from "./permissions-editor";

const App = () => {
  const [permissions, setPermissions] = useState({
    Post: ["read", "update", "delete", "add"],
    Lol: ["read", "update", "delete", "add"],
  });

  console.log("permissions", permissions);

  const ability = getAbility(permissions);

  console.log("ability", ability);

  return (
    <>
      <main className="container" style={{ marginTop: "10px" }}>
        <h2>React App with Dynamic Permission using CASL</h2>
        <PermissionsEditor
          permissions={permissions}
          updatePermissions={setPermissions}
        />
        <AbilityContext.Provider value={ability}>
          <Posts />
        </AbilityContext.Provider>
      </main>
    </>
  );
};

export default App;
