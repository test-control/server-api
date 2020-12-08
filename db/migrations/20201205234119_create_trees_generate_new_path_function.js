const dataSpQueries = {
  mssql: `
create function trees_generate_new_path(@parent_path varchar(255)) 
returns varchar(255) as
begin
   declare @last_leaf int
   declare @new_path varchar(255)
   declare @parent_id varchar(255)

   select @parent_id = id from trees where tree_path = @parent_path

   if (@parent_id is null)
       RETURN CAST('Cannot find parent leaf' AS INT)

   set @last_leaf = (select cast(replace(tree_path,concat(@parent_path, '.'), '') as int) as spath from trees  where tree_path LIKE concat(@parent_path, '[.][0-9]') order by spath desc OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY)

   if @last_leaf is null
       select @new_path = concat(@parent_path, '.', 1)
   else
       select @new_path = concat(@parent_path, '.', @last_leaf + 1)

   return @new_path
end
  `,
  mysql: `
create function trees_generate_new_path(parent_path varchar(255)) 
returns varchar(255)
begin
  declare last_leaf integer;
  declare new_path varchar(255);
  declare parent_id varchar(255);

  select id into parent_id from trees where tree_path = parent_path;
        
  if parent_id is null then
    signal sqlstate '45000'
    set MESSAGE_TEXT = 'Cannot find parent leaf';
  end if;
  
  select cast(replace(tree_path,concat(parent_path, '.'), '') as signed) as spath into last_leaf from trees where tree_path REGEXP CONCAT('^', parent_path, '\\.[0-9]{1,}$') order by spath desc limit 1;

  if last_leaf is null then        
   select concat(parent_path, '.', 1) into new_path;
  else 
   select concat(parent_path, '.', last_leaf + 1) into new_path;
  end if;
  
  return new_path;
end;
  `,
  postgresql: `
  create or replace function trees_generate_new_path(parent_path TEXT)
returns text AS $$
declare last_leaf integer;
declare new_path text;
declare parent_id text;
begin

  select id into parent_id from trees where tree_path = parent_path;
        
  if parent_id is null then
    raise exception 'Cannot find parent leaf with %:', parent_path;
  end if;

  select cast(replace(tree_path, parent_path || '.', '') as int) as spath into last_leaf from trees where tree_path ~ ('^' || parent_path || '\\:[0-9]{1,}$') order by spath desc limit 1;

  if last_leaf is null then        
   select concat(parent_path, '.', 1) into new_path;
  else 
   select concat(parent_path, '.', last_leaf + 1) into new_path;
  end if;
  
  return new_path;
end;
$$  language plpgsql;`
}

exports.up = function (knex) {
  return knex.schema.raw(dataSpQueries[process.env.DATABASE_ENGINE])
}

exports.down = function (knex) {
  return knex.schema.raw('drop function trees_generate_new_path')
}
