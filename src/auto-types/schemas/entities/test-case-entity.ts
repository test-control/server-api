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
   * Test suite id
   */
  test_suite_id: string;
  display_order?: number;
}

