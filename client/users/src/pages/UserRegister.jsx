import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import CreateUserForm from "../components/createUserForm";

function UserRegister() {
  useEffect(() => {
    document.title = "Register User!";
  }, []);

  return (
    <>
      <Typography color={"textPrimary"} variant={"h3"} align={"center"}>
        {"User Registration"}
      </Typography>
      <CreateUserForm />
    </>
  );
}

export default UserRegister;
