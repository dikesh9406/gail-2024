import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide motor name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide motor brand'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Working', 'Faulty', 'Not Working'],
      default: 'Not Working',
    },
    jobType: {
      type: String,
      enum: ['MT', 'LT', 'ST'],
      default: 'MT',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'User',
    //   required: [true, 'Please provide user'],
    // },
    Manufacturer: {
      type: String,
      default: 'ABB',
      required: false,
    },
    Disign_Life: {
      type: String,
      default: '10',
      required: true,
    },
    Power_Rating: {
      type: String,
      default: '10',
      required: true,
    },
    Voltage: {
      type: String,
      default: '10',
      required: true,
    },
    Current: {
      type: String,
      default: '10',
      required: true,
    },
    Frequency: {
      type: String,
      default: '10',
      required: true,
    },
    Speed: {
      type: String,
      default: '10',
      required: true,
    },
    No_of_poles: {
      type: String,
      default: '10',
      required: true,
    },


    

  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
