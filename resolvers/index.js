const userResolvers = require('./users');
const bookingResolvers = require('./bookings');
const eventResolvers = require('./events');

module.exports={
    ...userResolvers,
    ...bookingResolvers,
    ...eventResolvers
};
