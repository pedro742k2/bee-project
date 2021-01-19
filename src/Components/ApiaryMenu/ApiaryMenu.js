import React from "react";

const ApiaryMenu = () => {
  return (
    <div className="apiaries">
      <div className="apiary">
        <p className="apiary-title">Apiary 1</p>

        <div>
          <p>Hive 1</p>
          <p>Hive 2</p>
          <p className="selected">Hive 3</p>
        </div>
      </div>

      <div className="apiary">
        <p className="apiary-title">Apiary 2</p>

        <div>
          <p>Hive 1</p>
        </div>
      </div>

      <div className="apiary">
        <p className="apiary-title">Apiary 3</p>

        <div>
          <p>Hive 1</p>
          <p className="selected">Hive 2</p>
        </div>
      </div>

      <div className="apiary">
        <p className="apiary-title">Apiary 4</p>

        <div>
          <p>Hive 1</p>
          <p>Hive 2</p>
          <p>Hive 3</p>
          <p>Hive 4</p>
        </div>
      </div>
    </div>
  );
};

export default ApiaryMenu;
