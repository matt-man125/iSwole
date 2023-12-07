import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.sendFile('bodymap.html', {root: './static'});
});

export default router;
