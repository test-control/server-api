import {
  testCasePreconditionTransformer,
  testCaseStepTransformer,
  testCaseTransformer, treeTransformer
} from '../../../src/entity-transformers'
import { projectsTransformer } from '../../../src/entity-transformers/project'

interface TransformerTestRow
{
  n: string,
  t: (t:any) => any,
  i: object,
  o: object
}

describe('entity-transformers', () => {
  const transformers : TransformerTestRow[] =
  [
    {
      n: 'testCaseTransformer',
      t: testCaseTransformer,
      i: {
        id: 'sample',
        title: 'another',
        description: 'description'
      },
      o: {
        id: 'sample',
        title: 'another',
        description: 'description'
      }
    },
    {
      n: 'testCasePreconditionTransformer',
      t: testCasePreconditionTransformer,
      i: {
        id: 'sample',
        title: 'another',
        test_case_id: '2-id',
        display_after: '3-id'
      },
      o: {
        id: 'sample',
        title: 'another',
        testCaseId: '2-id',
        displayAfter: '3-id'
      }
    },
    {
      n: 'testCaseStepTransformer',
      t: testCaseStepTransformer,
      i: {
        id: 'sample',
        title: 'another',
        test_case_id: '2-id',
        display_after: '3-id'
      },
      o: {
        id: 'sample',
        title: 'another',
        testCaseId: '2-id',
        displayAfter: '3-id'
      }
    },
    {
      n: 'treeTransformer',
      t: treeTransformer,
      i: {
        id: 'sample',
        title: 'another',
        root_id: '2-id',
        parent_id: '3-id'
      },
      o: {
        id: 'sample',
        title: 'another',
        parentId: '3-id'
      }
    },
    {
      n: 'projectsTransformer',
      t: projectsTransformer,
      i: {
        id: 'sample',
        title: 'another',
        description: 'description text'
      },
      o: {
        id: 'sample',
        title: 'another',
        description: 'description text'
      }
    }
  ]

  for (const { n, i, o, t } of transformers) {
    it(n, () => {
      const apiEntity = t(i)

      expect(Object.keys(o)).toEqual(Object.keys(apiEntity))
      expect(Object.values(o)).toEqual(Object.values(apiEntity))
    })
  }
})
