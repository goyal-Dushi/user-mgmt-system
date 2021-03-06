import { Container, TextField, Button, Typography } from "@material-ui/core";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../App";
import axios from "axios";

let initialState = {
  name: "",
  email: "",
  phoneNum: "",
  about: "",
  role: false,
  password: "",
};

function CreateUserForm(props) {
  const [userDetails, setUserDetails] = useState(initialState);
  const { setPopup } = useContext(AlertContext);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props?.type === "edit") {
      const response = await axios
        .put("http://localhost:5000/users/" + props?.userInfo?._id, userDetails)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error: ", err);
        });
      setPopup({
        show: true,
        display: response?.msg,
        type: "info",
      });
      props.setModal(false);
      return;
    }
    console.log("userdetails: ", userDetails);
    const data = await axios
      .post("http://localhost:5000/users/register/", userDetails)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
      });
    console.log("data: ", data);
    if (!data?.status) {
      return;
    }
    setUserDetails(initialState);
    setPopup({ show: true, type: "success", display: data?.msg });
    history.push("/userProfile/" + data?.userID);
  };

  useEffect(() => {
    if (props?.type === "edit") {
      setUserDetails(props?.userInfo);
    }
  }, [props?.userInfo, props?.type]);

  const handleDelete = async () => {
    const response = await axios
      .delete("http://localhost:5000/users/" + props?.userInfo?._id)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
      });
    setPopup({ show: true, type: "info", display: response?.msg });
    props?.setModal(false);
  };

  return (
    <>
      <Container maxWidth={"sm"}>
        {props?.type === "delete" ? (
          <>
            <Typography gutterBottom variant={"h5"} color={"secondary"}>
              {"Are you sure you want to delete user " + props?.userInfo?.name}{" "}
            </Typography>
            <Container maxWidth={"sm"}>
              <Button
                color={"secondary"}
                onClick={() => handleDelete()}
                variant={"contained"}>
                {"Yes, Delete"}
              </Button>
              <Button
                color={"primary"}
                style={{ marginLeft: "4px" }}
                onClick={() => props?.setModal(false)}
                variant={"outlined"}>
                {"No, dont't Delete"}
              </Button>
            </Container>
          </>
        ) : (
          <>
            <Typography gutterBottom variant={"h5"} color={"primary"}>
              {props?.type === "edit" ? "Edit" : null}
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                value={userDetails?.name}
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
                value={userDetails?.email}
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
                value={userDetails?.phoneNum}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phoneNum: e.target.value })
                }
                variant={"outlined"}
                type={"number"}
                color={"primary"}
                fullWidth
                label={"Phone Number"}
                placeholder={"Enter your Mobile Number"}
                margin={"dense"}
              />
              <TextField
                value={userDetails?.about}
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
                value={userDetails?.password}
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
                {props?.type === "edit" ? "Edit User Details" : "Register"}
              </Button>
            </form>
          </>
        )}
      </Container>
    </>
  );
}

export default CreateUserForm;
