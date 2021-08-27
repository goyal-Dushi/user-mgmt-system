import {
  Container,
  Paper,
  TableContainer,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  Table,
  TableHead,
  Button,
  Modal,
  Backdrop,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateUserForm from "../components/createUserForm";

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email ID",
  },
  {
    id: "phone",
    label: "Phone Number",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "role",
    label: "Role",
  },
  {
    id: "actions",
    label: "Action",
  },
];

function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editUser, setEditUser] = useState({ _id: "" });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await axios
        .get("http://localhost:5000/users/")
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error: ", err);
        });
      //   console.log("Users Data: ", data);
      setUsersList(data);
    };
    getUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  if (editUser?._id) {
    const user = usersList.filter((user) => user._id === editUser._id);
    console.log("user from userlist: ", user);
    setEditUser({ ...user });
    console.log("editUser: ", editUser);
    setModal(true);
  }

  const getData = (row) => {
    const valuesArr = [];
    for (const item of Object.entries(row)) {
      if (item[0] === "__v" || item[0] === "password") {
        continue;
      } else if (item[0] === "_id") {
        valuesArr.push(
          <TableCell colSpan={2}>
            <Button
              size={"small"}
              variant={"outlined"}
              onClick={() => setEditUser({ _id: item[1] })}
              style={{ marginRight: "1px" }}
              color={"primary"}>
              {"Edit"}
            </Button>
            <Button
              size={"small"}
              variant={"outlined"}
              style={{ marginLeft: "4px" }}
              color={"secondary"}>
              {"Delete"}
            </Button>
          </TableCell>
        );
      } else if (item[0] === "role") {
        if (item[1]) {
          valuesArr.push(<TableCell> {"Admin"} </TableCell>);
        } else {
          valuesArr.push(<TableCell> {"User"} </TableCell>);
        }
      } else {
        valuesArr.push(<TableCell> {item[1]} </TableCell>);
      }
    }
    return valuesArr;
  };
  return (
    <>
      {modal ? (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
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
            <CreateUserForm
              type={"edit"}
              userInfo={editUser}
              setModal={setModal}
            />
          </Paper>
        </Modal>
      ) : null}
      <Container maxWidth={"md"}>
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={"center"}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow hover tabIndex={-1} key={i}>
                        {/* {getData(row).map((value, i) => (
                          <TableCell align={"center"} key={i}>
                            {value}
                          </TableCell>
                        ))} */}
                        {getData(row)}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component='div'
            count={usersList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
}

export default UsersList;
