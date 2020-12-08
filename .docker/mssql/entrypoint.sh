#!/bin/bash
set -e
if [ "$1" = '/opt/mssql/bin/sqlservr' ]; then
  if [ ! -f /var/opt/mssql/data ]; then
    function initialize_app_database() {
      sleep 15s
      /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Your_password123 -d master -i /mssql-init/setup.sql
      touch /var/opt/mssql/data
    }
    initialize_app_database &
  fi
fi
exec "$@"
