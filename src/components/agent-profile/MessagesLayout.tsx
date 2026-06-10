import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function MessagesLayout() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-[72px] border-b bg-[#f8f6f4] flex items-center justify-end px-8">
        <button className="text-[#f8b61d] text-sm">
          Back to Home
        </button>
      </header>

      <div className="flex-1 p-6 overflow-hidden">
        <h1 className="text-4xl font-medium mb-6">
          Messages
        </h1>

        <div className="h-[calc(100vh-180px)] flex gap-4">
          <ConversationList />
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}