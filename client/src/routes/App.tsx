import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../features/app/store'
import { increment, decrement } from '../features/counter/Counter';

function App() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
    <>
        <button onClick={() => dispatch(decrement())}>-</button>
        <h1>Counter: {count}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
    </>
  )
}

export default App
