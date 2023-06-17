import React, { useState } from "react";

export const BlogFilter = ({ setSearchParams, postQuery, latest }) => {
  const [search, setSearch] = useState(postQuery);
  const [checked, setChecked] = useState(latest);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const query = form?.search.value;
    const isLatest = form.latest.checked;

    const params = {};

    if (query.length) params.post = query;
    if (isLatest) params.latest = true;

    setSearchParams(params);
  };

  return (
    <>
      <form
        action=""
        autoComplete="off"
        onSubmit={handleSubmit}
        onChange={(e) => setSearch(e.target.value)}
      >
        <input type="search" name="search" value={search} />
        <label style={{ padding: "0 1r em" }}>
          <input
            type="checkbox"
            name="latest"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          New only
        </label>
        <input type="submit" value="Search" />
      </form>
    </>
  );
};
