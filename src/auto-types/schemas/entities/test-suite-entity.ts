/* tslint:disable */
export interface TestSuiteEntity {
  /**
   * Unique id
   */
  id: string;
  /**
   * Title of root leaf
   */
  title?: string;
  /**
   * path id
   */
  tree_path: string;
  created_at: string;
  /**
   * Elements amount
   */
  elements_amount: number;
  description?: string;
}

