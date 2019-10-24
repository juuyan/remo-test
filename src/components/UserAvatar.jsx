import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faComment, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { appContext } from './StateStore'
import Button, { Buttons } from './Button'

export default ({ user }) => {
  const [enable, setEnable] = useState(false)
  const { state, dispatch } = useContext(appContext)
  const opacity = enable ? 'opacity-100' : 'opacity-0'
  const visiblity = enable ? 'visible' : 'invisible'

  const {
    userKey,
    name,
    position,
    sharedConnections,
    sharedOrganizations,
    sharedEdu,
    color,
    connected,
    connecting,
    meetingApproved,
    coord,
    boxIndex,
  } = user
  const { x, y } = coord

  const sharedConnectionAmount = sharedConnections ? sharedConnections.length : 0
  const sharedExpAmount = (sharedOrganizations ? sharedOrganizations.length : 0) + (sharedEdu ? sharedEdu.length : 0)

  const handleClick = () => {
    setEnable(false)
    if (!state.activeUsers.includes(userKey)) dispatch({ type: 'invoke', userKey: userKey })
    else dispatch({ type: 'setChatBoxState', userKey: userKey, opening: true })
  }

  return (
    <div
      className="absolute w-5 h-5 rounded-full cursor-pointer"
      style={{ top: y, left: x }}
      onMouseEnter={() => setEnable(true)}
      onMouseLeave={() => setEnable(false)}
    >
      <div className={'absolute inset-0'} onClick={handleClick} />
      <div className={`absolute z-50 w-40 ${opacity} ${visiblity} trans-flash`} style={{ left: '100%' }}>
        <div
          className="p-1.5 pb-4 bg-white rounded-lg border border-light shadow-float trans hover:bg-lighter flex"
          onClick={handleClick}
        >
          <div className="#avatar h-5 w-5 mr-1 bg-google rounded-full flex-none" style={{ backgroundColor: color }} />
          <div className="text-sm">
            <div className="flex items-center">
              <div className="font-bold leading-tight">{name}</div>
              {connected && (
                <div className="ml-0.5 text-xs text-dark leading-tight">
                  <FontAwesomeIcon icon={faUserFriends} />
                </div>
              )}
            </div>
            <div className="mb-0.5 text-dark leading-tight">{position}</div>
            <div className="mb-0.5 text-xs text-dark">
              {sharedConnectionAmount > 0 && (
                <>
                  <Info value={sharedConnectionAmount} content="shared connections" />
                  <span>・</span>
                </>
              )}
              {sharedExpAmount > 0 && <Info value={sharedExpAmount} content="shared experiences" />}
            </div>
            {/* <div>PositionPositionPositionPosition</div> */}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 mb-1.5 mr-1.5">
          <Buttons
            gap={0.5}
            btns={[
              <div onClick={handleClick}>
                <Button icon={faComment}>Chat</Button>
              </div>,
              !connected && (
                <div
                  onClick={() => {
                    if (!connecting) dispatch({ type: 'invite', userKey: userKey })
                  }}
                >
                  <Button disable={connecting} icon={faLinkedin}>
                    {connecting ? 'Pending' : 'Connect'}
                  </Button>
                </div>
              ),
            ]}
          />
        </div>
      </div>
    </div>
  )
}

const Info = ({ value, content }) => (
  <>
    <span className="font-bold">{value}</span>
    {` ${content}`}
  </>
)
