import React from 'react';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { useTodoContext } from '../../TodoStore';

function Section() {
  const { renderList } = useTodoContext();

  return (
    <section style={{ width: '100%' }}>
      {renderList.map((todo) => {
        return <Item key={todo.id} todo={todo} />;
      })}
    </section>
  );
}

export default observer(Section);
