import { LuSend as Send } from "react-icons/lu";

export default function ChatWindow() {
  return (
    <div className="flex-1 bg-white rounded-xl border overflow-hidden flex flex-col">
      <div className="h-[70px] border-b px-6 flex items-center">
        <div>
          <h3 className="font-medium">John Smith</h3>

          <p className="text-sm text-gray-500">Premium Properties</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f6d8a4] flex items-center justify-center text-xs">
            J
          </div>

          <div className="bg-[#f8f4ef] rounded-xl px-4 py-3 max-w-[260px]">
            The property is still available. When would you like to schedule a
            visit?
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <div className="flex items-center gap-2">
            <div className="bg-[#f8b61d] px-5 py-3 rounded-xl">
              Thank you for the information!
            </div>

            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">
              Y
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border-t">
        <div className="flex gap-2">
          <input
            placeholder="Type your message..."
            className="flex-1 h-11 border rounded-lg px-4 outline-none"
          />

          <button className="w-11 h-11 bg-[#f8b61d] rounded-lg flex items-center justify-center">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
