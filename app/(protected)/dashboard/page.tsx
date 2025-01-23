import Conversation from "./_conversations/Conversation";

export default function Dashboard() {
  return (
    <div
    className=" bg-blend-multiply flex flex-col justify-between h-screen w-full bg-green-50">
        <div className="w-full mx-auto max-w-4xl p-10">
            Form here
        </div>

        <div className=" w-full mx-auto max-w-4xl p-10">
            <div className="">
               <Conversation />
            </div>
        </div>
    </div>
  )
}
