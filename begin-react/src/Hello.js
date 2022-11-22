import React from 'react'; // 리액트 call

function Hello({color, name, isSpecial}) {
    return (
        <div style={{color}}>
        {/* { isSpecial ? <b>*</b> : null} */}
        {isSpecial && <b>*</b>}
        안녕하세요 {name}</div>
    );
    
}

Hello.defaultProps = {
    name: '이름없음'
}

export default Hello; // Hello 컴포넌트를 내보내겠다는 뜻