import {
  testCasePreconditionTransformer,
  testCaseStepTransformer,
  testCaseTransformer,
  testSuiteTransformer
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
        description: 'description',
        test_suite_id: '123-1233',
        display_order: 1
      },
      o: {
        id: 'sample',
        title: 'another',
        description: 'description',
        testSuiteId: '123-1233',
        displayOrder: 1
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
      n: 'testSuiteTransformer',
      t: testSuiteTransformer,
      i: {
        id: 'sample',
        title: 'another',
        parent_id: '3-id',
        created_at: new Date('2020-10-10 10:00:10'),
        elements_amount: 1234,
        tree_path: '1.1',
        description: 'sample description'
      },
      o: {
        id: 'sample',
        title: 'another',
        createdAt: '2020-10-10 10:00:10',
        elementsAmount: 1234,
        treePath: '1.1',
        description: 'sample description'
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
