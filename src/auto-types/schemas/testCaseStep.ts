/* tslint:disable */
export interface TestCaseStep {
  /**
   * Unique id
   */
  id: string;
  /**
   * Title
   */
  title: string;
  /**
   * Test case uuid
   */
  testCaseId: string;
  /**
   * Display after uuid item
   */
  displayAfter?: string;
}

