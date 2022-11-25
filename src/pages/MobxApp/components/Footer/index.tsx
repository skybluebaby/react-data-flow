import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTodoContext } from '../../TodoStore';
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
} from '../../../../constants';
import './index.css';

function Footer() {
  const {
    activeCount,
    currentChoice,
    changeCurrentChoice,
    hasCompletedTodo,
    clearCompletedTodo,
  } = useTodoContext();

  return (
    <footer className="footer">
      <div className="footer-left">{activeCount || 0} item left</div>
      <div className="footer-center">
        {[ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS].map((item) => {
          return (
            <div
              key={item}
              className={`center-btn ${
                currentChoice === item ? 'center-active-btn' : ''
              }`}
              onClick={() => changeCurrentChoice(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="footer-right" onClick={() => clearCompletedTodo()}>
        {hasCompletedTodo ? 'Clear completed' : ''}
      </div>
    </footer>
  );
}

export default observer(Footer);