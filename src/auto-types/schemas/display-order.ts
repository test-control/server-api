/* tslint:disable */
export interface DisplayOrder {
  /**
   * Display destination uuid item
   */
  displayDestination?: string;
  displayMoveDirection?: DisplayMoveDirection;
}

/**
 * Displaying movement direction
 */
export const enum DisplayMoveDirection {
  down = 'down',
  up = 'up'
}

