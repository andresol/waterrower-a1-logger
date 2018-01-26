// FIT - Flexible and Interoperable Data Transfer
// Strava strives to comply with the FIT Activity File (FIT_FILE_TYPE = 4) spec as defined in the official FIT SDK.
//
//     Many, many, attributes are defined by FIT. Below is an overview of those used by Strava.
//
//     MESSAGE TYPES	ATTRIBUTES
// file_id	manufacturer
// product
// time_created
// session	sport
// total_elapsed_time
// total_timer_time
// total_distance
// total_ascent
// lap	timestamp
// total_elapsed_time
// total_timer_time
// total_distance
// total_ascent
// record	timestamp
// position_lat
// position_long
// altitude
// heart_rate
// cadence
// distance
// power
// temperature
// event	timestamp
// type
//
// Activity type is detected from session.sport.
