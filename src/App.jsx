/* import UserList from './components/user-list/UserList';

const App = () => <UserList />;

export default App;
 */

import { useState } from "react";

const App = () => {
    const { value, setValue, step, setStep, ticks, setTicks } = useCounter();

    const handleIncrease = () => {
        setValue(value + step)
        setTicks(ticks + 1)
    }

    const handleDecrease = () => {
        setValue(value - step)
        setTicks(ticks + 1)
    }
    // Añade uno a la variable step
    const handleAddStep = () => {
        setStep(step + 1)
    };
    // Resetea los valores iniciales
    const handleReset = () => {
        setStep(1)
        setValue(0)
        setTicks(0)
    }

    return (
        <div>
            <h1>{value}</h1>
            <h2>Step: {step}</h2>
            <h2>Ticks: {ticks}</h2>
            <div>
                <button onClick={handleDecrease}>Decrementar</button>
                <button onClick={handleIncrease}>Incrementar</button>
            </div>
            <div>
                <button onClick={handleAddStep}>Incrementar Step</button>
                <button onClick={handleReset}>Reiniciar</button>
            </div>
        </div>
    )


}

const useCounter = () => {
    const [counter, setCounter] = useState({
        value: 0,
        step: 1,
        ticks: 0
    })

    const setValue = newValue => {
        setCounter({
            ...counter,
            value: newValue
        })
    }
    const setStep = newStep => {
        setCounter({
            ...counter,
            step: newStep
        })

    }

    const setTicks = newTicks => {
        setCounter({
            ...counter,
            ticks: newTicks
        })
    }

    return { ...counter, setValue, setStep, setTicks }
}


export default App;

