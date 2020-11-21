#!/bin/bash
npm run db:migrate:latest || exit 1

npm run dev