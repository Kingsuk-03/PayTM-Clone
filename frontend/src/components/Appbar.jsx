export function Appbar() {
  return (
    <div className="shadow h-14 flex justify-between px-3">
      <div className=" font-bold text-xl flex flex-col justify-center h-full ml-4">
        PayTm App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
