const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({
  path: `${process.env.NODE_ENV === 'development' ? '.dev.env' : '.env'}`
});
const { dbUrl } = require('./misc/dbconfig');
const userRoutes = require('./routes/client/users');
const questionRoutes = require('./routes/client/question.routes');
const answerRoutes = require('./routes/client/answer.routes');
const tagRoutes = require('./routes/client/tag.routes');
const wikiRoutes = require('./routes/client/wiki.routes');
const roleRoutes = require('./routes/client/role.routes');
const emailRoutes = require('./routes/client/email.routes');
const paymentRoutes = require('./routes/client/payment.routes');
const enlistEmailRoutes = require('./routes/client/enlistedEmail.routes');
const categoryRoutes = require('./routes/client/category.routes');
const emailServiceRoutes = require('./routes/client/emailService.routes');
const adminRoutes = require('./routes/admin/index.routes');
const tocRoutes = require('./routes/client/toc.routes');
const tocVisitedRoutes = require('./routes/client/tocVisited.routes')
// global.cron = require("./db/backupAuto");
console.log(dbUrl);

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb'
  })
);

app.use(
  cors({
    origin: '*'
  })
);

app.get('/ping', (req, res) => {
  console.log('here');
  res.status(200).json({ message: 'pong' });
});
// app.use('/', express.static('public'));
app.use(express.static(__dirname + '/'));
app.use(passport.initialize());

const apiV1 = express.Router();
app.use('/api/v1', apiV1);
apiV1.use('/uploads', express.static('uploads'));
apiV1.use(
  '/db',
  require('./middleware/adminProtected'),
  express.static('backups')
);

require('./misc/config')(passport);

apiV1.use('/users', userRoutes);
apiV1.use('/questions', questionRoutes);
apiV1.use('/answers', answerRoutes);
apiV1.use('/tags', tagRoutes);
apiV1.use('/wiki', wikiRoutes);
apiV1.use('/roles', roleRoutes);
apiV1.use('/email', emailRoutes);
apiV1.use('/service', emailServiceRoutes);
apiV1.use('/payment', paymentRoutes);
apiV1.use('/enlisted', enlistEmailRoutes);
apiV1.use('/categories', categoryRoutes);
apiV1.use('/admin', adminRoutes);
apiV1.use('/toc', tocRoutes);
apiV1.use('/tocVisit',tocVisitedRoutes);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        'connected to db and running server on port ',
        process.env.PORT || 5000
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
