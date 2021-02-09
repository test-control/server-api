/* tslint:disable */
export interface TestCaseEntity {
  /**
   * Unique id
   */
  id: string;
  /**
   * Title
   */
  title: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Tree id
   */
  tree_id: string;
  display_order?: number;
}

