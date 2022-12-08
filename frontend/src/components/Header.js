import { NavLink, Route, Switch } from "react-router-dom";

export default function Header({ currentUser, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__link">
            Войти
          </NavLink>
        </Route>
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__link">
            Регистрация
          </NavLink>
        </Route>
        <Route path="/">
          <div className="header__link-block">
            <p className="header__text">{currentUser.email}</p>
            <NavLink onClick={onSignOut} to="/sign-in" className="header__link">
              Выйти
            </NavLink>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
