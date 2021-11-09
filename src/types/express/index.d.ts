import { AccountContext } from '../../auto-types/schemas'
declare module 'express-serve-static-core' {
    interface Request {
      accountContext?: AccountContext
    }
  }
