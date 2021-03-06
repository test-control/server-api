const helpers = require('../migration-helpers')
const displayOrderFunc = helpers.getFullTableName('test_case_display_order')
const displayOrderChangeFunc = helpers.getFullTableName('test_cases_change_display_order')
const tableName = helpers.getFullTableName('test_cases')

const dataSpQueries = {
  mssql: [
    `
    create trigger tes_cases_display_order_creating on
      ${tableName} after insert as
    begin
        declare @last_order int;
        declare @new_order int;
        declare @last_tree_id varchar(255);
        declare @last_id varchar(255);
                
        select @last_tree_id = tree_id from inserted;
        select @last_id = id from inserted;
        select @last_order = display_order from ${tableName} where tree_id = @last_tree_id order by display_order desc offset 0 rows fetch next 1 rows only;
      
        if @last_order is null
         set @new_order = 1;
        else
         set @new_order = @last_order + 1;
         
        update ${tableName} SET display_order = @new_order where id = @last_id;
    end;
    `,
    `
    create procedure ${displayOrderChangeFunc}(@fromOrder varchar(255), @targetOrder varchar(255)) as
    begin
        declare @targetDisplayOrder int;
        declare @targetTreeId varchar(255);
        
        declare @fromDisplayOrder int;
        declare @fromTreeId varchar(255);
    
        select @fromDisplayOrder = display_order, @fromTreeId = tree_id from ${tableName} where id = @fromOrder;
        select @targetDisplayOrder = display_order, @targetTreeId = tree_id from ${tableName} where id = @targetOrder;
       
        if @targetDisplayOrder < @fromDisplayOrder 
        begin
            update ${tableName} set display_order = display_order + 1 where tree_id = @fromTreeId and display_order >= @targetDisplayOrder and display_order < @fromDisplayOrder;
            update ${tableName} set display_order = @targetDisplayOrder where id = @fromOrder;
        end
        else
        begin
            update ${tableName} set display_order = display_order - 1 where tree_id = @fromTreeId and display_order > @fromDisplayOrder and display_order <= @targetDisplayOrder;
            update ${tableName} set display_order = @targetDisplayOrder where id = @fromOrder;
        end;
    end;
    `
  ],
  mysql: [
    `
    create trigger tes_cases_display_order_creating before insert on
      ${tableName} for each row
    begin
        declare last_order integer;
        
        select display_order into last_order from ${tableName} where tree_id = NEW.tree_id order by display_order desc limit 1;
      
        if last_order is null then
         set NEW.display_order = 1;
        else
         set NEW.display_order = last_order + 1;
        end if;
    end;
    `,
    `
    create procedure ${displayOrderChangeFunc}(fromOrder varchar(255), targetOrder varchar(255))
    begin
        declare targetDisplayOrder integer;
        declare targetTreeId varchar(255);
        
        declare fromDisplayOrder integer;
        declare fromTreeId varchar(255);
    
        select display_order, tree_id into fromDisplayOrder, fromTreeId from ${tableName} where id = fromOrder;
        select display_order, tree_id into targetDisplayOrder, targetTreeId from ${tableName} where id = targetOrder;
    
        if targetDisplayOrder < fromDisplayOrder then
            update ${tableName} set display_order = display_order + 1 where tree_id = fromTreeId and display_order >= targetDisplayOrder and display_order < fromDisplayOrder;
            update ${tableName} set display_order = targetDisplayOrder where id = fromOrder;
        else
            update ${tableName} set display_order = display_order - 1 where tree_id = fromTreeId and display_order > fromDisplayOrder and display_order <= targetDisplayOrder;
            update ${tableName} set display_order = targetDisplayOrder where id = fromOrder;
        end if;
    end;
    `
  ],
  postgresql: [
    `
CREATE OR REPLACE FUNCTION ${displayOrderFunc}()
RETURNS trigger AS $$
declare last_order integer;

BEGIN

   SELECT display_order into last_order from ${tableName} where tree_id = NEW.tree_id order by display_order desc limit 1;

   if last_order is null then
    NEW.display_order = 1;
   else
    new.display_order = last_order + 1;
   end if;

RETURN NEW;

END;
$$  language plpgsql;
`,
    `
CREATE TRIGGER tes_cases_display_order_creating
    BEFORE INSERT ON ${tableName}
    FOR EACH ROW
EXECUTE PROCEDURE ${displayOrderFunc}();
    `,
    `
    create or replace procedure ${displayOrderChangeFunc}(fromOrder uuid, targetOrder uuid)
    AS $$
declare targetRow record;
declare fromRow record;
begin
    select display_order, tree_id into fromRow from ${tableName} where id = fromOrder;
    select display_order into targetRow from ${tableName} where id = targetOrder;

    if targetRow.display_order < fromRow.display_order then
        update ${tableName} set display_order = display_order + 1 where tree_id = fromRow.tree_id and display_order >= targetRow.display_order and display_order < fromRow.display_order;
        update ${tableName} set display_order = targetRow.display_order where id = fromOrder;
    else
        update ${tableName} set display_order = display_order - 1 where tree_id = fromRow.tree_id and display_order > fromRow.display_order and display_order <= targetRow.display_order;
        update ${tableName} set display_order = targetRow.display_order where id = fromOrder;
    end if;

end;
$$  language plpgsql;
    `
  ]
}

exports.up = async function (knex) {
  for (const mg of dataSpQueries[process.env.DATABASE_ENGINE]) {
    await knex.schema.raw(mg)
  }
}

exports.down = function (knex) {
  return knex.schema.raw(`drop function ${displayOrderChangeFunc}`)
}
