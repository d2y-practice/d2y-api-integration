interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-10">
      <p className="text-red-500 mb-10">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Retry
      </button>
    </div>
  );
}
