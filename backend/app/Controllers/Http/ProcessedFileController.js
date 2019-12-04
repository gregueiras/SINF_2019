"use strict";
const User = use("App/Models/User");

class ProcessedFileController {
  async store({ request }) {
    const body = request.post();
    const { fileID, userID } = body;

    const user = await User.find(userID);

    return await user.processedFiles().create({
      file_id: fileID
    });
  }

  async get({ request }) {
    const body = request.post();
    const { fileID, userID } = body;

    const user = await User.find(userID);
    const res = (await user.processedFiles().where('file_id', fileID).fetch()).toJSON();
    return res.length > 0;
  }
}

module.exports = ProcessedFileController;
