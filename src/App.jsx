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

  const newTask = () => {
    if (
      tittle.trim() !== "" &&
      description.trim() !== "" &&
      goal.trim() !== ""
    ) {
      const newItem = {
        id: uuidv4(),
        value: 0,
        tittle,
        description,
        goal,
        defaultPos: { x: 580, y: 100 },
      };
      setItems((items) => [...items, newItem]);
      setTittle("");
      setDescription("");
      setGoal("");
    } else {
      alert("Заполните все поля!");
    }
  };

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
            placeholder="Количество"
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <button className="enter" onClick={newTask}>
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
                updatePos={item.updatePos}
                defaultPos={item.defaultPos}
                id={item.id}
                tittle={item.tittle}
                description={item.description}
                goal={item.goal}
                value={item.value}
                onDelete={deleteTask}
              />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}
