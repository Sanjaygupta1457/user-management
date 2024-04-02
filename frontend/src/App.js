import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/user';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchUsers();
        setFormData({
          name: '',
          email: '',
          password: '',
          dob: '',
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}?id=${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}?id=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchUsers();
        setFormData({
          name: '',
          email: '',
          password: '',
          dob: '',
        });
        setEditingUserId(null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const startEditingUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setFormData(userToEdit);
      setEditingUserId(userId);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editingUserId) {
            updateUser(editingUserId, formData);
          } else {
            createUser();
          }
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
        <button type="submit">
          {editingUserId ? 'Update User' : 'Create User'}
        </button>
      </form>
      <ul>
        {Array.isArray(users) &&
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.dob}{' '}
              <button onClick={() => deleteUser(user.id)}>Delete</button>{' '}
              <button onClick={() => startEditingUser(user.id)}>Edit</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserManagement;
