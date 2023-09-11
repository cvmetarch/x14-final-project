import Product from "../models/product.js";
import Order from "../models/order.js";

import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

export const orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email name");

    // send email
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_KEY;
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        'subject':'Trạng thái đơn hàng',
        'sender' : {'email': process.env.EMAIL_FROM, 'name':'CyberSilver'},
        'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
        'to' : [{'name': order.buyer.name, 'email': order.buyer.email}],
        'htmlContent' :
        `
        <html>
          <body>
            <p>Xin chào <b>${order.buyer.name}</b></p>
            <h2>Trạng thái đơn hàng của bạn là: <span style="color:red;">${order.status}</span></h2>
            <p>Truy cập <a href="${process.env.CLIENT_URL}">trang cá nhân</a> để xem thông tin chi tiết!</p>
            <hr>
            <p>{{params.bodyMessage}}</p>
          </body>
        </html>`,
        'params' : {'bodyMessage':'Trân trọng!'
      }}
    ).then(function(data) {
      console.log(data);
    }, function(error) {
      console.error(error);
    });
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

