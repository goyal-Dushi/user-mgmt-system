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
  const [editUser, setEditUser] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await axios
        .get("http://localhost:5000/users/")
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error: ", err);
        });
      setUsersList(data);
    };
    if (!modal) {
      getUsers();
    }
  }, [modal]);

  useEffect(() => {
    document.title = "All users";
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    setModal(true);
    setEditUser([usersList.filter((user) => user._id === id)[0], "edit"]);
  };

  const handleDelete = async (id) => {
    setModal(true);
    setEditUser([usersList.filter((user) => user._id === id)[0], "delete"]);
  };

  const getData = (row) => {
    const valuesArr = [];
    let k = 0;
    for (const item of Object.entries(row)) {
      k++;
      if (item[0] === "__v" || item[0] === "password") {
        continue;
      } else if (item[0] === "_id") {
        valuesArr.push(
          <TableCell align={"center"} key={k} colSpan={2}>
            <Button
              size={"small"}
              variant={"outlined"}
              onClick={() => handleEdit(item[1])}
              style={{ margin: "2px" }}
              color={"primary"}>
              {"Edit"}
            </Button>
            <Button
              size={"small"}
              variant={"outlined"}
              onClick={() => handleDelete(item[1])}
              style={{ margin: "2px" }}
              color={"secondary"}>
              {"Delete"}
            </Button>
          </TableCell>
        );
      } else if (item[0] === "role") {
        if (item[1]) {
          valuesArr.push(
            <TableCell align={"center"} key={k}>
              {"Admin"}
            </TableCell>
          );
        } else {
          valuesArr.push(
            <TableCell align={"center"} key={k}>
              {"User"}
            </TableCell>
          );
        }
      } else {
        valuesArr.push(
          <TableCell align={"center"} key={k}>
            {item[1]}
          </TableCell>
        );
      }
    }
    const actions = valuesArr.shift();
    valuesArr.push(actions);
    return valuesArr;
  };
  return (
    <>
      {modal ? (
        <>
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
                padding: "15px",
              }}>
              <CreateUserForm
                type={editUser[1] === "edit" ? "edit" : "delete"}
                userInfo={editUser[0]}
                setModal={setModal}
              />
            </Paper>
          </Modal>
        </>
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
