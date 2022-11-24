import React, {useRef, useState, useMemo, useCallback} from 'react';
import './App.css';
import Wrapper from './Wrapper';
import Hello from './Hello';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중..');
  return users.filter(user => user.active).length;
}

function App_hook() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false

    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);


  const onRemove = useCallback(
    id => {
      // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // = user.id 가 id 인 것을 제거함
      setUsers(users.filter(user => user.id !== id));
    },
    [users]
  );
  const onToggle = useCallback(
    id => {
      setUsers(
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    []
  );

const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users = {users} onRemove = {onRemove} onToggle = {onToggle}/>
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

function App_Input() {
  return(
    <InputSample />
  );
}

function App() {
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
