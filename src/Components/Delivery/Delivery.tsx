import { FormEvent } from "react";

import "./Delivery.scss";
import { www } from "../../Utils/URLS/Urls";
import { server } from "../../Utils/Server/Server";

export const Delivery = () => {
  const SendData = async (e: FormEvent) => {
    e.preventDefault();

    await server.put(www.sales.put, { Status: "" });
  };
  
  return (
    <div className="delivery">
      <span className="delivery-container">
        <h3>
          We are currently working on delivering your order. You will receive a
          Phone Call once your order is Delivered.
        </h3>

        <div className="delivery-animation">
          <div className="loading"></div>
        </div>

        <button className="received" onClick={(e) => SendData(e)}>
          Received
        </button>
      </span>
    </div>
  );
};
