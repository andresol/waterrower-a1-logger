function User(firstName, lastName) {
   this.firstName = firstName;
   this.lastName = lastName;
}

User.prototype.getStravaAuthToken = function () {
    return this.stravaKey;
};
// export the class
module.exports = User;