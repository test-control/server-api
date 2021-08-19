# under development
# Server environments
For details please check schema file in ./specs/schemas/envs.yaml.
Below example settings from docker environment:
```
APP_DEBUG=false
POSTGRESQL_CONNECTION_STRING="postgres://user:pass@postgres:5432/db?sslmode=disable"
SERVER_PORT=3000
CORS_ORIGIN="http://172.20.0.10:3000"
```

# Private/Public keys:
Remember to generate public/private keys for JWT in path secrets/jwt
