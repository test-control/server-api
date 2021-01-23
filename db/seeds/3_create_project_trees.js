const helpers = require('../migration-helpers')

exports.seed = function (knex) {
  return knex(helpers.getFullTableName('project_trees')).del()
    .then(function () {
      return knex(helpers.getFullTableName('project_trees')).insert([
        { project_id: 'cda57522-4cc7-4693-a27e-37ad36ec00fd', tree_id: 'a2379685-b102-4a3f-8907-87fe0dd3d37a' },
        { project_id: 'bad41041-a0de-46c0-bfe2-047576e89390', tree_id: 'd10cc062-0638-4ae6-b40b-86f7d3cfe81c' },
        { project_id: '204f9e66-1fdc-4311-bcea-a5787d1c820d', tree_id: '992cc8c5-0192-41a5-a4dd-f72c226b261f' }
      ])
    })
}
