const Puff = require('../../models/puff');
const User = require('../../models/user');
/**
 * GET | List of Puffs
 */
exports.list = (req, res) => {
  req.log.debug('GET/Puff/list');
  return Puff.find({}).populate('author').then(puffs => {
    if (!puffs) {
      res.status(404)
        .send({
          message: 'Puff not Found',
        });
    } else {
      res.status(200)
        .send({
          puffs,
        });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * GET | Puff by ID
 */
exports.get = (req, res) => {
  req.log.debug('GET/Puff/get');
  return Puff.findOne({
    _id: req.params.id,
  }).populate('author').then(puff => {
    if (!puff) {
      res.status(404)
        .send({
          message: 'Puff not Found',
        });
    } else {
      res.status(200)
        .send({
          puff,
        });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * POST | Create a Puff
 */
exports.create = (req, res) => {
  req.log.debug('POST/Puff/create');
  let puffData = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    comments: req.body.comments,
    meta: req.body.meta,
  };
  return Puff.create(puffData).then(puff => {
    if (puff) {
      User.findOne({
        username: req.body.username,
      }).then(user => {
        if (!user) {
          res.status(404)
            .send({
              message: 'Puff not Found',
            });
        } else {
          puff.author = user._id;
          puff.save();
          user.puffs.push(puff);
          user.save();
          res.status(200)
            .send({
              message: 'Puff created successfully',
              puff,
            });
        }
      });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * PUT | Update Puff by ID
 */
exports.update = (req, res) => {
  req.log.debug('PUT/Puff/update');
  return Puff.findOne({
    _id: req.params.id,
  }).then(puff => {
    if (!puff) {
      res.status(404)
        .send({
          message: 'Puff not Found',
        });
    } else {
      puff.title = req.body.title;
      puff.content = req.body.content;
      puff.tags = req.body.tags;
      puff.comments = req.body.comments;
      puff.meta = req.body.meta;
      puff.hidden = req.body.hidden;
      puff.save();
      res.status(200)
        .send({
          message: 'Puff data updated successfully',
          puff,
        });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * DELETE | Puff by ID
 */
exports.remove = (req, res) => {
  req.log.debug('DELETE/Puff/remove');
  return Puff.findOne({
    _id: req.params.id,
  }).then(puff => {
    if (!puff) {
      res.status(404)
        .send({
          message: 'Puff not Found',
        });
    } else {
      User.findOne({
        _id: puff.author,
      }).then(user => {
        user.puffs.remove(req.params.id);
        user.save();
        puff.remove();
        res.status(200)
          .send({
            message: 'Puff removed successfully',
            puff,
          });
      });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * POST | Puff with an image
 */
exports.createWithFile = (req, res) => {
  req.log.debug('POST/Puff/createWithFile');
  let puffData = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    comments: req.body.comments,
    meta: req.body.meta,
    image: req.file.path,
  };
  return Puff.create(puffData).then(puff => {
    if (puff) {
      User.findOne({
        username: req.body.username,
      }).then(user => {
        if (!user) {
          res.status(404)
            .send({
              message: 'Puff not Found',
            });
        } else {
          puff.author = user._id;
          puff.save();
          user.puffs.push(puff);
          user.save();
          res.status(200)
            .send({
              message: 'Puff created successfully',
              puff,
            });
        }
      });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * PUT | Update Puff with an image
 */
exports.updateWithFile = (req, res) => {
  req.log.debug('POST/Puff/updateWithFile');
  return Puff.findOne({
    _id: req.params.id,
  }).then(puff => {
    if (!puff) {
      res.status(404)
        .send({
          message: 'Puff not Found',
        });
    } else {
      puff.title = req.body.title;
      puff.content = req.body.content;
      puff.tags = req.body.tags;
      puff.comments = req.body.comments;
      puff.meta = req.body.meta;
      puff.hidden = req.body.hidden;
      puff.image = req.file.path;
      puff.save();
      res.status(200)
        .send({
          message: 'Puff data updated successfully',
          puff,
        });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};