import { TextField, Typography, Container, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function UserLogin(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:5000/users/login/", user)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
      });
    setUser({ email: "", password: "" });
    if (response?.status) {
      props.setPopup({
        display: response?.msg,
        show: true,
        type: "success",
      });
      history.push("/userProfile/" + response?.userID);
    } else {
      props.setPopup({
        display: response?.msg,
        show: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Typography
        align={"center"}
        gutterBottom
        variant={"h3"}
        color={"textPrimary"}>
        {"User Login"}
      </Typography>
      <Container maxWidth={"xs"}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            color={"primary"}
            variant={"outlined"}
            label={"Email"}
            required
            fullWidth
            margin={"dense"}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder={"Enter your email ID"}
            type={"email"}
          />
          <TextField
            color={"primary"}
            required
            fullWidth
            margin={"dense"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            variant={"outlined"}
            label={"Password"}
            placeholder={"Enter your Password"}
            type={"password"}
          />
          <Container style={{ marginTop: "8px" }} maxWidth={"sm"}>
            <Button type={"submit"} color={"primary"} variant={"contained"}>
              {"Login"}
            </Button>
            <Link
              to={"/userRegister"}
              style={{ textDecoration: "none", marginLeft: "8px" }}>
              <Button color={"primary"} variant={"outlined"}>
                {"Register"}
              </Button>
            </Link>
          </Container>
        </form>
      </Container>
    </>
  );
}

export default UserLogin;
