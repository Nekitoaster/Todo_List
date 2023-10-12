import { useState, useEffect } from "react";
import "./style/App.css";
import Task from "./components/Task/Task";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";
import ThemeContext from "./contexts/theme";

export default App;

function App() {
  let [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );
  let [tittle, setTittle] = useState("");
  let [description, setDescription] = useState("");
  let [goal, setGoal] = useState("");
  let [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  //Настройка смены темы
  let textLight = theme === "light" ? "text_light" : "";
  let bcgLight = theme === "light" ? "bcg_light" : "";
  let enterLight = theme === "light" ? "enter_light" : "";
  let themeLight = theme === "light" ? "theme_light" : "";
  let inputLight = theme === "light" ? "input_light" : "";

  // Получение данных из хранилища и сохранение обратно
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [items, theme]);
  // Добавление нового элемента Туду листа
  const addTask = () => {
    if (
      tittle.trim() !== "" &&
      description.trim() !== "" &&
      goal.trim() !== "" &&
      100 >= goal &&
      goal > 0
    ) {
      const newTask = {
        id: uuidv4(),
        current: 0,
        tittle,
        description,
        goal: +goal,
        defaultPos: { x: 580, y: 100 },
      };
      setItems((items) => [...items, newTask]);
      setTittle("");
      setDescription("");
      setGoal("");
    } else {
      alert("Заполните все поля корректно!");
    }
  };

  // Увеличение текущего прогресса от цели
  function increaseItem(id) {
    setItems(
      items.map((item) =>
        item.id === id && item.current < item.goal
          ? {
              ...item,
              current: item.current + 1,
            }
          : item
      )
    );
  }

  // Удаление элемента Туду листа
  const deleteTask = (id) => {
    const newArr = [...items].filter((item) => item.id !== id);
    setItems(newArr);
  };

  // Обновление расположения каждого отдельного элемента
  const updatePos = (data, id) => {
    let newArr = [...items];
    newArr[id].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  function onDark() {
    setTheme("dark");
    console.log("Включена темная тема");
  }

  function onLight() {
    setTheme("light");
    console.log("Включена светлая тема");
  }

  function changeTheme() {
    if (theme === "dark") {
      return (
        <button className={`theme ${themeLight}`} onClick={() => onLight()}>
          Светлая тема
        </button>
      );
    } else {
      return (
        <button className={`theme ${themeLight}`} onClick={() => onDark()}>
          Темная тема
        </button>
      );
    }
  }

  return (
    // Форма для заполнения элемента Туду листа
    <ThemeContext.Provider value={theme}>
      <div className={`bcg ${bcgLight}`}>
        {changeTheme()}
        <h1 className={textLight}>TODO LIST</h1>
        <div className="interface">
          <div className="input__block">
            <input
              value={tittle}
              type="text"
              placeholder="Название"
              onChange={(e) => setTittle(e.target.value)}
              className={inputLight}
            />
            <input
              value={description}
              type="text"
              placeholder="Описание"
              onChange={(e) => setDescription(e.target.value)}
              className={inputLight}
            />
            <input
              value={goal}
              type="number"
              placeholder="Количество (Максимум 100)"
              onChange={(e) => setGoal(e.target.value)}
              className={inputLight}
            />
          </div>
          <button className={`enter ${enterLight}`} onClick={addTask}>
            Ввести
          </button>
        </div>

        {/* Вызов всех созданых элементов Туду листа */}
        {items.map((item, id) => {
          return (
            <Draggable
              key={item.id}
              onStop={(_, data) => {
                updatePos(data, id);
              }}
              defaultPosition={item.defaultPos}
            >
              <div>
                <Task item={item} del={deleteTask} increase={increaseItem} />
              </div>
            </Draggable>
          );
        })}
      </div>
    </ThemeContext.Provider>
  );
}
