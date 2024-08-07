import './EmployeeRecords.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import EmpDetailsForm from './EmpDetailsForm';
axios.defaults.baseURL = "http://localhost:8000/";
function EmployeeRecords() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [addAdminSection, setAddAdminSection] = useState(false);
  const [editAdminSection, setEditAdminSection] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    password: "",
    _id: ""
  });

  const [formDataAdmin, setFormDataAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formDataEditAdmin, setFormDataEditAdmin] = useState({
    name: "",
    email: "",
    password: "",
    _id: ""
  });

  const [dataList, setDataList] = useState([]);
  const [adminDataList, setAdminDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOnChangeAdmin = (e) => {
    const { value, name } = e.target;
    setFormDataAdmin((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  };


  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/createAdmin", formDataAdmin);
      if (data.data.success) {
        setAddAdminSection(false);
        alert(data.data.message);
        getAdminData();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Maximum limit of admin records reached. You cannot add more admins.");
        // Close the form and clear the data
        setFormDataAdmin({
          name: "",
          email: "",
          password: ""
        });
        setAddAdminSection(false);
      } else {
        console.error("Error adding admin:", error);
        alert("An error occurred while adding admin. Please try again later.");
      }
    }
  };
  

  const getFetchData = async () => {
    const data = await axios.get("/empData");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  const getAdminData = async () => {
    try {
      const data = await axios.get("/adminData");
      if (data.data.success) {
        setAdminDataList(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
    getAdminData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete("/delete/" + id);
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee record:", error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      const data = await axios.delete("/deleteAdmin/" + id);
      if (data.data.success) {
        getAdminData();
        alert(data.data.message);
      }
    } catch (error) {
      console.error("Error deleting admin record:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("/update", formDataEdit);
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
        setEditSection(false);
      }
    } catch (error) {
      console.error("Error updating employee record:", error);
    }
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`/updateAdmin/${formDataEditAdmin._id}`, formDataEditAdmin);
      if (data.data.success) {
        getAdminData();
        alert(data.data.message);
        setEditAdminSection(false);
      }
    } catch (error) {
      console.error("Error updating admin record:", error);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditOnChangeAdmin = (e) => {
    const { value, name } = e.target;
    setFormDataEditAdmin((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const handleEditAdmin = (el) => {
    setFormDataEditAdmin(el);
    setEditAdminSection(true);
  };

  return (
    <div className='container'>
      <button className='btn btn-add' onClick={() => setAddSection(true)}>Add Employee</button>
     
      {
        addSection && (
          <EmpDetailsForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )
      }
      {
        editSection && (
          <EmpDetailsForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )
      }
      {
        addAdminSection && (
          <EmpDetailsForm
            handleSubmit={handleSubmitAdmin}
            handleOnChange={handleOnChangeAdmin}
            handleclose={() => setAddAdminSection(false)}
            rest={formDataAdmin}
          />
        )
      }
      {
        editAdminSection && (
          <EmpDetailsForm
            handleSubmit={handleUpdateAdmin}
            handleOnChange={handleEditOnChangeAdmin}
            handleclose={() => setEditAdminSection(false)}
            rest={formDataEditAdmin}
          />
        )
      }
      <h2>Employee Records</h2>
      <div className='tableContainer'>
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.password}</td>
                  <td>
                    <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "7px", fontSize: 20 }}>No data found</td>
              </tr>
           
            )}
          </tbody>
        </table>
      </div>
      <button className='btn btn-add' onClick={() => setAddAdminSection(true)}>Add Admin</button>
      <h2>Admin Records</h2>
      <div className='tableContainer'>
      
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adminDataList.length > 0 ? (
              adminDataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.password}</td>
                  <td>
                    <button className='btn btn-edit' onClick={() => handleEditAdmin(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={() => handleDeleteAdmin(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "7px", fontSize: 20 }}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeRecords;
