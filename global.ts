export enum MessageType {
  INIT = 'init',
  COORDINATES_REQUEST = 'coordinates_request',
  UPDATE_COORDINATES = 'update_coordinates',
  CLICK = 'click',
  NEXT = 'next',
  RESTART = 'restart',
  LEAVE = 'leave',
  GAME = 'game',
  USER_LEFT = 'user_left'
}

export type InitMessage = {
  type: MessageType.INIT
  uid: string
  name: string
}

export type UpdateCoordinatesMessage = {
  type: MessageType.UPDATE_COORDINATES
  coordinates: google.maps.LatLngLiteral
}

export type OnlineAnswer = {
  uid: string
  username: string
  coordinates?: google.maps.LatLngLiteral
  distance: number
}

export type ClickMessage = OnlineAnswer & {
  type: MessageType.CLICK
  hint?: boolean
}

export type NextMessage = {
  type: MessageType.NEXT
  uid: string
  coordinates?: google.maps.LatLngLiteral
}

export type RestartMessage = {
  type: MessageType.RESTART
  uid: string
  coordinates?: google.maps.LatLngLiteral
}

export type LeaveMessage = {
  type: MessageType.LEAVE
}

export type ClientMessage =
  (InitMessage | UpdateCoordinatesMessage | ClickMessage | NextMessage | RestartMessage | LeaveMessage)
  & {
  id: string
}

export type OnlineUser = {
  id: string
  name: string
  score: number
}

export type CoordinatesRequestMessage = {
  type: MessageType.COORDINATES_REQUEST
}

export type GameMessage = {
  type: MessageType.GAME
  users: OnlineUser[]
  round: number
  is_final: boolean
  coordinates: google.maps.LatLngLiteral
  answers: OnlineAnswer[]
}

export type UserLeftMessage = {
  type: MessageType.USER_LEFT
}

export type ServerMessage = CoordinatesRequestMessage | GameMessage | UserLeftMessage
