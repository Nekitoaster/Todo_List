import { useState } from "react";
import "../Task.css";

export default Task;

function Task({
  value,
  tittle,
  goal,
  description,
  onDelete,
  id
}) {

  let [current, setCurrent] = useState(value);
  let canInc = current < goal;
  value = current;

  function increase() {
    if (canInc) {
      let newValue = value + 1;
      setCurrent(newValue);
    }
  }

  return (
    <div className="block">
      <div className="body">
        <h2 className="tittle">{tittle}</h2>
        <p className="description">{description}</p>
        <div className="progress_bar">
          <div
            className="black"
            style={{
              width: (100 / goal) * value + "%",
              opacity: "width 0,9s",
            }}
          ></div>
        </div>
        <strong>
          {value}/{goal}
        </strong>
        <button onClick={increase} className="step" disabled={!canInc}>
          Сделать шаг
        </button>
      </div>
      <button onClick={() => onDelete(id)} className="del">
        X
      </button>
    </div>
  );
}