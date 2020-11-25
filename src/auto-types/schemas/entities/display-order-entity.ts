/* tslint:disable */
export interface DisplayOrderEntity {
  /**
   * Display destination uuid item
   */
  display_destination?: string;
  display_move_direction?: DisplayMoveDirection;
}

/**
 * Displaying movement direction
 */
export const enum DisplayMoveDirection {
  down = 'down',
  up = 'up'
}

