import React, { useEffect, useState } from "react";
import { FetchAllUsers } from "../services/useService";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import AddUser from "./AddUser";
import ReactPaginate from "react-paginate";
import EditUser from "./EditUser";
import _ from "lodash";
import { debounce } from "lodash";
import DeleteUser from "./DeleteUser";
import "./TableUsers.scss";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);

  const [isShowAdd, setIsShowAdd] = useState(false);

  const [isShowEdit, setIsShowEdit] = useState(false);

  const [isDataEdit, setIsDataEdit] = useState({});

  const [isPage, setIsPage] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(0);

  const [isShowDelete, setIsShowDelete] = useState(false);

  const [isDataDelete, setIsDataDelete] = useState({});

  const [sortBy, setSortBy] = useState("");
  const [sortField, setSortField] = useState("");
  const [dataExport, setDataExport] = useState([]);
  const handleClose = () => {
    setIsShowAdd(false);
    setIsShowEdit(false);
    setIsShowDelete(false);
  };

  const handleUpdate = (user) => {
    setListUsers([...listUsers, user]);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await FetchAllUsers(page);
    if (res && res.data) {
      setListUsers(res.data);
      setIsPage(res.total_pages);
    }
  };

  const handleSuccess = () => {
    setIsShowAdd(true);
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
    setPageCurrent(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setIsShowEdit(true);
    setIsDataEdit(user);
  };

  const handleEditModal = (user) => {
    const currentUser = _.clone(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    currentUser[index].first_name = user.first_name;
    setListUsers(currentUser);
  };

  const handleDeleteUser = (user) => {
    setIsShowDelete(true);
    setIsDataDelete(user);
  };

  const handleUpdateDelete = (id) => {
    let currentUser = _.clone(listUsers);
    if (currentUser && currentUser.length > 0) {
      currentUser = currentUser.filter((item) => item.id !== id);
    }
    setListUsers(currentUser);
  };

  const handleSearchEmail = debounce((event) => {
    let emailSearch = event.target.value;
    let currentUser = _.clone(listUsers);
    if (emailSearch) {
      currentUser = currentUser.filter((item) =>
        item.email.includes(emailSearch)
      );
      setListUsers(currentUser);
    } else {
      getUsers(pageCurrent);
    }
  }, 500);

  const handleSort = (by, field) => {
    setSortBy(by);
    setSortField(field);
    let currentUser = _.clone(listUsers);
    currentUser = _.orderBy(currentUser, [field], [by]);
    setListUsers(currentUser);
  };

  const handleExport = (event, done) => {
    let currentUser = _.clone(listUsers);
    let results = [];
    let label = ["ID", "Email", "First Name", "Last Name"];
    if (currentUser && currentUser.length > 0) {
      results.push(label);
      currentUser.map((item) => {
        let data = [];
        data[0] = item.id;
        data[1] = item.email;
        data[2] = item.first_name;
        data[3] = item.last_name;
        results.push(data);
      });
      setDataExport(results);
      done();
    }
  };

  const handleImport = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept CSV files");
        return;
      }
      Papa.parse(file, {
        complete: function (results) {
          let rawCSV = results.data;
          console.log(rawCSV);
          if (rawCSV && rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Import Failed 1");
              } else {
                let results = [];
                rawCSV.map((item, index) => {
                  let obj = [];
                  if (index > 0 && item.length === 3) {
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    results.push(obj);
                  }
                });
                console.log(results);
                setListUsers(results);
                toast.success("Import Success");
              }
            } else {
              toast.error("Import Failed 2");
            }
          } else {
            toast.error("Import Failed 3");
          }
        },
      });
    }
  };
  return (
    <>
      <div className="table-container">
        <div className="my-3 d-flex justify-content-between ">
          <div className="search-container">
            <span className="title">List Users</span>
            <input
              className="input_search mx-0"
              type="text"
              placeholder="Search Email"
              onChange={(e) => handleSearchEmail(e)}
            />
          </div>
          <div className="btn-group ">
            <label htmlFor="import" className="btn btn-danger">
              <i class="fa-solid fa-upload mx-md-1"></i>
              Import
            </label>
            <input
              type="file"
              id="import"
              hidden
              multiple
              onChange={(e) => handleImport(e)}
            />
            <CSVLink
              data={dataExport}
              asyncOnClick={true}
              className="btn btn-warning mx-1"
              onClick={handleExport}
              filename={"my-file.csv"}
            >
              <i className="fa-solid fa-file-export mx-1"></i>
              Export
            </CSVLink>
            <button onClick={() => handleSuccess()} className="btn btn-success">
              <i className="fa-solid fa-user-plus "></i>
              Add
            </button>
          </div>
        </div>
        <Table striped bordered hover className="Table">
          <thead>
            <tr>
              <th className="text-center">
                <span className="mx-1">Id</span>
                <i
                  className="sort-field fa-solid fa-arrow-up mx-1"
                  onClick={() => handleSort("asc", "id")}
                ></i>
                <i
                  className="sort-field fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "id")}
                ></i>
              </th>
              <th className="text-center">
                <span className="mx-1">Email</span>
                <i
                  className="sort-field fa-solid fa-arrow-up mx-1"
                  onClick={() => handleSort("asc", "email")}
                ></i>
                <i
                  className="sort-field fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "email")}
                ></i>
              </th>
              <th className="text-center">
                <span className="mx-1">First name</span>
                <i
                  className="sort-field fa-solid fa-arrow-up mx-1"
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
                <i
                  className="sort-field fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
              </th>
              <th className="text-center">Last name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((user, index) => {
                return (
                  <>
                    <tr key={`user-${index}`}>
                      <td className="text-center">{user.id}</td>
                      <td className="text-center">{user.email}</td>
                      <td className="text-center">{user.first_name}</td>
                      <td className="text-center">{user.last_name}</td>
                      <td>
                        <div className="d-flex gap-3 justify-content-center">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="btn btn-warning"
                          >
                            <i class="fa-solid fa-pen-to-square mx-1"></i>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="btn btn-danger"
                          >
                            <i class="fa-solid fa-trash-can mx-1"></i>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center ">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={2}
            previousLabel="< prev"
            containerClassName="pagination"
            activeClassName="active"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            pageClassName="page-item"
            breakClassName="page-item"
            nextClassName="page-item"
            previousClassName="page-item"
          />
        </div>
      </div>
      <AddUser
        handleClose={handleClose}
        show={isShowAdd}
        handleUpdate={handleUpdate}
      />
      <EditUser
        handleClose={handleClose}
        show={isShowEdit}
        isDataEdit={isDataEdit}
        handleEditModal={handleEditModal}
      />
      <DeleteUser
        handleClose={handleClose}
        show={isShowDelete}
        isDataDelete={isDataDelete}
        handleUpdateDelete={handleUpdateDelete}
      />
    </>
  );
};

export default TableUsers;
