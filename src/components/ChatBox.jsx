import React, { useContext, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCalendar, faUserFriends, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Button, { Buttons } from './Button'
import { appContext } from './StateStore'

export default ({ user }) => {
  const { state, dispatch } = useContext(appContext)
  const scroller = useRef(null)
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
    proposeReceived,
    opening,
  } = state.users[user]

  const toggleBox = opening => {
    dispatch({ type: 'setChatBoxState', opening: opening, userKey: userKey })
  }

  useEffect(() => {
    if (scroller && opening) scroller.current.scrollTop = scroller.current.scrollHeight
  })

  return opening ? (
    <div className="relative w-40 text-sm rounded-t-lg bg-white border border-light shadow-float overflow-hidden">
      <div className="relative p-1.5 cursor-pointer hover:bg-lighter flex" onClick={() => toggleBox(false)}>
        <div className="#avatar h-4 w-4 mr-1 rounded-full flex-none" style={{ backgroundColor: color }} />
        <div className="text-sm">
          <div className="flex items-center">
            <div className="font-bold">{name}</div>
            {connected && (
              <div className="ml-0.5 text-xs text-dark">
                <FontAwesomeIcon icon={faUserFriends} />
              </div>
            )}
            <div className="ml-0.5 text-sm text-google hover:text-facebook">
              <a href="https://linkedin.com" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
          <div className="mb-0.5 text-dark leading-tight">{position}</div>
          <div className="mb-0.5 text-xs text-dark">
            {sharedConnections.length > 0 && (
              <Info title={`${sharedConnections.length} shared connections:`} content=" Mike J, Paul T, Julia Somebody" />
            )}
            {sharedEdu.length > 0 && <Info title="Both have studied in:" content=" University Name" />}
            {sharedOrganizations.length > 0 && <Info title="Both have worked in:" content=" Microsoft, Segment" />}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 m-1.5 text-dark text-sm">
        <div
          className="cursor-pointer hover:text-black"
          onClick={e => {
            e.stopPropagation()
            dispatch({ type: 'close', userKey: userKey })
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="#message-section relative h-30 border-b border-t border-light bg-light">
        <div className="#scroller relative h-full w-full overflow-scroll" ref={scroller}>
          <div className="p-1.5 pb-3">
            <Balloon w={22} />
            <Balloon w={16} color={color} />
            {!proposeReceived && meetingApproved && (
              <>
                <Balloon>What about scheduling a meeting?</Balloon>
                <Balloon color={color}>
                  {`Sure. Please check my `}
                  <a
                    className="underline font-semibold text-dark hover:text-primary"
                    href="https://calendly.com/juuyan/60min"
                    target="_blank"
                  >
                    Calendly
                  </a>
                </Balloon>
              </>
            )}
            {proposeReceived && (
              <>
                <Balloon color={color}>What about scheduling a meeting?</Balloon>
                <MeetingRequest
                  meetingApproved={meetingApproved}
                  handleApprove={() => {
                    dispatch({ type: 'approveMeeting', userKey: userKey })
                  }}
                />
                {meetingApproved && (
                  <>
                    <Balloon>
                      {`Sure. Please check my `}
                      <a
                        className="underline font-semibold text-dark hover:text-primary"
                        href="https://calendly.com/juuyan/60min"
                        target="_blank"
                      >
                        Calendly
                      </a>
                    </Balloon>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {(meetingApproved || !proposeReceived) && (
          <div className="absolute bottom-0 left-0 ml-1.5 mb-1">
            <Buttons
              gap={0.5}
              btns={[
                meetingApproved ? (
                  <a href="https://calendly.com/juuyan/60min" target="_blank">
                    <Button highlight icon={faCalendar}>
                      Schedule meeting
                    </Button>
                  </a>
                ) : (
                  <div onClick={() => dispatch({ type: 'approveMeeting', userKey: userKey })}>
                    <Button highlight icon={faCalendar}>
                      Propose meeting
                    </Button>
                  </div>
                ),
                !connected && (
                  <div
                    onClick={() => {
                      if (!connecting) dispatch({ type: 'invite', userKey: userKey })
                    }}
                  >
                    <Button highlight disable={connecting} icon={faLinkedin}>
                      {connecting ? 'Pending' : 'Connect'}
                    </Button>
                  </div>
                ),
              ]}
            />
          </div>
        )}
      </div>
      <div className="p-1.5 flex items-center">
        <input className="flex-1 outline-none" placeholder="Type a message..." autoFocus={true} />
      </div>
    </div>
  ) : (
    <div
      className="relative p-1 w-22 text-sm rounded-t-lg bg-white shadow-float overflow-hidden flex items-center cursor-pointer hover:bg-lighter"
      onClick={() => toggleBox(true)}
    >
      <div className="#avatar h-2.5 w-2.5 mr-1 rounded-full flex-none" style={{ backgroundColor: color }} />
      <div className="font-semibold leading-none">{name}</div>
      <div
        className="absolute right-0 top-0 m-1 mr-1.5 text-dark cursor-pointer hover:text-black"
        onClick={e => {
          e.stopPropagation()
          dispatch({ type: 'close', userKey: userKey })
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  )
}

const Info = ({ title, content }) => (
  <div className="mb-0.5 leading-tight text-xs text-dark flex items-start">
    <div className="">
      <span className="font-bold">{title}</span> {content}
    </div>
  </div>
)

const Balloon = ({ color, w, children }) => (
  <div className={`w-full mb-2 flex justify-${!color ? 'end' : 'start'}`}>
    {color && <div className="#avatar flex-none h-4 w-4 mr-1 rounded-full " style={{ backgroundColor: color }} />}
    <div className={`flex-none px-1 h-4 w-${w ? w : 'auto'} whitespace-pre text-xs bg-white rounded-lg flex items-center`}>
      {children}
    </div>
  </div>
)

const MeetingRequest = ({ meetingApproved, handleApprove }) => (
  <div className="w-full mb-1 flex-col items-center">
    <div className="text-gray text-center text-xs font-semibold mb-1">{`Luna has proposed you a meeting. Let her know what you think.`}</div>
    <div className="flex justify-center">
      <Buttons
        gap={0.5}
        btns={[
          <div onClick={handleApprove}>
            <Button highlight disable={meetingApproved} icon={faCheck}>
              Accept
            </Button>
          </div>,
          <Button highlight disable={meetingApproved} icon={faTimes}>
            Refuse
          </Button>,
        ]}
      />
    </div>
  </div>
)
