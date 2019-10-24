import React, { useReducer, createContext } from 'react'

export const appContext = createContext(null)

export default props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <appContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</appContext.Provider>
}

function reducer(state, action) {
  let newState = { ...state }
  switch (action.type) {
    case 'invoke':
      newState.activeUsers.push(action.userKey)
      return newState
    case 'setChatBoxState':
      newState.users[action.userKey].opening = action.opening
      return newState
    case 'close':
      newState.users[action.userKey].opening = true
      newState.activeUsers = newState.activeUsers.filter(ele => ele != action.userKey)
      return newState
    case 'invite':
      newState.users[action.userKey].connecting = true
      return newState
    case 'approveMeeting':
      newState.users[action.userKey].meetingApproved = true
      return newState
    case 'setAvatarHighlight':
      newState.users[action.userKey].highlight = action.highlight
      return newState
    default:
      throw new Error()
  }
}

const initialState = {
  activeUsers: [],
  users: {
    john: {
      userKey: 'john',
      name: 'John Starbucks',
      position: 'Full-stack Developer at Segment',
      sharedConnections: ['Julia Ace', 'Ana Z', 'Diana Wu'],
      sharedOrganizations: ['Microsoft'],
      sharedEdu: ['University X'],
      color: '#6807f9',
      connected: false,
      connecting: false,
      meetingApproved: false,
      proposeReceived: false,
      coord: {
        x: 650,
        y: 263,
      },
      opening: true,
      highlight: false,
    },
    luna: {
      userKey: 'luna',
      name: 'Luna Christin',
      position: 'Senior Designer at Muji',
      sharedConnections: ['Chris Max'],
      sharedOrganizations: ['Saleforce', 'Microsoft'],
      sharedEdu: [],
      color: '#01d28e',
      connected: true,
      connecting: false,
      meetingApproved: false,
      proposeReceived: true,
      coord: {
        x: 650,
        y: 352,
      },
      opening: true,
      highlight: false,
    },
  },
}
