import '../inputs.scss';
import "./style.scss";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TFunction } from "next-i18next";
import WhitePanel from "../../../Layout elements/WhitePanel";
import EmployeeRegisterForm from "./EmployeeRegisterForm";
import EmployerRegisterForm from "./EmployerRegisterForm";
export default function RegisterForm({ t }: { readonly t: TFunction }) {
  type Tab = "employer" | "employee";
  const [activeTab, setTab] = useState<Tab>("employee");
  let componentToRender: React.ReactNode;
  switch (activeTab) {
    case "employer":
      componentToRender = <EmployerRegisterForm t={t}/>;
      break;
    case "employee":
      componentToRender = <EmployeeRegisterForm t={t}/>;
  }
  return (
    <div className="register__form">
      <WhitePanel width={100} padding={0}>
        <div className="register__form__inner">
          <div className="tab__group">
            {/* <li className={`tab ${activeTab==="employer" &&"tab_active"}`}>
              <button onClick={() => setTab("employer")}>Employer</button>
            </li>
            <li className={`tab ${activeTab==="employee" &&"tab_active"}`}>
              <button onClick={() => setTab("employee")}>Employee</button>
            </li> */}
            <fieldset>
             
                <input
                  type="radio"
                  checked={activeTab === "employer" && true}
                  id="set-employer"
                  onClick={() => setTab("employer")}
                />
                <label
                  htmlFor="set-employer"
                  className={`${activeTab === "employer" ? "tab-toggled" : ""}`}
                >
                  Працедавець
                </label>
             
            
                <input
                  type="radio"
                  checked={activeTab === "employee" && true}
                  id="set-employee"
                  onClick={() => setTab("employee")}
                />
                <label
                  htmlFor="set-employee"
                  className={`${activeTab === "employee" ? "tab-toggled" : ""}`}
                >
                 Працівник
                </label>  
              <span className="switch"></span>
            </fieldset>
          </div>
          <div className="tab__items">
          {componentToRender}
          </div>        
        </div>
      </WhitePanel>
    </div>
  );
}
