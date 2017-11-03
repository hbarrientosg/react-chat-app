
export type Conversation = {
  id: number,
  messages: Messages[];
}

export type Messages = {
  message: string,
  createAt: Date,
  userId: number
}
