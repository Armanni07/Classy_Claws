import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";

import "./Display.scss";
import { DisplayType } from "./Types";
import { www } from "../../../Utils/URLS/Urls";
import Photo from "../../../Assets/CC-Logo-Light.png";
import { server } from "../../../Utils/Server/Server";
import { Input } from "../../../Components/Inputs/Input";
import { method } from "../../../Utils/Functions/Functions";
import { EmployeesInput } from "../../../Utils/Objects/InputObjects";
import { RegisterType } from "../../../Utils/Types/AuthContextTypes";

export const EmployeeDisplay = <T extends RegisterType>({
  index,
  display,
  setDisplay,
}: DisplayType<T>) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [updateEmployee, setupdateEmployee] = useState<RegisterType>({
    id: 0,
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Phone_No: 0,
    Location: "",
    Designation: "",
    Photo: "",
    Employer: "",
  });

  const [employee, setEmployee] = useState<RegisterType>({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Phone_No: 0,
    Location: "",
    Designation: "",
    Photo: undefined,
    Employer: "",
  });

  const { EmployeeUpdate } = EmployeesInput(updateEmployee);

  const HandleGet = async () => {
    const response = await server.get(
      `${www.admin.get_employee}/${display.id}`
    );
    console.log(response);

    setEmployee(response[0]);
    setupdateEmployee(response[0]);
  };

  const SendData = async (Base64Image: string) => {
    const userData = Base64Image
      ? {
          ...updateEmployee,
          Photo: Base64Image,
        }
      : updateEmployee;

    server.put(`${www.users.put}/${display.id}`, userData);
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let Base64Image = "";

    if (updateEmployee.Photo) {
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        Base64Image = reader.result as string;
        SendData(Base64Image);
      };

      reader.readAsDataURL(updateEmployee.Photo as Blob);
    } else {
      SendData("");
    }
  };

  useEffect(() => {
    HandleGet();
  }, [display.id]);

  return (
    <div className="display">
      <div className="display-container">
        <span className="display-left">
          <img className="display-image" src={display.Photo as string} alt="" />
        </span>

        <span className="display-right">
          <span>
            <img src={Photo} alt="" />

            <MdClose
              size={35}
              color="#ff0000"
              onClick={() => method.ArrayClick({ index, setClick: setDisplay })}
            />
          </span>

          <h4>Firstname {employee.Firstname}</h4>
          <h4>Lastname: {employee.Lastname}</h4>
          <h4>Email: {employee.Email}</h4>
          <h4>Phone Number: {employee.Phone_No}</h4>
          <h4> Location: {employee.Location}</h4>
          <h4>Designation:{employee.Designation}</h4>
          <h4>Employer:{employee.Employer}</h4>

          <span>
            <FaPen
              size={20}
              onClick={() => method.click({ click: edit, setClick: setEdit })}
            />
            <MdDelete color="#ff0000" size={30} />
          </span>
        </span>

        {edit && (
          <div className="update-users">
            <form>
              <span className="close">
                <MdClose
                  size={30}
                  onClick={() =>
                    method.click({
                      click: edit,
                      setClick: setEdit,
                    })
                  }
                />

                <h2>Edit</h2>
              </span>

              <span>
                {<Input input={EmployeeUpdate} setInput={setupdateEmployee} />}
              </span>

              <button onClick={HandleSubmit}>Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
