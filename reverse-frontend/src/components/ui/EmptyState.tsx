interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: string;
}

export function EmptyState({ message, description, icon = '📭' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-4xl mb-3">{icon}</span>
      <p className="text-base font-medium text-gray-700">{message}</p>
      {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
    </div>
  );
}
