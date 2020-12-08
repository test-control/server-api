#!/bin/bash

# This is version of local development entrypoint

npm run check-system || exit 1

npm run db:migrate:latest || exit 1

npm run db:seed || exit 1

npm run dev
