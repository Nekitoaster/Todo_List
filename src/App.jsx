import { useState, useEffect } from "react";
import "./style/App.css";
import Task from "./components/Task";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";

export default App;

function App() {
  let [tittle, setTittle] = useState("");
  let [description, setDescription] = useState("");
  let [goal, setGoal] = useState("");
  let [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

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

  const deleteTask = (id) => {
    const newArr = [...items].filter((item) => item.id !== id);
    setItems(newArr);
  };

  const updatePos = (data, id) => {
    let newArr = [...items];
    newArr[id].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <div className="interface">
        <div className="input__block">
          <input
            value={tittle}
            type="text"
            placeholder="Название"
            onChange={(e) => setTittle(e.target.value)}
          />
          <input
            value={description}
            type="text"
            placeholder="Описание"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            value={goal}
            type="number"
            placeholder="Количество (Максимум 100)"
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <button className="enter" onClick={addTask}>
          Ввести
        </button>
      </div>

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
              <Task
                item={item}
                del={deleteTask}
                increase={increaseItem}
              />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}
