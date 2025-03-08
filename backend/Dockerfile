FROM mongo:4.4.7

# Copy the initialization script
COPY init-replica.js /docker-entrypoint-initdb.d/

# Set the command to run MongoDB with replica set enabled
CMD ["mongod", "--bind_ip_all", "--replSet", "rs"]