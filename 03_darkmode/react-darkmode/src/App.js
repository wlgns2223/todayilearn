import { ThemeComponent } from "./context/themeProvider";
import Main from "./components/main";

function App() {
  return (
    <ThemeComponent>
      <Main />
    </ThemeComponent>
  );
}

export default App;
