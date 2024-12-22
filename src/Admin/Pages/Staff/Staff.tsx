import { MdClose } from "react-icons/md";
import React, { useEffect, useState } from "react";

import "./Staff.scss";
import { www } from "../../../Utils/URLS/Urls";
import { server } from "../../../Utils/Server/Server";
import { Input } from "../../../Components/Inputs/Input";
import { method } from "../../../Utils/Functions/Functions";
import { RegisterType } from "../../../Utils/Types/AuthContextTypes";
import { EmployeesInput } from "../../../Utils/Objects/InputObjects";
import { EmployeeDisplay } from "../../Components/Display/EmployeeDisplay";

export const Staff = () => {
  const [formClick, setFormClick] = useState<boolean>(false);

  const [employee, setEmployee] = useState<RegisterType[]>([
    {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      Phone_No: 0,
      Location: "",
      Designation: "",
      Photo: undefined,
      Employer: "",
    },
  ]);

  const [employeeClick, setemployeeClick] = useState<boolean[]>(
    Array.from({ length: employee.length }, () => false)
  );

  const [employeeForm, setemployeeForm] = useState<RegisterType>({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Phone_No: 0,
    Location: "",
    Designation: "",
    Photo: "",
  });

  const { EmployeeInput } = EmployeesInput();

  const handleGet = async () => {
    try {
      const response = await server.get(www.admin.get_employee);

      console.log(response);
      setEmployee(response);
    } catch (error) {
      console.log(error);
    }
  };

  const SendData = (image: string) => {
    const UserData = {
      ...employeeForm,
      Photo: image,
    };

    server.post(www.employees.register, UserData);
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let Base64Image = "";
    try {
      if (employeeForm.Photo) {
        const reader = new FileReader();

        reader.onloadend = () => {
          Base64Image = reader.result as string;
          SendData(Base64Image);
        };

        reader.readAsDataURL(employeeForm.Photo as Blob);
      } else {
        SendData("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="admin-employees">
      <span>
        <h2>Staff</h2>

        <button
          onClick={() =>
            method.click({ click: formClick, setClick: setFormClick })
          }
        >
          +New Employee
        </button>
      </span>

      <div className="employees-container">
        {employee.map((employee, i: number) => (
          <div key={i} className="employee-info">
            <img
              src={employee.Photo as string}
              alt="No Photo"
              onClick={() =>
                method.ArrayClick({ index: i, setClick: setemployeeClick })
              }
            />

            <span className="employee-preview">
              <h3>{employee.Firstname}</h3>
              <h3>{employee.Location}</h3>
            </span>

            {employeeClick[i] && (
              <EmployeeDisplay
                index={i}
                display={employee}
                setDisplay={setemployeeClick}
              />
            )}
          </div>
        ))}
      </div>

      {formClick && (
        <div className="employee-form">
          <form>
            <span>
              <h3>New Employee</h3>

              <MdClose
                onClick={() =>
                  method.click({ click: formClick, setClick: setFormClick })
                }
              />
            </span>

            {employeeForm.Photo && <img src={employeeForm.Photo as string} />}

            <Input input={EmployeeInput} setInput={setemployeeForm} />

            <div>
              <button type="submit" onClick={(e) => HandleSubmit(e)}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
