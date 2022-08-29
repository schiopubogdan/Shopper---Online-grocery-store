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
  const handleDeleteClick = (userId) => {
    axios
      .delete(`http://localhost:8080/api/user?id=${userId}`)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Employee deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Employee account was successfully deleted.");
    window.location.reload();
  };
  if (workers === null || drivers === null) {
    return <div>No workers yet</div>;
  }
  return (
    <div>
      <AdminNavbar />
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              DRIVERS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-body">
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
                        <button onClick={() => handleDeleteClick(driver.id)}>
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>Total number of drivers: {drivers.length}</tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              WORKERS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div class="accordion-body">
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
                        <button onClick={() => handleDeleteClick(worker.id)}>
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>Total number of workers: {workers.length}</tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

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
