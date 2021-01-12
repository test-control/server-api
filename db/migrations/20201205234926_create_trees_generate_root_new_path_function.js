const dataSpQueries = {
  mssql: `
create function test_control.trees_generate_root_new_path()
    returns varchar(255) as
begin
    declare @last_leaf int
    declare @new_path varchar(255)

    set @last_leaf = (select cast(tree_path as int) as pathNumber from test_control.trees where charindex('.', tree_path) <1 order by pathNumber desc offset 0 rows fetch next 1 rows only)
    
    if @last_leaf is null
        select @new_path = 1
    else
        select @new_path = @last_leaf + 1

    return @new_path
end
`,
  mysql: `
create function test_control.trees_generate_root_new_path() 
returns varchar(255)
begin
  declare last_leaf integer;
  declare new_path varchar(255);

  select cast(tree_path as signed) as spath into last_leaf from test_control.trees where tree_path REGEXP '^[0-9]{1,}$' order by spath desc limit 1;

  if last_leaf is null then        
   select 1 into new_path;
  else 
   select last_leaf + 1 into new_path;
  end if;
  
  return new_path;
end;
`,
  postgresql: `
  create or replace function test_control.trees_generate_root_new_path()
returns text AS $$
declare last_leaf integer;
declare new_path text;
begin

  select cast(tree_path as int) as spath into last_leaf from test_control.trees where tree_path ~ '^[0-9]{1,}$' order by spath desc limit 1;

  if last_leaf is null then        
   select 1 into new_path;
  else 
   select last_leaf + 1 into new_path;
  end if;
  
  return new_path;
end;
$$  language plpgsql;`
}

exports.up = function (knex) {
  return knex.schema.withSchema('test_control').raw(dataSpQueries[process.env.DATABASE_ENGINE])
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').raw('drop function trees_generate_root_new_path')
}
