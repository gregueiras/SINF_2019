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

    const p10 = await Factory.model("App/Models/ProcessedFile").create({
      id: 10,
      user_id: 1,
      file_id: "0d7487f7-db57-4ece-9fde-9ed1fd2d975a",
      created_at: "2019-12-15 16:12:23",
      updated_at: "2019-12-15 16:12:23"
    });

    const p11 = await Factory.model("App/Models/ProcessedFile").create({
      id: 11,
      user_id: 1,
      file_id: "f7d6fd56-12e6-485b-98d2-add7da0c9084",
      created_at: "2019-12-15 16:12:23",
      updated_at: "2019-12-15 16:12:23"
    });

    const p12 = await Factory.model("App/Models/ProcessedFile").create({
      id: 12,
      user_id: 1,
      file_id: "b6d27501-be99-42c8-8662-cc71b96dc130",
      created_at: "2019-12-15 16:12:24",
      updated_at: "2019-12-15 16:12:24"
    });

    const p13 = await Factory.model("App/Models/ProcessedFile").create({
      id: 13,
      user_id: 1,
      file_id: "aec6f98d-b297-4631-adfa-dca661f23973",
      created_at: "2019-12-15 16:12:24",
      updated_at: "2019-12-15 16:12:24"
    });

    const p14 = await Factory.model("App/Models/ProcessedFile").create({
      id: 14,
      user_id: 1,
      file_id: "a38ef783-0589-4652-8465-e071254ec028",
      created_at: "2019-12-15 16:12:25",
      updated_at: "2019-12-15 16:12:25"
    });

    const p15 = await Factory.model("App/Models/ProcessedFile").create({
      id: 15,
      user_id: 1,
      file_id: "a6b9c958-d948-44f3-aaa7-e55056553248",
      created_at: "2019-12-15 16:12:25",
      updated_at: "2019-12-15 16:12:25"
    });

    const p16 = await Factory.model("App/Models/ProcessedFile").create({
      id: 16,
      user_id: 1,
      file_id: "f7012840-24b5-4d9f-98e0-2014f8cc5d27",
      created_at: "2019-12-15 16:13:11",
      updated_at: "2019-12-15 16:13:11"
    });
  }
}

module.exports = ProcessedFileSeeder;
