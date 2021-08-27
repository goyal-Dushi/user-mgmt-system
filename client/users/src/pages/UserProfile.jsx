import {
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Backdrop,
  Modal,
  Button,
  Collapse,
  Avatar,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateUserFrom from "../components/createUserForm";

function UserProfile() {
  const [expand, setExpand] = useState(false);
  const [editState, setEditState] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  // const [editUser, setUserEdit] = useState({});
  console.log("Profile component rendered!");
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
      // setUserEdit(data);
    };
    getDetail();
  }, [id, editState]);

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
      <Container
        style={{ display: "flex", justifyContent: "space-evenly" }}
        maxWidth={"xs"}>
        <Button
          onClick={() => setEditState(!editState)}
          variant={"contained"}
          color={"secondary"}>
          {"Edit"}
        </Button>
        {userDetail?.role ? (
          <Link to={"/usersList"}>
            <Button variant={"outlined"} color={"primary"}>
              {"Show All Users"}
            </Button>
          </Link>
        ) : null}
      </Container>
      {editState ? (
        <Modal
          open={editState}
          onClose={() => setEditState(!editState)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Paper
            style={{
              height: "fit-content",
              width: "fit-content",
              padding: "5px",
            }}>
            <CreateUserFrom
              type={"edit"}
              userInfo={userDetail}
              setModal={setEditState}
            />
          </Paper>
        </Modal>
      ) : null}
    </>
  );
}

export default UserProfile;
