import { AccountContext } from '../../auto-types/schemas'

declare global{
  namespace Express {
    interface Request {
      accountContext?: AccountContext
    }
  }
}
