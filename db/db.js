var level = require('level');
var path = require('path');

var dbSessionPath = process.env.DB_PATH_SESSION || path.join(__dirname, 'waterrower_sessions');
var dbRoutePath = process.env.DB_PATH_ROUTE || path.join(__dirname, 'waterrower_route');
var dbUserPath = process.env.DB_PATH_SESSION || path.join(__dirname, 'waterrower_users');
var dbSessions = level(dbSessionPath);
var dbRoutes = level(dbRoutePath);
var dbUsers = level(dbUserPath);

module.exports = {
    sessions: dbSessions,
    routes: dbRoutes,
    users: dbUsers
};

