import { useState } from "react";
import { useGetGoodsQuery } from "./redux";

function App() {
  const [count, setCount] = useState();
  const { data = [], isLoading } = useGetGoodsQuery(count);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="''">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map((i) => {
          return <div key={i.id}>{i.name}</div>;
        })}
      </ul>
    </div>
  );
}

export default App;
