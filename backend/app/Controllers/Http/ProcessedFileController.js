"use strict";
const User = use("App/Models/User");
const ProcessedFile = use("App/Models/ProcessedFile");

class ProcessedFileController {


  async getAll(){
    const processedFile = await ProcessedFile.all();
    return processedFile.rows;
  }

  async store({ request }) {
    const body = request.post();
    const { fileID, userID } = body;

    const user = await User.find(userID);

    try {
      return await user.processedFiles().create({
        file_id: fileID
      });
    } catch (e) {
      return 200;
    }
  }

  async get({ request }) {
    const body = request.post();
    const { fileID, userID } = body;

    const user = await User.find(userID);
    const res = (
      await user
        .processedFiles()
        .where("file_id", fileID)
        .fetch()
    ).toJSON();
    return res.length > 0;
  }
}

module.exports = ProcessedFileController;
