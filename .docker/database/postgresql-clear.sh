#!/bin/sh

export PGPASSWORD='pass'
psql -h db -U user postgres -c "
drop database db;"

exit
