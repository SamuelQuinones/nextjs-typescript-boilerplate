import { FC } from "react";
import { useTheme } from "next-themes";

const Picker: FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Select Theme</h1>
      {theme !== undefined && (
        // eslint-disable-next-line jsx-a11y/no-onchange
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="system">System</option>
        </select>
      )}
    </div>
  );
};

export default Picker;
