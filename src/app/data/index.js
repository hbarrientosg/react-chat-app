//@flow
export type Conversation = {
  id: number,
  from: User,
  to: User
}

export type Message = {
  message: string,
  createAt: Date,
  createBy: number
}

export type UserMessage = Message & {
  user: User
}

export type User = {
  id: number,
  email: string,
  isOnline: bool,
  isActive: bool
}

export type Status = {
  message: ?string,
  code: "LOADING" | "ERROR" | "READY"
}

export default {
  LOADING: "LOADING",
  ERROR: "ERROR",
  READY: "READY"
};
