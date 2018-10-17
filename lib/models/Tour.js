const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Path `title` is required.']
    },
    activities: {
        type: [String],
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    stops: [{
        required: false,
        location: {
            city: String,
            state: {
                type: String,
                enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
            },
            zip: Number
        },
        weather: {
            temprature: String,
            condition: String
        },
        attendence: {
            type: Number,
            min: 1
        }
    }],
},
{
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret._id;
        }
    }
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
