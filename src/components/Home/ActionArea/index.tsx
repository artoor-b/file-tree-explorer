interface ActionAreaProps {
  error: string;
  isReady: boolean;
  onProcess: () => void;
}

export default function ActionArea({ error, isReady, onProcess }: ActionAreaProps) {
  return (
    <>
      {error && <p className="mt-3 text-sm font-medium text-red-500 text-center animate-in fade-in duration-300">{error}</p>}
      <button
        onClick={onProcess}
        disabled={!isReady}
        className="w-full mt-6 bg-black text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        Explore Structure
      </button>
    </>
  );
}
