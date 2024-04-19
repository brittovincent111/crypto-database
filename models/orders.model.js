const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
    {
        orderType: {
            type: String,
            required: true,
            lowercase: true,
            enum: ["buy", "sell"],
        },
        buyPrice: {
            type: Number,
        },
        buyCurrentPrice: {
            type: Number,
        },
        sellPrice: {
            type: Number,
        },
        sellCurrentPrice: {
            type: Number,
        },
        profit: {
            type: Number,
        },
        leverage: {
            type: String,
        },
        description: {
            type: String,
        },
        ema: {
            type: String,
        },
        divergence: {
            type: String,
        },
        quantity: {
            type: String,
        },
        remark: {
            type: String,
        },
    },
    { timestamps: true }
);
const CryptoOrder = model("CryptoOrder", orderSchema);

module.exports = CryptoOrder;
