import type { Filter } from '../types';

interface Props {
  filter: Filter;
  activeCount: number;
  hasCompleted: boolean;
  onFilterChange: (f: Filter) => void;
  onClearCompleted: () => void;
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'すべて', value: 'all' },
  { label: '未完了', value: 'active' },
  { label: '完了済み', value: 'completed' },
];

export default function TodoFilter({
  filter,
  activeCount,
  hasCompleted,
  onFilterChange,
  onClearCompleted,
}: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gray-50 rounded-b-xl text-xs text-gray-400">
      <span>{activeCount} 件残り</span>

      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-2.5 py-1 rounded transition-colors ${
              filter === f.value
                ? 'text-indigo-500 border border-indigo-300'
                : 'hover:text-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        className={`transition-colors ${
          hasCompleted ? 'hover:text-gray-600 cursor-pointer' : 'opacity-0 pointer-events-none'
        }`}
      >
        完了済みを削除
      </button>
    </div>
  );
}
