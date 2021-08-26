import { Typography, Container, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

let initialState = {
  email: "",
  password: "",
  name: "",
  phoneNum: "",
  about: "",
};

function UserRegister(props) {
  const [userDetails, setUserDetails] = useState(initialState);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Register: ", userDetails);
    const data = await axios
      .post("http://localhost:5000/users/register/", userDetails)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
      });
    setUserDetails(initialState);
    // console.log("Msg: ", data?.msg);
    props.setPopup({ show: true, type: data?.type, display: data?.msg });
    history.push("/userProfile/" + data?.userID);
  };

  return (
    <>
      <Typography color={"textPrimary"} variant={"h3"} align={"center"}>
        {"User Registration"}
      </Typography>
      <Container maxWidth={"sm"}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            variant={"outlined"}
            color={"primary"}
            fullWidth
            label={"Name"}
            placeholder={"Enter your name"}
            margin={"dense"}
          />
          <TextField
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            variant={"outlined"}
            color={"primary"}
            fullWidth
            type={"email"}
            label={"Email"}
            placeholder={"Enter your Email"}
            margin={"dense"}
          />
          <TextField
            value={userDetails.phoneNum}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phoneNum: e.target.value })
            }
            variant={"outlined"}
            type={"phone"}
            color={"primary"}
            fullWidth
            label={"Phone Number"}
            placeholder={"Enter your Mobile Number"}
            margin={"dense"}
          />
          <TextField
            value={userDetails.about}
            onChange={(e) =>
              setUserDetails({ ...userDetails, about: e.target.value })
            }
            variant={"outlined"}
            color={"primary"}
            fullWidth
            multiline
            label={"About you"}
            placeholder={"Enter few lines about yourself.."}
            margin={"dense"}
          />
          <TextField
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            variant={"outlined"}
            color={"primary"}
            fullWidth
            type={"password"}
            label={"Password"}
            placeholder={"Enter your name"}
            margin={"dense"}
          />
          <Button type={"submit"} variant={"contained"} color={"primary"}>
            {"Register"}
          </Button>
        </form>
      </Container>
    </>
  );
}

export default UserRegister;
