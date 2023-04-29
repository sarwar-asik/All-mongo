const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const StockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Provide a Stock name"],
      maxLength: [100, "Name is too longer"],
      unique: [true, "Name must be Unique"],
      minLength: [2, "Name must be 2 character."],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: String,
      required: true,
      min: [0, "Product quantity cannot be negative"],
    },
    
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can not be {VALUE} . must be kg/litre/pcs/bag",
      },
    },
    imageURL: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!Array.isArray(value)) {
            return false;
          }
          let isValid = true;
          value.forEach((url) => {
            if (!validator.isURL(url)) {
              isValid = false;
            }
          });
          return isValid;
        },
        message: "Please provide valid url",
      },
    },
    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status  can not be  {VALUES} ",
      },
    },
    store:{
        name: {
            type: String,
            trim: true,
            required: [true, "Provide a Store name"],
            maxLength: 100,
            unique: true,
            lowercase: true,
            enum: {
              values: ["dhaka", "chattogram","rajshahi","khulna", "barishal", "mymansing","rangpur", ],
              message: "{VALUE} is not value name",
            },
          },
          id:{
            type:ObjectId,
            required:true,
            ref:"Store"
          }
    },
    supplierBy:{
        name:{
            type: String,
            trim: true,
            required: [true, "Provide a Store name"]
        },
        id:{
            type:ObjectId,
            required:true,
            ref:"Supplier"
            
        }
    }
  },
  {
    timestamps: true,
  }
);

const StockModel = mongoose.model("Stock", StockSchema);

export default StockModel;
