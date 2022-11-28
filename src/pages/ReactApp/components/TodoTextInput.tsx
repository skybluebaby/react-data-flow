import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import classnames from 'classnames';

type TodoTextInput = {
  onSave: (text: string) => void;
  newTodo?: boolean;
  placeholder?: string;
  text?: string;
  editing?: boolean;
};

const TodoTextInput: FC<TodoTextInput> = (props) => {
  const { onSave, newTodo, text, editing, placeholder } = props;

  const [inputText, setInputText] = useState(text || '');

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      onSave(inputText);
      if (newTodo) {
        setInputText('');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.trim());
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!newTodo) {
      onSave(e.target.value);
    }
  };

  return (
    <input
      className={classnames({
        edit: editing,
        'new-todo': newTodo,
      })}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={inputText}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

export default TodoTextInput;
