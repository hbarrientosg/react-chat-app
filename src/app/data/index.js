//@flow
export type Conversation = {
  id: number,
  user: User
}

export type Messages = {
  message: string,
  createAt: Date,
  userId: number
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
