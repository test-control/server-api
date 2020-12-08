
exports.seed = function (knex) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert([
        { id: 'cda57522-4cc7-4693-a27e-37ad36ec00fd', title: 'First project on TestControl', description: 'Great first project' },
        { id: 'bad41041-a0de-46c0-bfe2-047576e89390', title: 'Second project on TestControl', description: 'Great second project' },
        { id: '204f9e66-1fdc-4311-bcea-a5787d1c820d', title: 'Another project on TestControl', description: 'Great another project' }
      ])
    })
}
