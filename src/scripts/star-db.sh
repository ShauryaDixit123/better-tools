# #!/bin/bash
# set -e

# SERVER="postgres";
# PW="postgrespw";
# DB="better-tools";

# echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
# (docker kill $SERVER || :) && \
#   (docker rm $SERVER || :) && \
#   docker run --name $postgres -e POSTGRES_PASSWORD=$postgrespw \
#   -e PGPASSWORD=$PW \
#   -p 55003:5432 \
#   -d postgres

# # wait for pg to start
# echo "sleep wait for pg-server [$SERVER] to start";
# SLEEP 3;

# # create the db 
# echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
# echo "\l" | docker exec -i $SERVER psql -U postgres