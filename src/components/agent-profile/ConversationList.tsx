import { LuSearch as Search } from "react-icons/lu";

const users = [
  {
    id: 1,
    name: "John Smith",
    initial: "J",
    active: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    initial: "S",
  },
  {
    id: 3,
    name: "Emma Wilson",
    initial: "E",
  },
];

export default function ConversationList() {
  return (
    <div className="w-[340px] bg-white rounded-xl border overflow-hidden">
      <div className="p-3 border-b">
        <div className="h-10 border rounded-lg flex items-center px-3">
          <Search size={16} className="text-gray-400" />

          <input
            placeholder="Search conversations..."
            className="ml-2 flex-1 outline-none text-sm"
          />
        </div>
      </div>

      <div>
        {users.map((user) => (
          <div
            key={user.id}
            className={`h-[72px] px-4 flex items-center justify-between border-b cursor-pointer
              ${user.active ? "bg-[#fbf3e4]" : "hover:bg-gray-50"}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f6d8a4] flex items-center justify-center text-sm">
                {user.initial}
              </div>

              <span>{user.name}</span>
            </div>

            {user.active && (
              <div className="w-2 h-2 rounded-full bg-[#f8b61d]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
