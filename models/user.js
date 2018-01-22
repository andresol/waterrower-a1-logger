function User(firstName, lastName) {
   this.firstName = firstName;
   this.lastName = lastName;
   this.id = this.getId();
}

User.prototype.getId = function () {
    return this.firstName + "_" + this.lastName;
};

User.prototype.getStravaAuthToken = function () {
    return "";
};
// export the class
module.exports = User;