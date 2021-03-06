import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { appContext } from './StateStore'

const logsData = [
  { name: 'John Starbucks', color: '#6807f9', position: 'Full-stack Developer at Segment', userKey: 'john' },
  { name: 'Macheal K.', color: '#fcd307', position: 'Tech Lead at TechTalent', offline: true, connected: true },
  { name: 'Luna Christin', color: '#01d28e', position: 'Senior Designer at Muji', connected: true, userKey: 'luna' },
  { name: 'Julia Alex', color: '#c886e5', position: 'Recruiter at TechTalent', offline: true },
  { name: 'Max Lin', color: '#ff935c', position: 'Marketing Designer at Saleforce', offline: true },
]

export default () => {
  const [opening, setOpening] = useState(false)
  const logs = logsData.map((log, i) => (
    <Log
      name={log.name}
      color={log.color}
      position={log.position}
      offline={log.offline ? true : false}
      connected={log.connected ? true : false}
      userKey={log.userKey && log.userKey}
    />
  ))
  return (
    <div className="mx-1">
      {!opening ? (
        <div onClick={() => setOpening(true)}>
          <button className="w-6 h-6 mb-1.5 bg-secondary rounded-full text-white text-lg shadow-float flex items-center justify-center outline-none hover:bg-black">
            <FontAwesomeIcon icon={faHistory} />
          </button>
        </div>
      ) : (
        <div className="relative w-35 text-sm rounded-t-lg bg-white border border-light shadow-float overflow-hidden">
          <div className="w-full p-1.5 bg-secondary text-white flex items-center">
            <FontAwesomeIcon icon={faHistory} />
            <div className="ml-1 flex-1 font-semibold text-xs font-medium">Networking history</div>
            <div className="cursor-pointer text-white hover:text-light" onClick={() => setOpening(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="py-0.5">{logs}</div>
        </div>
      )}
    </div>
  )
}

const Log = ({ name, color, position, offline, connected, userKey }) => {
  const { state, dispatch } = useContext(appContext)
  let handleClick = null
  if (userKey)
    handleClick = () => {
      if (!state.activeUsers.includes(userKey)) dispatch({ type: 'invoke', userKey: userKey })
      else dispatch({ type: 'setChatBoxState', userKey: userKey, opening: true })
    }

  const highlight = state => dispatch({ type: 'setAvatarHighlight', userKey: userKey, highlight: state })

  return (
    <div
      className="relative px-1.5 pt-1 text-sm bg-white flex cursor-pointer hover:bg-lighter"
      onClick={handleClick}
      onMouseEnter={() => {
        if (userKey) highlight(true)
      }}
      onMouseLeave={() => {
        if (userKey) highlight(false)
      }}
    >
      <div className="#avatar h-2.5 w-2.5 mr-1 rounded-full flex-none" style={{ backgroundColor: color }} />
      <div className="flex-1 pb-1 border-b border-light">
        <div className="flex items-center">
          <div className={`${offline ? 'text-dark' : ''} font-semibold leading-tight`}>{name}</div>
          {connected && (
            <div className={`${offline ? 'text-gray' : 'text-dark'} ml-0.5 leading-none`}>
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
          )}
        </div>
        <div className={`${offline ? 'text-gray' : 'text-dark'} leading-tight`}>{position}</div>
      </div>
    </div>
  )
}
