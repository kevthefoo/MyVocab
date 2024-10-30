import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { Webhook } from 'clerk-sdk-node';

const webhook = new Webhook(process.env.CLERK_API_SECRET);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Verify the webhook signature
  try {
    const event = webhook.verifyEvent(req.body, req.headers);

    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = event.data;

      // Connect to MongoDB
      await dbConnect();

      // Create a new user in MongoDB
      await User.create({
        clerkId: id,
        email: email_addresses[0]?.email_address,
        firstName: first_name,
        lastName: last_name,
      });

      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ message: 'Unhandled event type' });
    }
  } catch (error) {
    console.error('Error processing webhook', error);
    res.status(400).send('Webhook Error');
  }
}
