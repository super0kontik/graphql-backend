const userResolvers = require('./users');
const bookingResolvers = require('./bookings');
const eventResolvers = require('./events');

module.exports={
    ...userResolvers,
    ...bookingResolvers,
    ...eventResolvers
};

// mutation{
//     cancelBooking(bookingId:"5d2f34e9ca1b8e59fb11b42e"){
//         title
//         creator{
//             email
//             createdEvents{
//                 title
//             }
//         }
//     }
// }

// mutation{
//     bookEvent(eventId:"5d2ef15e45fb632e61ce7469"){
//         user{
//             email
//         }
//         event{
//             title
//         }
//         createdAt
//     }
// }