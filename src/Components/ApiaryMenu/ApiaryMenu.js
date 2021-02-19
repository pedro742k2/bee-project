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

  const updateApiaries = (hivesInfo) => {
    const apiariesArray = [];

    hivesInfo?.forEach((hiveID) => {
      const apiaryNumber = hiveID.split("-")[1];
      if (!apiariesArray.includes(apiaryNumber)) {
        apiariesArray.push(apiaryNumber);
      }
    });

    setApiaryHive(hivesInfo);
    setApiaries(apiariesArray.sort());
    setPending(false);
  };

  const clearInputValues = () => {
    document.getElementById("hive-id").value = "";
    document.getElementById("apiary-input").value = "";
    document.getElementById("hive-input").value = "";
  };

  const removeErrors = () => {
    setTimeout(() => {
      try {
        setErrors(undefined);
      } catch {
        console.warn(
          "Tried to clear errors, but looks like the page was unmounted"
        );
      }
    }, 7000);
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
        if (data === "Successfully updated" || data === "Successfully added") {
          setErrors(undefined);
        } else {
          setErrors(data);
          removeErrors();
        }
      })
      .catch(() => {
        setErrors("Server error");
        removeErrors();
      });

    setPending(false);
  };

  const removeApiary = (event) => {
    setPending(true);
    setErrors(undefined);
    const data = event?.target?.id.split("!")[1].split(",")[0];

    Fetch("/add-hives", "put", {
      userName: token?.userName,
      email: token?.email,
      IdApHv: data,
      add: false,
    })
      .then((data) => {
        if (data === "Successfully removed") {
          setErrors(undefined);
        } else {
          setErrors(data);
          removeErrors();
        }
      })
      .catch(() => {
        setErrors("Server error");
        removeErrors();
      });

    setPending(false);
  };

  useEffect(() => {
    console.log("useEffect");
    setPending(true);

    Fetch("/get-user-data", "post", {
      userName: token?.userName,
      email: token?.email,
    })
      .then((info) => {
        let firstCount = true;

        let hivesId = "";
        let hivesAllInfo = [];

        info?.forEach((item) => {
          if (!firstCount) {
            hivesId += ", ";
          }

          hivesId += item.hive_id;
          hivesAllInfo.push(
            `${item.hive_id}-${item.apiary_number}-${item.hive_number}`
          );
          firstCount = false;
        });

        sessionStorage.setItem("hives_id", hivesId);
        if (info.length === 0) {
          setEmpty(true);
          setPending(false);
        } else {
          setEmpty(false);
          updateApiaries(hivesAllInfo);
        }
      })
      .catch(() => false);
  }, [getApHv]);

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
      {apiaries?.sort().map((apiary) => {
        return (
          <div className="apiary">
            <p className="apiary-title">Apiary {apiary}</p>

            <div>
              {apiaryHive.sort().map((item) => {
                item = item.split("-");

                const check = item[1] === apiary;

                if (check) {
                  return (
                    <div className="hive-container">
                      <p id={item[0]} onClick={selectHive}>
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
                } else {
                  return null;
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
