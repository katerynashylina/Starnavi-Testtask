type Props = {
  name: string,
}

export const Option: React.FC<Props> = ({ name }) => {
  return (
    <option
      value={name}
    >
      {name}
    </option>
  );
}