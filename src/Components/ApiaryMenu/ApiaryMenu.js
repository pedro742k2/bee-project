import React, { useState, useEffect } from "react";
import Fetch from "../../Settings/Fetch";
import "./ApiaryMenu.css";

const ApiaryMenu = ({ selectHive }) => {
  const getApHv = sessionStorage.getItem("ApHv");
  const token =
    JSON.parse(sessionStorage.getItem("token")) ||
    JSON.parse(localStorage.getItem("token"));

  const [apiaries, setApiaries] = useState(undefined);

  const updateApiaries = () => {
    const apiariesArray = [];

    if (getApHv !== "null") {
      getApHv?.split(";").forEach((data) => {
        if (data !== "")
          if (!apiariesArray.includes(data[0])) {
            apiariesArray.push(data[0]);
          }
      });
      setApiaries(apiariesArray);
    }
  };

  const updateHivesInfo = async () => {
    Fetch("/get-user-data", "post", {
      userName: token?.userName,
      email: token?.email,
    })
      .then((info) => {
        const data = info[0].ap_hv;

        sessionStorage.setItem("ApHv", data);
        updateApiaries();
        return data;
      })
      .catch(() => false);
  };

  const addHive = () => {
    const ap = document.getElementById("apiary-input").value;
    const hv = document.getElementById("hive-input").value;

    Fetch("/add-hives", "put", {
      userName: token?.userName,
      email: token?.email,
      ApHv: `${ap}-${hv}`,
    })
      .then(console.log)
      .catch(console.log);
  };

  useEffect(() => {
    updateHivesInfo();
  }, [getApHv]);

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
        <input id="apiary-input" type="number" placeholder="Apiary id"></input>
        <input id="hive-input" type="number" placeholder="Hive id"></input>

        <button onClick={addHive}>Add</button>
      </div>
    </div>
  );
};

export default ApiaryMenu;
