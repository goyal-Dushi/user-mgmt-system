import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function UserHome() {
  console.log("Home Compnent rendered!");

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
        <Link to={"/userlogin"}>
          <Button variant={"outlined"} color={"primary"}>
            {"Login"}
          </Button>
        </Link>
        <Link to={"/userRegister"}>
          <Button variant={"contained"} color={"primary"}>
            {"Register"}
          </Button>
        </Link>
      </Container>
    </>
  );
}

export default UserHome;
