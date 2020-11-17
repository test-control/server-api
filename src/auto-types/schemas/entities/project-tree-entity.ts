/* tslint:disable */
export interface ProjectTreeEntity {
  /**
   * Unique id
   */
  id: string;
  /**
   * Title of root leaf
   */
  title: string;
  /**
   * Id of parent
   */
  parent_id?: string;
  /**
   * Id of project
   */
  project_id: string;
}

