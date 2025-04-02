print("Starting replica set initialization...");
rs.initiate({
  _id: "rs",
  members: [{ _id: 0, host: "localhost:27017" }]
});
print("Replica set initialized");