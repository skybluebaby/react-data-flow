import React from 'react';
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
} from '../../../../constants';
import './index.css';

type FooterProps = {
  activeCount: number;
  currentChoice: string;
  changeCurrentChoice: (choice: string) => void;
  hasCompletedTodo: boolean;
  clearCompletedTodo: () => void;
};

function Footer({
  activeCount,
  currentChoice,
  changeCurrentChoice,
  hasCompletedTodo,
  clearCompletedTodo,
}: FooterProps) {
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

export default Footer;
