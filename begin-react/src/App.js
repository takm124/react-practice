import React, {useRef, useState} from 'react';
import './App.css';
import Wrapper from './Wrapper';
import Hello from './Hello';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users = {users}/>
    </>
  );
}

function App_Input() {
  return(
    <InputSample />
  );
}

function App_Counter() {
  return (
    <Counter />
  );
}


function App_props() {
  return (
    <Wrapper>
      <Hello name = "react" color = "red" isSpecial /> {/* isSpecial -> true면 생략 가능 */}
      <Hello color = "pink" />
    </Wrapper>
  );
}


function App_JSX() {
  const name = 'react';
  const style = {
    backgroundColor : 'black',
    color : 'aqua',
    fontSize : 24, // 기본단위 px
    padding: '1rem' // 다른 단위 사용시 문자열로 설정
  }
  
  return (
    <> {/* 주석은 이런식으로 */}
      <Hello 
        //열리는 태그 내부에서는 주석 이렇게
      />
      <div style={style}>{name}</div>
      <div className='gray-box'></div>
    </> 
  );
}

export default App;
