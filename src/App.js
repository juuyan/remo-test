import React, { useContext } from 'react'
import bg from './assets/screenshort.png'
import { ChatBox, History, UserAvatar, appContext } from './components'

function App() {
  const { state } = useContext(appContext)

  const users = state.users
  const userAvatars = Object.keys(users).map((key, i) => <UserAvatar user={users[key]} key={i} />)
  const chatBoxes = state.activeUsers.map((activeUser, i) => (
    <div className="mx-1" key={i}>
      <ChatBox user={activeUser} />
    </div>
  ))

  return (
    <div className="relative h-screen w-screen overflow-scroll bg-black">
      <div className="relative">
        <img src={bg} style={{ minWidth: 1440 }} />
        {userAvatars}
        <div className="absolute right-0 bottom-0 mr-22">
          <div className="flex items-end -mx-1" style={{ flexDirection: 'row-reverse' }}>
            <History />
            {chatBoxes}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
