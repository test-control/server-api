const helpers = require('../migration-helpers')

exports.seed = function (knex) {
  return knex(helpers.getFullTableName('trees')).del()
    .then(function () {
      return knex(helpers.getFullTableName('trees')).insert([
        { id: 'a2379685-b102-4a3f-8907-87fe0dd3d37a', title: 'root', tree_path: '1' },
        { id: 'afd29266-fa92-4fd6-a23d-cd15cc052167', title: 'MVP 1 - Company website', tree_path: '1.1' },
        { id: '669f913c-1f46-4bc0-be27-25e368b93b7c', title: 'Homepage', tree_path: '1.1.1' },
        { id: '1e058fdb-a6ca-45ae-8cf9-ac0cb9de4884', title: 'About us', tree_path: '1.1.2' },
        { id: '36f3c225-b451-4867-8fe1-f5e23f2a4718', title: 'Contact', tree_path: '1.1.3' },
        { id: '222da225-73dd-4be9-8a65-5863c9655a07', title: 'MVP 2 - Client portal', tree_path: '1.2' },
        { id: '23d8b5a3-f516-4c06-b728-1b7dd41e296f', title: 'Sign in', tree_path: '1.2.1' },
        { id: '2f9eb8a7-1cd9-49f2-a3a9-7a730ad9d44c', title: 'Forgot password', tree_path: '1.2.2' },

        { id: 'd10cc062-0638-4ae6-b40b-86f7d3cfe81c', title: 'root', tree_path: '2' },

        { id: '992cc8c5-0192-41a5-a4dd-f72c226b261f', title: 'root', tree_path: '3' },
        { id: '56c30ac2-16aa-4db0-a32d-3e93f436e645', title: 'Push notifications', tree_path: '3.1' },
        { id: '7c31f3bb-97b2-4502-bc42-741f47ca37e1', title: 'Sms notifications', tree_path: '3.2' }
      ])
    })
}
