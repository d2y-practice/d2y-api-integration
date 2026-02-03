import { ProductPage } from "./products/pages/ProductPage";

const App = () => {
  return (
    <div className="min-h-screen  flex justify-center">
      <div className="w-full lg:w-110 shadow-lg ">
        <header className="border-b border-slate-200 py-4 px-6">
          <h1 className="font-semibold text-lg">D2YSTORE</h1>
        </header>
        <ProductPage />
      </div>
    </div>
  );
};

export default App;
