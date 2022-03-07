import { BrowserRouter, Route, Switch } from "react-router-dom";

import KakaoRedirectHandler from "./components/KakaoRedirectHandler";
import Main from "./pages/Main";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
