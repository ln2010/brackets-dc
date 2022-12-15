#!/bin/bash

# Set the name of the container
container_name="my_postgres_db"

# Check if the container exists
if [[ $(docker inspect --format='{{.State.Running}}' "$container_name") == "" ]]; then
  # Container does not exist, create it
  docker run -d -p 5432:5432 --hostname db -e POSTGRES_DB=my_database -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres  --name "$container_name" postgres:15
else
  # Container exists, check if it is running
  if [[ $(docker inspect --format='{{.State.Running}}' "$container_name") == "true" ]]; then
    # Container is running, do nothing
    :
  else
    # Container is not running, start it
    docker start "$container_name"
  fi
fi