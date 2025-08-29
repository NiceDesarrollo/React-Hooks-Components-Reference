import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";


export const Debounce = () => {
 const [count, setCount] = useState(10);
 useDebounce(() => alert(count), 1000, [count]);

 return (
   <div className="todo-display">
     <h2>Debounce 1 second alert</h2>
     <div>{count}</div>
     <button className="increment-btn" onClick={() => setCount((c) => c + 1)}>
       Increment
     </button>
   </div>
 );
};

export default Debounce;