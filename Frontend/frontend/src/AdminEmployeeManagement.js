import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useAuth } from "./AuthContex";

export default function AdminEmployeeManagement() {
  const { registerEmployee } = useAuth();
  const [employees, setEmployees] = useState(null);
  const [workers, setWorkers] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [addEmployeeForm, setAddEmployeeForm] = useState({
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8080/api/user/employees"
        );
        const workersS = [];
        const driversS = [];
        for (var i = 0; i < resp.data.length; i++) {
          if (resp.data[i].role === "worker") {
            workersS.push(resp.data[i]);
          } else {
            driversS.push(resp.data[i]);
          }
        }
        setWorkers(workersS);
        setDrivers(driversS);
        setEmployees(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployees();
  }, []);
  const handleAddEmployee = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addEmployeeForm };
    newFormData[fieldName] = fieldValue;
    setAddEmployeeForm(newFormData);
  };
  async function handleAddEmployeeFormSubmit(event) {
    event.preventDefault();
    try {
      await registerEmployee(
        addEmployeeForm.email,
        addEmployeeForm.password,
        addEmployeeForm.role.toLowerCase()
      );
    } catch {
      //error
      console.log("Eroare la creare employee");
    }
    alert("Employee successfully created");
    window.location.reload();
  }
  if (workers === null || drivers === null) {
    return <div>No workers yet</div>;
  }
  return (
    <div>
      <AdminNavbar />
      <h1>DRIVERS</h1>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, key) => (
            <tr>
              <td>{key + 1}</td>
              <td>{driver.id}</td>
              <td>{driver.email}</td>
              <td>{driver.role}</td>
              <td>
                <button>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>Total number of drivers: {drivers.length}</tfoot>
      </table>
      <h1>WORKERS</h1>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, key) => (
            <tr>
              <td>{key + 1}</td>
              <td>{worker.id}</td>
              <td>{worker.email}</td>
              <td>{worker.role}</td>
              <td>
                <button>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>Total number of workers: {workers.length}</tfoot>
      </table>
      <br></br>
      <h1>ADD EMPLOYEE</h1>
      <form className="row g-3" onSubmit={handleAddEmployeeFormSubmit}>
        <div className="col-md-3">
          <label for="validationDefault01" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="validationDefault01"
            required
            onChange={handleAddEmployee}
          />
        </div>
        <div className="col-md-3">
          <label for="validationDefault02" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="validationDefault02"
            required
            onChange={handleAddEmployee}
          />
        </div>
        <div className="col-md-3">
          <label for="validationDefault03" className="form-label">
            Role
          </label>
          <select
            name="role"
            className="form-select"
            id="validationDefault03"
            required
            onChange={handleAddEmployee}
          >
            <option selected disabled value="">
              Choose...
            </option>
            <option>DRIVER</option>
            <option>WORKER</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">ADD</button>
        </div>
      </form>
    </div>
  );
}
