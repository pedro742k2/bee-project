import React, { useState, useEffect, Fragment } from "react";
import Fetch from "../../Settings/Fetch";
import closeIcon from "../../Assets/closeRed.svg";
import refreshIcon from "../../Assets/refresh.svg";
import "./ApiaryMenu.css";

const ApiaryMenu = ({ selectHive }) => {
  const getApHv = sessionStorage.getItem("ApHv");
  const token =
    JSON.parse(sessionStorage.getItem("token")) ||
    JSON.parse(localStorage.getItem("token"));

  const [apiaries, setApiaries] = useState(undefined);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState(undefined);

  const updateApiaries = () => {
    const apiariesArray = [];

    if (getApHv !== "null") {
      getApHv?.split(";").forEach((data) => {
        if (data !== "")
          if (!apiariesArray.includes(data[0])) {
            apiariesArray.push(data[0]);
          }
      });
      setApiaries(apiariesArray.sort());
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
    setPending(true);
    setErrors(undefined);
    const ap = document.getElementById("apiary-input").value;
    const hv = document.getElementById("hive-input").value;

    Fetch("/add-hives", "put", {
      userName: token?.userName,
      email: token?.email,
      ApHv: `${ap}-${hv}`,
      add: true,
    })
      .then((data) => {
        if (data === "Successfuly updated") {
          setErrors(undefined);
        } else {
          setErrors(data);
        }
        setPending(false);
      })
      .catch(() => {
        setErrors("Server error");
        setPending(false);
      });
  };

  const removeApiary = (event) => {
    setPending(true);
    setErrors(undefined);
    const data = event?.target?.id.split("!")[1];

    Fetch("/add-hives", "put", {
      userName: token?.userName,
      email: token?.email,
      ApHv: data,
      add: false,
    })
      .then((data) => {
        if (data === "Successfuly updated") {
          setErrors(undefined);
        } else {
          setErrors(data);
        }
        setPending(false);
      })
      .catch(() => {
        setErrors("Server error");
        setPending(false);
      });
  };

  useEffect(() => {
    updateHivesInfo();
  }, [getApHv, pending]);

  return (
    <div className="apiaries">
      {apiaries?.map((apiary) => {
        return (
          <div className="apiary">
            <p className="apiary-title">Apiary {apiary}</p>

            <div>
              {getApHv
                .split(";")
                .sort()
                .map((item) => {
                  const check = item[0] === apiary;
                  if (check) {
                    return (
                      <div className="hive-container">
                        <p id={item} onClick={selectHive}>
                          Hive {item[2]}
                        </p>
                        <img
                          id={`rm!${item}`}
                          onClick={removeApiary}
                          alt=""
                          src={closeIcon}
                        />
                      </div>
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
        <h3>
          {pending ? (
            <img
              alt=""
              className="rotating-refresh"
              src={refreshIcon}
              width="50px"
            />
          ) : (
            ""
          )}
        </h3>

        {errors !== undefined ? (
          <span class="error-msg">{errors}</span>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};

export default ApiaryMenu;
