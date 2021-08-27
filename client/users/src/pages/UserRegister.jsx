import { Typography } from "@material-ui/core";
import CreateUserForm from "../components/createUserForm";

function UserRegister() {
  console.log("Register component rendered!");

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
