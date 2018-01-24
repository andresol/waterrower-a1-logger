function User(firstName, lastName) {
   this.firstName = firstName;
   this.lastName = lastName;
}

User.prototype.getStravaAuthToken = function () {
    return "";
};
// export the class
module.exports = User;