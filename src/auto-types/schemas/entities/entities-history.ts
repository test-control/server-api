/* tslint:disable */
export interface EntitiesHistory {
  /**
   * History unique id
   */
  id: string;
  action: Action;
  /**
   * Entity name
   */
  entity_name: string;
  /**
   * Entity id
   */
  entity_id: string;
  /**
   * Created at time
   */
  created_at: string;
  /**
   * New values, present only in updated/created actions
   */
  new_values?: {
    [k: string]: unknown;
  };
}

/**
 * action name
 */
export const enum Action {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted'
}

