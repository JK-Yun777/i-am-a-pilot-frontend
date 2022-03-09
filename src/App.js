import { useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import KakaoRedirectHandler from "./components/KakaoRedirectHandler";
import Main from "./pages/Main";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";
import Select from "./pages/Select";
import { useStore } from "./utils/store";

function App() {
  const userEmail = useStore((state) => state.userEmail);
  const login = useStore((state) => state.login);
  const userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (userInfo) {
      login(userInfo);
    }
  }, [userInfo]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {userEmail ? <Game /> : <Main />}
        </Route>
        <Route path="/oauth/callback/kakao" exact>
          <KakaoRedirectHandler />
        </Route>
        <Route path="/game" exact>
          {userEmail ? <Game /> : <Main />}
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
