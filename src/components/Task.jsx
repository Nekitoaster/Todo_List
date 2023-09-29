import { useState } from "react";
import "../style/Task.css";

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

  function increase() {
    if (canInc) {
      let newValue = current + 1;
      setCurrent(newValue);
    }
  }

  function onCompleted() {
    if(canInc) {
      return (
        <button onClick={increase} className="step">
          Сделать шаг
        </button>
      );
    } else {
      return(
          <h3 className='completed'>Выполнено!</h3>
        )
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
              width: (100 / goal) * current + "%",
              opacity: "width 0,9s",
            }}
          ></div>
        </div>
        <strong>
          {current}/{goal}
        </strong>
        {onCompleted()}
      </div>
      <button onClick={() => onDelete(id)} className="del">
        X
      </button>
    </div>
  );
}