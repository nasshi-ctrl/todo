import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import type { Todo, Filter } from './types';

function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos(prev => [{ id: crypto.randomUUID(), text, completed: false }, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const hasCompleted = todos.some(t => t.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center pt-20 px-4">
      <h1 className="text-5xl font-bold tracking-widest text-white mb-8 select-none">TODO</h1>

      <div className="w-full max-w-lg shadow-2xl rounded-xl overflow-hidden">
        <div className="bg-white">
          <TodoInput onAdd={addTodo} />
          <TodoList
            todos={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
        <TodoFilter
          filter={filter}
          activeCount={activeCount}
          hasCompleted={hasCompleted}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </div>

      <p className="mt-6 text-indigo-300 text-sm opacity-60 select-none">
        ダブルクリックでタスクを編集
      </p>
    </div>
  );
}
