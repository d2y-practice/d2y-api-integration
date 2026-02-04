interface ErrorInterface {
  onRetry: () => {};
}

const Error = ({ onRetry }: ErrorInterface) => {
  return (
    <div className="flex flex-col gap-4 text-center justify-center items-center min-h-screen w-full">
      <h1 className="text-2xl font-bold">Error!</h1>
      <p className="text-slate-400">
        An error occured while processig. <br /> Please Retry
      </p>
      <button
        className="bg-red-600 text-white px-6 py-2 rounded-md cursor-pointer"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
