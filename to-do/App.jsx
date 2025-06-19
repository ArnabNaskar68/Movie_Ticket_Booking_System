import './App.css';
import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

function App() {
  const [inputTask, setInputTask] = useState('');
  const [key, setKey] = useState(null);
  const [savedValue, setSavedValue] = useLocalStorage(0, '');
  const [finalArray, setFinalArray] = useState([]);

  const handleClick = () => {
    if (key && inputTask) {
      setSavedValue(key, inputTask);
    }
  };

  useEffect(() => {
    // Only add if savedValue is a valid object with id and name
    if (savedValue && savedValue.id && savedValue.name) {
      setFinalArray(prevArr => {
        // Prevent duplicates
        if (prevArr.some(item => item.id === savedValue.id)) return prevArr;
        return [...prevArr, savedValue];
      });
    }
  }, [savedValue]);

  // Delete handler
  const handleDelete = (id) => {
    setFinalArray(prevArr => prevArr.filter(item => item.id !== id));
  };

  return (
    <>
      {/* input form users */}
      <input
        type='number'
        placeholder='Enter key...'
        onChange={(e) => setKey(e.target.value)}
      />
      <input
        type='text'
        placeholder='Type Task...'
        onChange={(e) => setInputTask(e.target.value)}
      />

      <button onClick={handleClick}>Submit</button>

      <ul>
        {finalArray.map(element => (
          <li key={element.id}>
            {element.name}
            <button onClick={() => handleDelete(element.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div></div>
    </>
  );
}

export default App;