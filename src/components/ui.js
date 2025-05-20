export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 text-white font-bold rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      rows="4"
      {...props}
    />
  );
}

export function Select({ children, className, ...props }) {
  return (
    <select
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
