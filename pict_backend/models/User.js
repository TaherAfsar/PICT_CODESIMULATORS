const usersCollection = require("../db").db().collection("users");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  this.data = {
    userFirstName: this.data.accountFirstName,
    userLastName: this.data.accountLastName,
    userEmail: this.data.accountEmail,
    userMobileNo: this.data.accountMobileNo,
    userPassword: this.data.accountPassword,
    role: "user",
    // More fields will come later
    userImage: null,
    eventsRegisteredIn: [],
    certificates: [],
    favoriteItems: [],
    taskCompleted: Number(0),
    certificateReceived: Number(0),
    reward: Number(0),
    createdDate: new Date(),
  };
};

User.prototype.signUp = async function () {
  this.cleanUp();
  let salt = bcrypt.genSaltSync(10);
  this.data.userPassword = bcrypt.hashSync(this.data.userPassword, salt);
  let data = await usersCollection.insertOne(this.data);

  let userDoc = await usersCollection.findOne({
    _id: new ObjectID(data.insertedId),
  });

  return {
    message: "ok",
    data: userDoc,
  };
};

User.prototype.getUserByEmail = async function (email) {
  let data = await usersCollection.findOne({ userEmail: email });

  return {
    message: "ok",
    data: data,
  };
};

User.prototype.getUserById = async function (userId) {
  let data = await usersCollection.findOne({ _id: new ObjectID(userId) });
  return data;
};

User.prototype.editProfile = async function ({
  userFirstName,
  userLastName,
  userEmail,
  userImage,
}) {
  let data = await usersCollection.findOneAndUpdate(
    {
      userEmail: userEmail,
    },
    {
      $set: {
        userFirstName: userFirstName,
        userLastName: userLastName,
        userEmail: userEmail,
        userImage: userImage,
      },
    }
  );

  return true;
};

module.exports = User;
