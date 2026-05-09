# Running idrflow with Docker

This guide will help you get idrflow up and running using Docker and Docker Compose.

> Note: This example currently uses the upstream `langflowai/langflow` Docker image. When the official idrflow image is published, replace the `image` field in `docker-compose.yml` with the idrflow-owned image. The compose service name, volume names, and image identifier are kept aligned with the upstream image so the example works out of the box.

## Prerequisites

- Docker
- Docker Compose

## Steps

1. Clone the idrflow repository into your local environment.

2. Navigate to the `docker_example` directory at the repository root:

   ```sh
   cd <repo-dir>/docker_example
   ```

3. Run the Docker Compose file:

   ```sh
   docker compose up
   ```

idrflow will now be accessible at [http://localhost:7860/](http://localhost:7860/).

## Docker Compose Configuration

The Docker Compose configuration spins up two services: the idrflow runtime and `postgres`.

### idrflow service

The `langflow` service (named for image compatibility with the upstream container) uses the `langflowai/langflow:latest` Docker image and exposes port 7860. It depends on the `postgres` service.

Environment variables:

- `IDRFLOW_DATABASE_URL`: The connection string for the PostgreSQL database.
- `IDRFLOW_CONFIG_DIR`: The directory where idrflow stores logs, file storage, monitor data, and secret keys.

Volumes:

- `langflow-data`: This volume is mapped to `/app/langflow` in the container.

### PostgreSQL Service

The `postgres` service uses the `postgres:16` Docker image and exposes port 5432.

Environment variables:

- `POSTGRES_USER`: The username for the PostgreSQL database.
- `POSTGRES_PASSWORD`: The password for the PostgreSQL database.
- `POSTGRES_DB`: The name of the PostgreSQL database.

Volumes:

- `langflow-postgres`: This volume is mapped to `/var/lib/postgresql/data` in the container.

## Switching to a specific upstream image version

If you want to pin a specific version of the upstream image, modify the `image` field under the `langflow` service in the Docker Compose file. For example, to use version `1.0-alpha`, change `langflowai/langflow:latest` to `langflowai/langflow:1.0-alpha`.
