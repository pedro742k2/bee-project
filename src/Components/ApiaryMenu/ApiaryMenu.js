import React, { useState, useEffect } from "react";
import ServerApi from "../../Settings/ServerApi";
import "./ApiaryMenu.css";

const ApiaryMenu = ({ selectHive }) => {
  const getApHv = sessionStorage.getItem("ApHv");
  const token =
    JSON.parse(sessionStorage.getItem("token")) ||
    JSON.parse(localStorage.getItem("token"));

  const [apiaries, setApiaries] = useState(undefined);

  const updateApiaries = () => {
    const apiariesArray = [];

    getApHv?.split(";").forEach((data) => {
      if (data !== "")
        if (!apiariesArray.includes(data[0])) {
          apiariesArray.push(data[0]);
        }
    });

    setApiaries(apiariesArray);
  };

  const updateHivesInfo = () => {
    fetch(`${ServerApi}/get-user-data`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: token?.userName,
        email: token?.email,
      }),
    })
      .then((response) => response.json())
      .then((info) => {
        const data = info[0].ap_hv;

        sessionStorage.setItem("ApHv", data);
        updateApiaries();
        return data;
      })
      .catch(() => false);
  };

  const addHive = async () => {
    const ap = document.getElementById("apiary-input").value;
    const hv = document.getElementById("hive-input").value;

    const response = await fetch(`${ServerApi}/add-hives`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: token?.userName,
        email: token?.email,
        ApHv: `${ap}-${hv}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch(() => false);

    console.log(response);
  };

  useEffect(() => {
    updateHivesInfo();
  }, [getApHv, token]);

  return (
    <div className="apiaries">
      {apiaries?.map((apiary) => {
        return (
          <div className="apiary">
            <p className="apiary-title">Apiary {apiary}</p>

            <div>
              {getApHv.split(";").map((item) => {
                const check = item[0] === apiary;

                if (check) {
                  return (
                    <p id={item} onClick={selectHive}>
                      Hive {item[2]}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        );
      })}

      <div className="add-aphv-container">
        <h3>Add hive</h3>
        <input
          id="apiary-input"
          type="number"
          placeholder="Apiary number"
        ></input>
        <input id="hive-input" type="number" placeholder="Hive number"></input>

        <button onClick={addHive}>Add</button>
      </div>
    </div>
  );
};

export default ApiaryMenu;
