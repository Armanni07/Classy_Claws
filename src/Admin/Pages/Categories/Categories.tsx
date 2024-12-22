import { useEffect, useState } from "react";

import "./Categories.scss";
import { MdClose } from "react-icons/md";
import { www } from "../../../Utils/URLS/Urls";
import { CategoryFormType, CategoryType } from "./CategoryTypes";
import { server } from "../../../Utils/Server/Server";
import { method } from "../../../Utils/Functions/Functions";
import { FaPen } from "react-icons/fa";

// import { AdminProductType } from "../../../Utils/Types/ObjectTypes";
// import { ProductData } from "../../../Utils/Objects/DashboardObjects";

export const AdminCategories = () => {
  const [formClick, setFormClick] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([
    {
      Name: "",
      Description: "",
      Created_By: "",
      Updated_By: "",
      Date_Created: 0,
      Date_Updated: 0,
    },
  ]);

  const [categoryForm, setCategoryForm] = useState<CategoryFormType>({
    name: "",
    description: "",
  });

  const handleGet = async () => {
    try {
      const response = await server.get(www.categories.get)
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, [categories.length]);

  return (
    <div className="admin-categories">
      <span>
        <h2>Categories</h2>

        <button
          onClick={() =>
            method.click({ click: formClick, setClick: setFormClick })
          }
        >
          +New Category
        </button>
      </span>

      <div className="admin-categories-container">
        <div className="admin-categories-list">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Date Created</th>
                <th>Updated By</th>
                <th>Date Updated</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category, i: number) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{category.Name}</td>
                  <td>{category.Description}</td>
                  <td>{category.Created_By}</td>
                  <td>{category.Date_Created}</td>
                  <td>{category.Updated_By || "Null"}</td>
                  <td>{category.Date_Updated || "Null"}</td>
                  <td>
                    <FaPen />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {formClick && (
          <div className="admin-category-form">
            <h3>Add New Category</h3>

            <form>
              <MdClose
                onClick={() =>
                  method.click({ click: formClick, setClick: setFormClick })
                }
              />

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={(e) =>
                    method.input({ e: e, setInputs: setCategoryForm })
                  }
                />
              </div>

              <div>
                <input
                  name="description"
                  placeholder="Description"
                  onChange={(e) =>
                    method.input({ e: e, setInputs: setCategoryForm })
                  }
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={() => server.post(www.categories.post, categoryForm)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
