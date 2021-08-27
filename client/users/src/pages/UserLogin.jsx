import { TextField, Typography, Container, Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UserLogin(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  console.log("Login component rendered!");

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
    console.log("Response Login: ", response);
    if (response?.status) {
      // console.log(response?.msg);
      props.setPopup({
        display: response?.msg,
        show: true,
        type: "success",
      });
      history.push("/userProfile/" + response?.userID);
    } else {
      // console.log(response?.msg);
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
          <Button
            type={"submit"}
            fullWidth
            color={"primary"}
            variant={"contained"}>
            {"Login"}
          </Button>
        </form>
      </Container>
    </>
  );
}

export default UserLogin;
