import { useReducer } from "react";

class DateState {
  constructor() {
    this.count = 0;
    this.step = 1;
  }
};

const dateStateReducer = (state, action) => {
  const { type: actionType, payload } = action;
  switch (actionType) {
    case "INCREMENT_COUNT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT_COUNT":
      return { ...state, count: state.count - state.step };
    case "DEFINE_COUNT":
      return { ...state, count: payload };
    case "DEFINE_STEP":
      return { ...state, step: payload };
    case "RESET":
      return { count: 0, step: 1 }
    default:
      return state;
  }
}

function DateCounter() {
  const [dateState, dispatch] = useReducer(dateStateReducer, new DateState())

  const { count, step } = dateState;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "DECREMENT_COUNT" })
  };

  const inc = function () {
    dispatch({ type: "INCREMENT_COUNT" })
  };

  const defineCount = function (e) {
    dispatch({ type: "DEFINE_COUNT", payload: Number(e.target.value) })
  };

  const defineStep = function (e) {
    dispatch({ type: "DEFINE_STEP", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
