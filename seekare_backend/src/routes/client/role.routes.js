const express = require('express');
const router = express.Router();

const roleController = require('../../controllers/role.controller');

router.route('/').get(roleController.getRoles).post(roleController.createRole);
router
  .route('/:roleID')
  .delete(roleController.deleteRole)
  .patch(roleController.updateRole);

module.exports = router;
