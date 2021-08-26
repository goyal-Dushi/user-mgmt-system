import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function UserHome() {
  return (
    <>
      <Typography
        gutterBottom
        align={"center"}
        color={"secondary"}
        variant={"h2"}>
        {"Welcome User"}
      </Typography>
      <Container
        maxWidth={"sm"}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}>
        <Button variant={"outlined"} color={"primary"}>
          <Link style={{ textDecoration: "none" }} to={"/userlogin"}>
            {"Login"}
          </Link>
        </Button>
        <Button variant={"contained"} color={"primary"}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/userRegister"}>
            {"Register"}
          </Link>
        </Button>
      </Container>
    </>
  );
}

export default UserHome;
