
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/thread";
import { ThreadList } from "@/components/thread-list";
import AgriChatbot from "../assistant/chats/AgriChatBot";
 const AgriChat = async () => {

 
  return (
    <div className=" w-full h-[90vh] ">
        <AgriChatbot />
      </div>
  );
};


export default AgriChat;