const { Schema, model } = require("mongoose");
const userSchema = Schema(
  {
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
    token: {
      type: String,
      default:null
    },
    avatar: {
      type: String,
      required:true
    }
},
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);



const Joi = require("joi");

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),

});


const joiLoginSchema = Joi.object({
     password: Joi.string().required(),
  email: Joi.string().required()
})

const joiSubscriptionSchema = Joi.object({
   password: Joi.string(),
  email: Joi.string(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),

})
module.exports = {
User,
  joiLoginSchema,
  joiRegisterSchema,
  joiSubscriptionSchema
};


