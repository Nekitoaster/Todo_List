import PropTypes from "prop-types";
import "./Task.css";
import ThemeContext from "../../contexts/theme";
import { useContext } from "react";

export default Task;

Task.propTypes = {
  del: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

function Task({ item, del, increase }) {
  let theme = useContext(ThemeContext);
  let { current, tittle, goal, description, id } = item;

  let canInc = current < goal;

  // Настройка смены темы
  let blockLightTheme = theme === "light" ? "block_light" : "";
  let progressBarLightTheme = theme === "light" ? "progress-bar_light" : "";
  let progressLightTheme = theme === "light" ? "progress_light" : "";
  let stepLight = theme === "light" ? "step_light" : "";
  let delLight = theme === "light" ? "del_light" : "";

  // Проверка на выполнение поставленной задачи
  function onCompleted() {
    if (canInc) {
      return (
        <button onClick={() => increase(id)} className={`step ${stepLight}`}>
          Сделать шаг
        </button>
      );
    } else {
      return <h3 className="completed">Выполнено!</h3>;
    }
  }

  // Создание отдельного элемента Туду листа
  return (
    <div className={`block ${blockLightTheme}`}>
      <div className="body">
        <h2 className="tittle">{tittle}</h2>
        <p className="description">{description}</p>
        <div className={`progress-bar ${progressBarLightTheme}`}>
          <div
            className={`progress ${progressLightTheme}`}
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
      <button onClick={() => del(id)} className={`del ${delLight}`}>
        X
      </button>
    </div>
  );
}
