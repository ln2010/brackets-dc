#!/bin/sh

# Set the name of the container
container_name="my_postgres_db"

# Check if the container is already running
if [ $(docker inspect -f '{{.State.Running}}' "$container_name") == "true" ]; then
  # Container is running, start it
  docker start "$container_name"
else
  # Container is not running, run it
  docker run -d -p 5432:5432 --hostname db -e POSTGRES_DB=my_database -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres  --name "$container_name" postgres:15
fi