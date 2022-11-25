import React from 'react';
import Item from './Item';
import { Todo } from '../../index';

type SectionProps = {
  renderList: Todo[];
  deleteTodo: (id: number) => void;
  changeName: (id: number, name: string) => void;
  changeCompleted: (id: number) => void;
};

function Section({
  renderList,
  deleteTodo,
  changeName,
  changeCompleted,
}: SectionProps) {
  return (
    <section style={{ width: '100%' }}>
      {renderList.map((todo) => {
        return (
          <Item
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            changeName={changeName}
            changeCompleted={changeCompleted}
          />
        );
      })}
    </section>
  );
}

export default Section;
