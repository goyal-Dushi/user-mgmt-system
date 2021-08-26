import { Container, Typography, makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserProfile from "./pages/UserProfile";
import UserHome from "./pages/UserHome";
import { Alert } from "@material-ui/lab";
import { useState } from "react";

const useStyles = makeStyles({
  alertStyle: {
    "& .MuiAlert-message": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
  },
});

function App() {
  const [alert, setAlert] = useState({
    show: false,
    display: "",
    type: "",
  });

  const classes = useStyles();

  return (
    <Container maxWidth={"md"}>
      <div
        onClick={() => setAlert({ display: "", show: false, type: "" })}
        style={{ height: "60px" }}>
        {alert.show ? (
          <Alert className={classes.alertStyle} severity={alert.type}>
            {alert?.display}
            <Typography color={"textSecondary"} variant={"caption"}>
              {"Click to close"}
            </Typography>
          </Alert>
        ) : null}
      </div>
      <Router>
        <Switch>
          <Route path={"/"} exact component={UserHome} />
          <Route path={"/userlogin"} exact>
            <UserLogin setPopup={setAlert} />
          </Route>
          <Route path={"/userRegister"} exact>
            <UserRegister setPopup={setAlert} />
          </Route>
          <Route path={"/userProfile/:id"} exact>
            <UserProfile setPopup={setAlert} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
