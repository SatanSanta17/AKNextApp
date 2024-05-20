import { Order } from "@/models/Order";

export async function POST(req) {
  const { body, headers } = req;
  const signature = headers.get('X-Razorpay-Signature');

  try {
    const event = razorpay.webhooks.validate(body, signature);
    // Handle Razorpay events
    if (event.event === 'payment.captured') {
      const paymentId = event.payload.payment.entity.id;
      const orderId = event.payload.payment.entity.order_id;
      // Update order status in your database
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
    return new Response('ok', { status: 200 });
  } catch (error) {
    console.error('Razorpay webhook error:', error);
    return new Response('Webhook signature verification failed', { status: 400 });
  }
}
