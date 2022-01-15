/* tslint:disable */
export interface TestSuite {
  /**
   * Unique id
   */
  id: string;
  /**
   * Title of root leaf
   */
  title: string;
  createdAt: string;
  /**
   * path id
   */
  treePath: string;
  /**
   * Elements amount
   */
  elementsAmount: number;
  description?: string;
}

