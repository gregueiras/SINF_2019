const Factory = use("Factory");
const Database = use("Database");

class ProcessedFileSeeder {
  async run() {
    const p1 = await Factory.model("App/Models/ProcessedFile").create({
      id: 1,
      user_id: 1,
      file_id: "2b1cf049-fcf0-4454-bf9b-fbc95ec72572",
      created_at: "2019-12-15 10:51:05",
      updated_at: "2019-12-15 10:51:05"
    });

    const p2 = await Factory.model("App/Models/ProcessedFile").create({
      id: 2,
      user_id: 1,
      file_id: "a5b69e84-c62d-4059-872d-9e289b7e2ede",
      created_at: "2019-12-15 10:52:05",
      updated_at: "2019-12-15 10:52:05"
    });

    const p3 = await Factory.model("App/Models/ProcessedFile").create({
      id: 3,
      user_id: 1,
      file_id: "528ceb92-f38b-4d55-b6af-cfd288cf6bd5",
      created_at: "2019-12-15 10:52:06",
      updated_at: "2019-12-15 10:52:06"
    });

    const p4 = await Factory.model("App/Models/ProcessedFile").create({
      id: 4,
      user_id: 1,
      file_id: "6e35df22-f1db-4108-9679-6c99793806ab",
      created_at: "2019-12-15 11:11:13",
      updated_at: "2019-12-15 11:11:13"
    });

    const p5 = await Factory.model("App/Models/ProcessedFile").create({
      id: 5,
      user_id: 1,
      file_id: "2947d809-2aac-4630-b9ad-07d05a8cefb1",
      created_at: "2019-12-15 11:12:07",
      updated_at: "2019-12-15 11:12:07"
    });

    const p6 = await Factory.model("App/Models/ProcessedFile").create({
      id: 6,
      user_id: 1,
      file_id: "39c612d5-bae0-4882-8cb4-0af6d578eebd",
      created_at: "2019-12-15 11:24:13",
      updated_at: "2019-12-15 11:24:13"
    });

    const p7 = await Factory.model("App/Models/ProcessedFile").create({
      id: 7,
      user_id: 1,
      file_id: "9d059e4b-66fb-41bc-93a9-d36204d94971",
      created_at: "2019-12-15 11:26:06",
      updated_at: "2019-12-15 11:26:06"
    });

    const p8 = await Factory.model("App/Models/ProcessedFile").create({
      id: 8,
      user_id: 1,
      file_id: "86e89ea4-a1ab-47e6-9784-f0e8e0718140",
      created_at: "2019-12-15 11:36:26",
      updated_at: "2019-12-15 11:36:26"
    });

    const p9 = await Factory.model("App/Models/ProcessedFile").create({
      id: 9,
      user_id: 1,
      file_id: "72d55a1e-0470-4bfc-9875-9897b000cf86",
      created_at: "2019-12-15 11:39:00",
      updated_at: "2019-12-15 11:39:00"
    });
  }
}

module.exports = ProcessedFileSeeder;
