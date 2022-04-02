import React from 'react';
import './Modal.css'

const Modal = ({closeModal}) => {

    return <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='closeBtn'>
                <button onClick={()=>closeModal(false)}>X</button>
            </div>
            <div className='modalContents'>
                <div className='modalCheck'>
                    <h2>법인회원</h2>
                    <li>법인사업체를 가진 사용자로 사업자등록번호 확인이 필요합니다.</li>
                    <li>관리중인 설문현황조회가 가능한 일반관리자 계정 생성이 가능합니다.</li>
                </div>
                <div className='checkModal'>
                    <h2 id='modalPer'>일반회원</h2>
                    <li>소속이 없는 일반 사용자로, 별도의 증빙이 필요하지 않습니다.</li>
                    <li>일반관리자 계정 생성이 불가능하여 관리중인 설문현황은 본인만 조회가 가능합니다.</li>
                </div>
            </div>
        </div>
    </div>;
};

export default Modal;