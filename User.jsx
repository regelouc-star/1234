import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [userModalShow, setUserModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  // Fetch users from API
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/user");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUserAdded = () => fetchUser();

  const handleEdit = (user) => {
    setEditUser(user);
    setUserModalShow(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:3005/api/user/${id}`);
      alert("User deleted successfully!");
      fetchUser();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleModalClose = () => {
    setUserModalShow(false);
    setEditUser(null);
  };

  return (
    <div className="mb-3 mx-3">
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>User</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-3 text-center">
        <h3>List of Users</h3>
      </div>

      <Row>
        <Col md={{ span: 4, offset: 8 }}>
          <div className="d-grid mb-1">
            <Button
              variant="success"
              onClick={() => {
                setEditUser(null);
                setUserModalShow(true);
              }}
            >
              Add User
            </Button>
          </div>
        </Col>
      </Row>

      <UserTable
        userdata={userData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserModal
        showModal={userModalShow}
        handleModalClose={handleModalClose}
        onUserAdded={handleUserAdded}
        editData={editUser}
      />
    </div>
  );
};

export default User;
