import React from "react";

const ApiaryMenu = ({ selectHive }) => {
  return (
    <div className="apiaries">
      <div className="apiary">
        <p className="apiary-title">Apiary 1</p>

        <div>
          <p id="1-1" onClick={selectHive}>
            Hive 1
          </p>
          <p id="1-2" onClick={selectHive}>
            Hive 2
          </p>
          <p id="1-3" onClick={selectHive}>
            Hive 3
          </p>
        </div>
      </div>

      <div className="apiary">
        <p className="apiary-title">Apiary 2</p>

        <div>
          <p id="2-1" onClick={selectHive}>
            Hive 1
          </p>
        </div>
      </div>

      <div className="apiary">
        <p className="apiary-title">Apiary 3</p>

        <div>
          <p id="3-1" onClick={selectHive}>
            Hive 1
          </p>
          <p id="3-2" onClick={selectHive}>
            Hive 2
          </p>
        </div>
      </div>

      <div className="apiary">
        <p className="apiary-title">Apiary 4</p>

        <div>
          <p id="4-1" onClick={selectHive}>
            Hive 1
          </p>
          <p id="4-2" onClick={selectHive}>
            Hive 2
          </p>
          <p id="4-3" onClick={selectHive}>
            Hive 3
          </p>
          <p id="4-4" onClick={selectHive}>
            Hive 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiaryMenu;
