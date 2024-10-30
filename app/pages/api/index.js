import dbConnect from '../../../lib/dbConnect';
import Vocabulary from '../../../models/UserData';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const vocabularies = await Vocabulary.find({});
        res.status(200).json({ success: true, data: vocabularies });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const vocabulary = await Vocabulary.create(req.body);
        res.status(201).json({ success: true, data: vocabulary });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
