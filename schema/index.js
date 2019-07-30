const {buildSchema}=require('graphql');
module.exports = buildSchema(`

        type Booking{
            _id: ID!
            event: Event!
            user: User!
            createdAt:String!
            updatedAt:String!
        }
        
        type Event{
            _id:ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator:User!
        }
        
        type User{
            _id:ID!
            email: String!
            createdEvents:[Event]
        }
        
        type AuthData{
            userId:ID!
            token:String!
        }
        
        type RootQuery{
            events:[Event!]!
            bookings:[Booking!]!
            login(email:String!,password:String!):AuthData!
        }
        
        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        input UserInput{
            email: String!
            password: String!
        }
        
        type RootMutation{
            createEvent(eventInput:EventInput):Event!
            createUser(userInput:UserInput):User
            bookEvent(eventId:ID!):Booking!
            cancelBooking(bookingId:ID!):Event!
        }
        
        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `);