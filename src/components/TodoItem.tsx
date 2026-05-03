import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    else setEditValue(todo.text);
    setEditing(false);
  };

  return (
    <div className="todo-item flex items-center gap-3 px-5 py-4 border-b border-gray-100">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {editing ? (
        <input
          ref={inputRef}
          className="flex-1 text-base text-gray-700 outline-none border-b border-indigo-400 bg-transparent pb-0.5"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={e => {
            if (e.key === 'Enter') commitEdit();
            if (e.key === 'Escape') {
              setEditValue(todo.text);
              setEditing(false);
            }
          }}
        />
      ) : (
        <span
          className={`flex-1 text-base cursor-pointer select-none ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
          onDoubleClick={() => !todo.completed && setEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <button
        className="delete-btn text-gray-400 hover:text-red-400 transition-colors text-lg leading-none"
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
      >
        ✕
      </button>
    </div>
  );
}
