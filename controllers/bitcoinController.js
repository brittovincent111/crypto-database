const sendErrorResponse = require("../helpers/sendErrorResponseHelper");
const CryptoOrder = require("../models/orders.model");
module.exports = {
    buyOrderRequest: async (req, res) => {
        try {
            console.log(req.body);
            const { isSell, currentPrice, price, ema, divergence, leverage } =
                req.body;
            let order;

            if (isSell) {
                order = await CryptoOrder.findOne({
                    sellPrice: price,
                    orderType: "sell",
                });

                order.buyPrice = Number(currentPrice);
                order.buyCurrentPrice = Number(currentPrice);
                order.profit = Number(currentPrice - order.sellPrice);
                await order.save();
            } else if (!isSell) {
                order = new CryptoOrder({
                    orderType: "buy",
                    buyPrice: Number(price),
                    buyCurrentPrice: Number(currentPrice),
                    ema,
                    divergence,
                    leverage,
                });

                await order.save();
            }

            res.status(200).json(order);
        } catch (e) {
            sendErrorResponse(res, 500, e);
        }
    },

    sellOrderRequest: async (req, res) => {
        try {
            const { isBuy, currentPrice, price, ema, divergence, leverage } =
                req.body;
            let order;
            if (isBuy) {
                order = await CryptoOrder.findOne({
                    buyPrice: price,
                    orderType: "buy",
                });
                order.sellPrice = Number(currentPrice);
                order.sellCurrentPrice = Number(currentPrice);
                order.profit = Number(order.buyPrice - currentPrice);
                await order.save();
            } else if (!isBuy) {
                order = new CryptoOrder({
                    orderType: "sell",
                    sellPrice: Number(price),
                    sellCurrentPrice: Number(currentPrice),
                    ema,
                    divergence,
                    leverage,
                });
                await order.save();
            }
            res.status(200).json(order);
        } catch (e) {
            sendErrorResponse(res, 500, e);
        }
    },
};
