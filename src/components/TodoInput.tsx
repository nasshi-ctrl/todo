import { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0" />
      <input
        className="flex-1 text-base text-gray-700 outline-none placeholder-gray-400 bg-transparent"
        type="text"
        placeholder="タスクを追加..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        autoFocus
      />
      {value.trim() && (
        <button
          onClick={submit}
          className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
        >
          追加
        </button>
      )}
    </div>
  );
}
