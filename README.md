docker exec -it todo-app-mongo-1 mongosh

use todo-app

db.users.find().pretty()

db.users.updateOne(
  { username: "Gab" },
  { $set: { accessLevel: "admin" } }
)

db.users.find({ accessLevel: "admin" }).pretty()
