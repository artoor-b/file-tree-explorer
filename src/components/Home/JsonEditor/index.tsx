interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  hasError: boolean;
}

export default function JsonEditor({ value, onChange, disabled, hasError }: JsonEditorProps) {
  return (
    <>
      <div className="my-6 flex items-center text-gray-400 text-xs uppercase tracking-wider font-semibold before:flex-1 before:border-t before:border-gray-300 before:mr-4 after:flex-1 after:border-t after:border-gray-300 after:ml-4">
        or paste JSON below
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-40 p-4 text-sm font-mono text-gray-700 bg-white border ${hasError ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-xl focus:ring-2 outline-none transition-all resize-none shadow-inner disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
        placeholder='{ "name": "root", "type": "folder", "children": [...] }'
        spellCheck={false}
      />
    </>
  );
}
