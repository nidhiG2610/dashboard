import { StrictMode, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  return (
    <div className="">
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    </div>
  )
}

export default App
