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

    //purchases orders

    const p17 = await Factory.model("App/Models/ProcessedFile").create({
      id: 17,
      user_id: 1,
      file_id: "ed427c08-fb11-ea11-b265-0003ff245385"
    });

    const p18 = await Factory.model("App/Models/ProcessedFile").create({
      id: 18,
      user_id: 1,
      file_id: "4182487c-fb11-ea11-b265-0003ff245385"
    });

    const p19 = await Factory.model("App/Models/ProcessedFile").create({
      id: 19,
      user_id: 1,
      file_id: "b04ec55e-db09-4025-bd6b-00cd0289f14b"
    });

    const p20 = await Factory.model("App/Models/ProcessedFile").create({
      id: 20,
      user_id: 1,
      file_id: "5257fdf0-4706-4740-8a69-2281e292d87e"
    });

    const p21 = await Factory.model("App/Models/ProcessedFile").create({
      id: 21,
      user_id: 1,
      file_id: "87ef65f6-0a3a-414a-926c-27407a9cb734"
    });

    const p22 = await Factory.model("App/Models/ProcessedFile").create({
      id: 22,
      user_id: 1,
      file_id: "f2970318-ef59-4bff-a890-3350abbe3227"
    });

    const p23 = await Factory.model("App/Models/ProcessedFile").create({
      id: 23,
      user_id: 1,
      file_id: "60fa72ae-df7e-440c-b1cb-41804db6f7d0"
    });

    const p24 = await Factory.model("App/Models/ProcessedFile").create({
      id: 24,
      user_id: 1,
      file_id: "8b221d58-77d2-4c94-a9cc-44a930b18661"
    });

    const p25 = await Factory.model("App/Models/ProcessedFile").create({
      id: 25,
      user_id: 1,
      file_id: "8102ae4e-4966-4b65-9813-5c9902fbd883"
    });

    const p26 = await Factory.model("App/Models/ProcessedFile").create({
      id: 26,
      user_id: 1,
      file_id: "049b5d59-b794-4865-8027-5e5dcc574355"
    });

    const p27 = await Factory.model("App/Models/ProcessedFile").create({
      id: 27,
      user_id: 1,
      file_id: "6a725abe-230a-44a5-9bb8-6319cc4c7c98"
    });

    const p28 = await Factory.model("App/Models/ProcessedFile").create({
      id: 28,
      user_id: 1,
      file_id: "062ad64c-0609-4ae5-9d27-7000c185b667"
    });

    const p29 = await Factory.model("App/Models/ProcessedFile").create({
      id: 29,
      user_id: 1,
      file_id: "b5847fb6-dbce-4c8e-87ba-808a142bd360"
    });

    const p30 = await Factory.model("App/Models/ProcessedFile").create({
      id: 30,
      user_id: 1,
      file_id: "ddb09457-14de-4c09-920a-8debd55f7c55"
    });

    const p31 = await Factory.model("App/Models/ProcessedFile").create({
      id: 31,
      user_id: 1,
      file_id: "5522edeb-e422-43c1-b5c8-915817ebedce"
    });

    const p32 = await Factory.model("App/Models/ProcessedFile").create({
      id: 32,
      user_id: 1,
      file_id: "660b82e8-9b51-4de6-9ddf-92b5dd3f529d"
    });

    const p33 = await Factory.model("App/Models/ProcessedFile").create({
      id: 33,
      user_id: 1,
      file_id: "a0843716-499e-4637-9ed6-a3c45457c400"
    });

    const p34 = await Factory.model("App/Models/ProcessedFile").create({
      id: 34,
      user_id: 1,
      file_id: "21057e6a-d827-4f91-9dec-bb9cd49d274b"
    });

    const p35 = await Factory.model("App/Models/ProcessedFile").create({
      id: 35,
      user_id: 1,
      file_id: "3386ac04-b74a-47eb-a8f2-bc7b2c795df4"
    });

    const p36 = await Factory.model("App/Models/ProcessedFile").create({
      id: 36,
      user_id: 1,
      file_id: "4bd091ca-1e74-4320-82ba-c886bf2239eb"
    });

    const p37 = await Factory.model("App/Models/ProcessedFile").create({
      id: 37,
      user_id: 1,
      file_id: "47fceab2-592f-4dc5-9fe6-d17d89cb256d"
    });

    const p38 = await Factory.model("App/Models/ProcessedFile").create({
      id: 38,
      user_id: 1,
      file_id: "9856554c-b48a-401b-9eb1-d307665a8506"
    });

    const p39 = await Factory.model("App/Models/ProcessedFile").create({
      id: 39,
      user_id: 1,
      file_id: "ab79c5df-506f-4aac-aec6-df783b6e7c69"
    });

    const p40 = await Factory.model("App/Models/ProcessedFile").create({
      id: 40,
      user_id: 1,
      file_id: "17b33da9-0ee1-4d5e-84c6-e6d146188047"
    });

    // sales invoices

    const p41 = await Factory.model("App/Models/ProcessedFile").create({
      id: 41,
      user_id: 1,
      file_id: "66ad6fe6-3238-409c-b3da-0bbff6002c55"
    });

    const p42 = await Factory.model("App/Models/ProcessedFile").create({
      id: 42,
      user_id: 1,
      file_id: "362efdb2-1489-46e6-9a90-6c567246febb"
    });

    //shipping deliveries

    const p43 = await Factory.model("App/Models/ProcessedFile").create({
      id: 43,
      user_id: 1,
      file_id: "41bec459-5d67-4ab6-8d60-32eb5fd9027b"
    });

    const p44 = await Factory.model("App/Models/ProcessedFile").create({
      id: 44,
      user_id: 1,
      file_id: "a25ec6f5-6ecb-4fab-aa08-369dbbef92fb"
    });

    const p45 = await Factory.model("App/Models/ProcessedFile").create({
      id: 45,
      user_id: 1,
      file_id: "b8458665-1e1c-4b84-925a-4e770f8a0a31"
    });

    const p46 = await Factory.model("App/Models/ProcessedFile").create({
      id: 46,
      user_id: 1,
      file_id: "fd159494-357a-41dd-b4e0-d199171c893a"
    });

    const p47 = await Factory.model("App/Models/ProcessedFile").create({
      id: 47,
      user_id: 1,
      file_id: "68db7850-e37c-439c-ba16-d591b430a749"
    });

    const p48 = await Factory.model("App/Models/ProcessedFile").create({
      id: 48,
      user_id: 1,
      file_id: "9f5d4b8a-33d2-4922-a520-fee3daaab5df"
    });

    //purchases invoices

    const p49 = await Factory.model("App/Models/ProcessedFile").create({
      id: 49,
      user_id: 1,
      file_id: "f0b00d88-271f-ea11-8454-0003ff246138"
    });

    const p50 = await Factory.model("App/Models/ProcessedFile").create({
      id: 50,
      user_id: 1,
      file_id: "f1b00d88-271f-ea11-8454-0003ff246138"
    });

    const p51 = await Factory.model("App/Models/ProcessedFile").create({
      id: 51,
      user_id: 1,
      file_id: "c430b7d8-571f-ea11-8454-0003ff246138"
    });

    const p52 = await Factory.model("App/Models/ProcessedFile").create({
      id: 52,
      user_id: 1,
      file_id: "9cbca8ea-281f-ea11-8454-0003ff24768f"
    });

    const p53 = await Factory.model("App/Models/ProcessedFile").create({
      id: 53,
      user_id: 1,
      file_id: "9fbca8ea-281f-ea11-8454-0003ff24768f"
    });

    const p54 = await Factory.model("App/Models/ProcessedFile").create({
      id: 54,
      user_id: 1,
      file_id: "5a61a2b5-2b1f-ea11-8454-0003ff24768f"
    });

    const p55 = await Factory.model("App/Models/ProcessedFile").create({
      id: 55,
      user_id: 1,
      file_id: "a21b18aa-2d1f-ea11-8454-0003ff24768f"
    });

    const p56 = await Factory.model("App/Models/ProcessedFile").create({
      id: 56,
      user_id: 1,
      file_id: "2794e778-2f1f-ea11-8454-0003ff24768f"
    });

    const p57 = await Factory.model("App/Models/ProcessedFile").create({
      id: 57,
      user_id: 1,
      file_id: "94fc4c6a-531f-ea11-8454-0003ff24768f"
    });

    const p58 = await Factory.model("App/Models/ProcessedFile").create({
      id: 58,
      user_id: 1,
      file_id: "252a2bc5-551f-ea11-8454-0003ff24768f"
    });

    const p59 = await Factory.model("App/Models/ProcessedFile").create({
      id: 59,
      user_id: 1,
      file_id: "b365a5ad-591f-ea11-8454-0003ff24768f"
    });

    const p60 = await Factory.model("App/Models/ProcessedFile").create({
      id: 60,
      user_id: 1,
      file_id: "176869d0-0f1d-ea11-b265-0003ff295f63"
    });

    const p61 = await Factory.model("App/Models/ProcessedFile").create({
      id: 61,
      user_id: 1,
      file_id: "f01e8265-141d-ea11-b265-0003ff296b0b"
    });

    const p62 = await Factory.model("App/Models/ProcessedFile").create({
      id: 62,
      user_id: 1,
      file_id: "84f62d15-6296-46d7-ae0d-a9ebf631ca77"
    });

    const p63 = await Factory.model("App/Models/ProcessedFile").create({
      id: 63,
      user_id: 1,
      file_id: "13d351cd-a15a-4e24-a303-8a85591a8b58"
    });

    // new

    const p64 = await Factory.model("App/Models/ProcessedFile").create({
      id: 64,
      user_id: 1,
      file_id: "0852a630-cf24-46f7-87d0-12c008c0b1f7"
    });

    const p65 = await Factory.model("App/Models/ProcessedFile").create({
      id: 65,
      user_id: 1,
      file_id: "81e4a458-ada2-42a4-9e5c-221d5e9dee87"
    });

    const p66 = await Factory.model("App/Models/ProcessedFile").create({
      id: 66,
      user_id: 1,
      file_id: "db841569-a479-4864-9635-f6e5b6e37a53"
    });

    const p67 = await Factory.model("App/Models/ProcessedFile").create({
      id: 67,
      user_id: 1,
      file_id: "c3199ee8-9eac-4638-9b48-bc53565f321a"
    });

    const p68 = await Factory.model("App/Models/ProcessedFile").create({
      id: 68,
      user_id: 1,
      file_id: "85deb83e-2420-ea11-8454-0003ff24768f"
    });

    const p69 = await Factory.model("App/Models/ProcessedFile").create({
      id: 69,
      user_id: 1,
      file_id: "af098dcb-5111-4db6-a291-e8365aee40c9"
    });

    // new

    const p70 = await Factory.model("App/Models/ProcessedFile").create({
      id: 70,
      user_id: 1,
      file_id: "54338a70-4792-4a43-83f1-d71d232e2949"
    });

    const p71 = await Factory.model("App/Models/ProcessedFile").create({
      id: 71,
      user_id: 1,
      file_id: "06c9eab1-453a-44db-9843-3679179f11a6"
    });

    const p72 = await Factory.model("App/Models/ProcessedFile").create({
      id: 72,
      user_id: 1,
      file_id: "7ddb80b6-3b20-ea11-8454-0003ff249b63"
    });

    const p73 = await Factory.model("App/Models/ProcessedFile").create({
      id: 73,
      user_id: 1,
      file_id: "3a222cfd-b943-4375-826c-6ba69334379b"
    });

    const p74 = await Factory.model("App/Models/ProcessedFile").create({
      id: 74,
      user_id: 1,
      file_id: "53c3dc37-bd72-4698-9068-112710e1af21"
    });
  }
}

module.exports = ProcessedFileSeeder;
