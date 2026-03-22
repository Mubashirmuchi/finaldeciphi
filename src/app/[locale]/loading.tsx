export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}

