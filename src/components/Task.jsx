import PropTypes from 'prop-types'
import "../style/Task.css";

export default Task;

Task.propTypes = {
  onDelete: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};


function Task({item, onDelete,increase,}) {

  let {current, tittle, goal, description, id} = item;
  
  let canInc = current < goal;

  function onCompleted() {
    if(canInc) {
      return (
        <button onClick={() => increase(id)} className="step">
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