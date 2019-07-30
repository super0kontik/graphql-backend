const Event = require('../models/event');
const Booking = require('../models/booking');
module.exports ={

    bookings:async (args,req)=>{
        if(!req.isAuth){
            throw new Error('Forbidden');
        }
        try {
            return await Booking.find({user:req.userId}).populate('event').populate('user')
        }catch(e){
            console.log(e);
            throw e;
        }
    },


    bookEvent:async (args,req)=>{
        if(!req.isAuth){
            throw new Error('Forbidden');
        }
        const booking = new Booking({
            user:req.userId,
            event: await Event.findById(args.eventId)
        });
        const res = await booking.save();
        //console.log(res)
        return await Booking.findById(res.id)
            .populate('user')
            .populate('event');
    },


    cancelBooking: async (args,req)=>{
        if(!req.isAuth){
            throw new Error('Forbidden');
        }
        try{
            const  booking = await Booking.findById(args.bookingId).populate({
                path:'event',
                populate:{
                    path:'creator',
                    populate:{
                        path:'createdEvents'
                    }
                }
            });
            if(booking.user != req.userId){
                throw new Error('Forbidden');
            }
            await Booking.deleteOne({_id:args.bookingId});
            //console.log(booking.event);
            return booking.event
        }catch(e){
            console.log(e);
            throw e;
        }
    }
};