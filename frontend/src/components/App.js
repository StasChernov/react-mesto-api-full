import "../index.css";
import { useEffect, useState } from "react";
import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import Places from "./Places";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";
import Api from "../utils/Api";

function App(props) {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    loggedIn: false,
    email: false,
    id: false,
  });

  const [tooltip, setTooltip] = useState({
    isOpen: false,
    isOk: false,
    isConfirm: false,
    message:""
  });

  const [isChecked, setIsChecked] = useState(false);

  function isLogin(email) {
    Api.updateToken();
    setCurrentUser({
      ...currentUser,
      email,
      loggedIn: true,
    });
  }

  function handleLogin(userData) {
    auth
      .signIn(userData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          isLogin(userData.email);
          history.push("/");
        }
      })
      .catch((err) => {
        setTooltip({
          ...tooltip,
          isOpen: true,
          isOk: false,
          message: 'Что-то пошло не так! Попробуйте еще раз.'
        });
        console.log("%c" + err, "color: #dd3333");
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsChecked(false);

    auth
      .checkToken(token)
      .then(({ data }) => {
        setCurrentUser({
          loggedIn: true,
          email: data.email,
          id: data._id,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Соединение было прервано");
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setIsChecked(true);
      });
  }, []);

  function handleSignOut() {
    localStorage.removeItem('token');
    setCurrentUser({
      loggedIn: false,
      email: false,
      id: false
    });
    setCurrentUser({});
    history.push("sign-in");
  }

  function handleCloseTooltip() {
    setTooltip({
      ...tooltip,
      isOpen: false,
    });

    if (tooltip.isOk) {
      history.push("/sign-in");
    }
  }

  function handleRegister(userData) {
    auth
      .signUp(userData)
      .then(() => {
        setTooltip({
          ...tooltip,
          isOpen: true,
          isOk: true,
          message:'Вы успешно зарегистрировались!'
        });
      })
      .catch((err) => {
        console.log("%c" + err, "color: #dd3333");
        setTooltip({
          ...tooltip,
          isOpen: true,
          isOk: false,
          message: 'Что-то пошло не так! Попробуйте еще раз.'
        });
      });
  }

  return (
    <div className="page">
      <Header
        className="header__auth"
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />
      <Switch>
        {isChecked && (
          <ProtectedRoute
            path="/"
            exact
            loggedIn={currentUser.loggedIn}
            component={Places}
          />
        )}
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
      </Switch>
      <Footer />
      <InfoTooltip
        isOk={tooltip.isOk}
        isOpen={tooltip.isOpen}
        onClose={handleCloseTooltip}
        tooltipMessage={tooltip.message}
      />
    </div>
  );
}

export default withRouter(App);
