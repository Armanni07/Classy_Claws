import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import "./Input.scss";
import { InputProps } from "./Types";
import { method } from "../../Utils/Functions/Functions";

export const Input = <T,>({ input, options, setInput }: InputProps<T>) => {
  const { pathname } = useLocation();

  return (
    <div className={`${pathname.includes("/admin") ? "grid-input" : "input"}`}>
      {input.map((product, i) =>
        !product.name.includes("yId") ? (
          <div key={i}>
            {product.type === "file" && (
              <label htmlFor={product.id} style={{alignItems:"Center", display: "flex" ,flexDirection:"column"}}>
                <FaUserCircle size={45} color="#fff" />
                <h4> Upload {product.name}</h4>
              </label>
            )}

            <input
              id={product.id}
              type={product.type}
              name={product.name}
              value={product.value}
              placeholder={product.placeHolder}
              style={{ display: product.type === "file" ? "none" : "" }}
              onChange={(e) => method.input({ e, setInputs: setInput })}
            />
          </div>
        ) : (
          <select
            key={i}
            name="CategoryId"
            value={product.value}
            onChange={(e) => method.select({ e, setInputs: setInput })}
          >
            <option value="">Select</option>

            {options?.map((option, j) => (
              <option key={j} value={option.id}>
                {option.Name}
              </option>
            ))}
          </select>
        )
      )}
    </div>
  );
};
