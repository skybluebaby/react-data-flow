import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <button className="button" onClick={() => navigate('/react')}>
        react 原生写法
      </button>
      <button className="button" onClick={() => navigate('/mobx')}>
        mobx 写法
      </button>
      <button className="button" onClick={() => navigate('/redux')}>
        redux 写法
      </button>
    </div>
  );
};

export default Home;
