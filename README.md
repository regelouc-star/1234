import React from "react";
import { Table, Button } from "react-bootstrap";

const UserTable = ({ userdata, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userdata.length > 0 ? (
          userdata.map((user, index) => (
            <tr key={user._id || index}>
              <td>{index + 1}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.address}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;














import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UserModal = ({ showModal, handleModalClose, onUserAdded, editData }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        fullname: "",
        email: "",
        password: "",
        address: "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editData) {
        // Update existing user
        await axios.put(`http://localhost:3005/api/user/${editData._id}`, formData);
        alert("User updated successfully!");
      } else {
        // Add new user
        await axios.post("http://localhost:3005/api/user", formData);
        alert("User added successfully!");
      }
      onUserAdded();
      handleModalClose();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user.");
    }
  };

  return (
    <Modal show={showModal} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          {editData ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;








