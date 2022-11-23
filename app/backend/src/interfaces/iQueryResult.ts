export default interface iQueryResult {
  error: boolean
  response: {
    status: number,
    message: string
  }
}
