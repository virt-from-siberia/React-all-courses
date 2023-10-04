type GreetPropsType = {
  name?: string;
};

export const Greet = (props: GreetPropsType) => {
  const { name } = props;
  return <div>Hello {name}</div>;
};
