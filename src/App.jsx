import { useState } from 'react';
import './App.css';
import Icon from './components/Icon';
import Input from './components/Input';
import RadioButton from './components/RadioButton';
import Button from './components/Button';
import SocialMedia from './components/SocialMedia';
import Authentication from './components/Layouts/AuthenticationLayout';
import SignUp from './pages/Authentication/SignUp';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');

  return (
    <div className="App">
      
    </div>
  )
}

export default App
