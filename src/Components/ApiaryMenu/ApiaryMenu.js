import React, { useState, useEffect, Fragment } from "react";
import Fetch from "../../Settings/Fetch";
import closeIcon from "../../Assets/closeRed.svg";
import refreshIcon from "../../Assets/refresh.svg";
import refreshColorfulIcon from "../../Assets/refresh_colorful.svg";
import "./ApiaryMenu.css";

const ApiaryMenu = ({ selectHive }) => {
  const getApHv = sessionStorage.getItem("hives_id");
  const token =
    JSON.parse(sessionStorage.getItem("token")) ||
    JSON.parse(localStorage.getItem("token"));

  const [apiaries, setApiaries] = useState(undefined);
  const [apiaryHive, setApiaryHive] = useState([]);
  const [pending, setPending] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [errors, setErrors] = useState(undefined);

  const updateApiaries = (hivesId) => {
    const apiariesArray = [];
    const apiaryHivesArray = [];

    if (hivesId !== "null") {
      hivesId?.split(";").forEach(async (hiveID) => {
        if (hiveID !== "") {
          await Fetch("/get-user-data", "post", {
            userName: token?.userName,
            email: token?.email,
            id: hiveID,
            getHivesId: false,
          })
            .then((data) => {
              data = data[0];
              if (data !== "error") {
                apiaryHivesArray.push(
                  `${data.apiary_number}-${data.hive_id}-${data.hive_number}`
                );
                if (
                  !apiariesArray.includes(data.apiary_number) &&
                  data.apiary_number !== ""
                ) {
                  apiariesArray.push(data.apiary_number);
                }
              }
            })
            .catch(() => {
              console.log("updateApiariesError");
            });
        }
      });

      setApiaries(apiariesArray.sort());
      setApiaryHive(apiaryHivesArray);
    }
  };

  const updateHivesInfo = () => {
    Fetch("/get-user-data", "post", {
      userName: token?.userName,
      email: token?.email,
      getHivesId: true,
    })
      .then((info) => {
        const data = info[0].hives_id;

        sessionStorage.setItem("hives_id", data);
        if (data === "") {
          setEmpty(true);
        } else {
          setEmpty(false);
          updateApiaries(data);
        }

        return data;
      })
      .catch(() => false);
  };

  const clearInputValues = () => {
    document.getElementById("hive-id").value = "";
    document.getElementById("apiary-input").value = "";
    document.getElementById("hive-input").value = "";
  };

  const addHive = () => {
    setPending(true);
    setErrors(undefined);
    const id = document.getElementById("hive-id").value;
    const ap = document.getElementById("apiary-input").value;
    const hv = document.getElementById("hive-input").value;
    clearInputValues();

    Fetch("/add-hives", "put", {
      userName: token?.userName,
      email: token?.email,
      IdApHv: `${id}-${ap}-${hv}`,
      add: true,
    })
      .then((data) => {
        if (data === "Successfuly added") {
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
      IdApHv: data,
      add: false,
    })
      .then((data) => {
        if (data === "Successfuly removed") {
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
    setEmpty(true);
    updateHivesInfo();
  }, [getApHv, pending]);

  return (
    <div className="apiaries">
      {apiaries?.length === 0 && !empty ? (
        <img
          alt=""
          className="rotating-refresh loadingPage"
          src={refreshColorfulIcon}
          width="75px"
        />
      ) : (
        <Fragment />
      )}
      {apiaries?.map((apiary) => {
        return (
          <div className="apiary">
            <p className="apiary-title">Apiary {apiary}</p>

            <div>
              {getApHv
                .split(";")
                .sort()
                .map((item) => {
                  let check = false;
                  let hvNumber;
                  apiaryHive.forEach((apiary_hive) => {
                    const hvId = apiary_hive.split("-")[1];
                    const apNumber = Number(apiary_hive.split("-")[0]);

                    if (item === hvId && apiary === apNumber) {
                      hvNumber = apiary_hive.split("-")[2];
                      check = true;
                    }
                  });

                  if (check) {
                    return (
                      <div className="hive-container">
                        <p id={item} onClick={selectHive}>
                          Hive {hvNumber}
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
        <input id="hive-id" type="number" placeholder="Hive ID"></input>
        <input
          id="apiary-input"
          type="number"
          placeholder="Apiary number"
        ></input>
        <input id="hive-input" type="number" placeholder="Hive number"></input>

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
          <span className="error-msg">{errors}</span>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};

export default ApiaryMenu;
