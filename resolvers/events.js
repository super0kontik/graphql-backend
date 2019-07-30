const Event = require('../models/event');
const User = require('../models/user');

module.exports ={

    events:async ()=>{
        try {
            return await Event.find()
                .populate({
                    path: 'creator',
                    populate: {path: 'createdEvents'}
                });
        }catch(e){
            console.log(e);
            throw e;
        };
    },


    createEvent:async (args,req)=>{
        if(!req.isAuth) {
            throw new Error('Forbidden');
        }
        try {
            const arg = args.eventInput;
            arg.date = new Date(arg.date);
            arg.creator = req.userId;
            const event = new Event(arg);
            const res = await event.save();
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error('User does not exist')
            }
            user.createdEvents.push(event);
            await user.save();
            return await Event.findById(event._id)
                .populate({
                    path: 'creator',
                    populate: {path: 'createdEvents'}
                })
        }catch(e){
            console.log(e);
            throw e;
        };
    }

};