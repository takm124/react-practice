import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 312px;
  height: 168px;

  position: relative; 
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; 

  margin-top: 150px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

function Login() {
    const [loginId, setLoginId] = useState('')
    const [loginPw, setLoginPw] = useState('')

    const handleInputId = (e) => {
        setLoginId(e.target.value)
    }

    const handleInputPw = (e) => {
        setLoginPw(e.target.value)
    }

    const requestLogin =() => {
        console.log('requestLogin start');

        let data = {
            userId : loginId,
            userPw : loginPw
        };

        axios.post('http://localhost:8080/api/login', data)
            .then((response) => console.log(response.data))
    }

    const onClickLogin = () => {
        requestLogin(loginId, loginPw);
    }

    return(
        <Container>
            <Input type='text' name='id' id = 'id' value={loginId} placeholder="아이디를 입력하세요" onChange={handleInputId} />
            <Input type='password' name='loginPw' id = 'loginPw' value={loginPw} placeholder="비밀번호를 입력하세요" onChange={handleInputPw} />
            <Button type='button' onClick={onClickLogin}>Login</Button>
        </Container>
    );
}

export default Login;