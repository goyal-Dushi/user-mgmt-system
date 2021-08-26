import {
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Collapse,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile(props) {
  const [expand, setExpand] = useState(false);
  const [editState, setEditState] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [editUser, setUserEdit] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getDetail = async () => {
      const data = await axios
        .get("http://localhost:5000/users/" + id)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error: ", err);
        });
      setUserDetail(data);
      setUserEdit(data);
    };
    getDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .put("http://localhost:5000/users/" + id)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error: ", err);
      });
    props.setPopup({
      show: true,
      display: response?.msg,
      type: response?.type,
    });
    setUserDetail(editUser);
  };

  return (
    <>
      <Typography gutterBottom color={"textPrimary"} variant={"h3"}>
        {"User Profile"}
      </Typography>
      <Container maxWidth={"sm"} style={{ marginBottom: "50px" }}>
        <Card raised>
          <CardHeader
            avatar={
              <Avatar aria-label={"user-icon"}>
                {userDetail?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
            }
            title={userDetail?.name}
          />
          <CardContent>
            <Typography variant={"subtitle1"}>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <b> Email: </b> {userDetail?.email}
                </li>
                <li>
                  <b> Phone Num: </b> {userDetail?.phoneNum}
                </li>
                <li>
                  <b> Role: </b> {userDetail?.role ? "Admin" : "User"}
                </li>
              </ul>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => setExpand(!expand)}
              color={"secondary"}
              variant={"contained"}>
              {"View More"}
            </Button>
          </CardActions>
          <Collapse in={expand} timeout={"auto"}>
            <CardContent>
              <Typography color={"textSecondary"} variant={"body1"}>
                {userDetail?.about}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Container>
      <Button
        onClick={() => setEditState(!editState)}
        variant={"contained"}
        color={"secondary"}>
        {"Edit"}
      </Button>
      {editState ? (
        <Container maxWidth={"md"} style={{ marginTop: "50px" }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              value={editUser.name}
              //   editUser
              onChange={(e) =>
                setUserEdit({ ...editUser, name: e.target.value })
              }
              variant={"outlined"}
              color={"primary"}
              fullWidth
              label={"Name"}
              placeholder={"Enter your name"}
              margin={"dense"}
            />
            <TextField
              value={editUser.email}
              onChange={(e) =>
                setUserEdit({ ...editUser, email: e.target.value })
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
              value={editUser.phoneNum}
              onChange={(e) =>
                setUserEdit({ ...editUser, phoneNum: e.target.value })
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
              value={editUser.about}
              onChange={(e) =>
                setUserEdit({ ...editUser, about: e.target.value })
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
              value={editUser.password}
              onChange={(e) =>
                setUserEdit({ ...editUser, password: e.target.value })
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
              {"Edit"}
            </Button>
          </form>
        </Container>
      ) : null}
    </>
  );
}

export default UserProfile;
