/* tslint:disable */
export interface TestCasePreconditionEntity {
  /**
   * Unique id
   */
  id: string;
  /**
   * Title
   */
  title: string;
  /**
   * foreign id
   */
  test_case_id: string;
  /**
   * order entity id
   */
  display_after?: string;
}

