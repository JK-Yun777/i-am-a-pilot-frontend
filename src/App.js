import { BrowserRouter, Route, Switch } from "react-router-dom";

import KakaoRedirectHandler from "./components/KakaoRedirectHandler";
import Main from "./pages/Main";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";
import Select from "./pages/Select";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/oauth/callback/kakao" exact>
          <KakaoRedirectHandler />
        </Route>
        <Route path="/game" exact>
          <Game />
        </Route>
        <Route path="/rank" exact>
          <Ranking />
        </Route>
        <Route path="/select" exact>
          <Select />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
