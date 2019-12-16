const Factory = use("Factory");
const Database = use("Database");

class OrderCorrespondenceSeeder {
  async run() {
    const p1 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 1,
      purchase_order: "b04ec55e-db09-4025-bd6b-00cd0289f14b",
      sales_order: "9d88d689-591f-ea11-8454-0003ff246138",
      created_at: "2019-12-15 16:40:11",
      updated_at: "2019-12-15 16:40:11"
    });

    const p2 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 2,
      purchase_order: "5257fdf0-4706-4740-8a69-2281e292d87e",
      sales_order: "0589d689-591f-ea11-8454-0003ff246138",
      created_at: "2019-12-15 16:40:11",
      updated_at: "2019-12-15 16:40:11"
    });

    const p3 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 3,
      purchase_order: "87ef65f6-0a3a-414a-926c-27407a9cb734",
      sales_order: "dab93290-591f-ea11-8454-0003ff246138",
      created_at: "2019-12-15 16:40:21",
      updated_at: "2019-12-15 16:40:21"
    });

    const p4 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 4,
      purchase_order: "049b5d59-b794-4865-8027-5e5dcc574355",
      sales_order: "596677a0-591f-ea11-8454-0003ff246138",
      created_at: "2019-12-15 16:40:43",
      updated_at: "2019-12-15 16:40:43"
    });

    const p5 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 5,
      purchase_order: "60fa72ae-df7e-440c-b1cb-41804db6f7d0",
      sales_order: "7afb6ea1-591f-ea11-8454-0003ff24768f",
      created_at: "2019-12-15 16:40:43",
      updated_at: "2019-12-15 16:40:43"
    });

    const p6 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 6,
      purchase_order: "6a725abe-230a-44a5-9bb8-6319cc4c7c98",
      sales_order: "c36677a0-591f-ea11-8454-0003ff246138",
      created_at: "2019-12-15 16:40:43",
      updated_at: "2019-12-15 16:40:43"
    });

    const p7 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 7,
      purchase_order: "062ad64c-0609-4ae5-9d27-7000c185b667",
      sales_order: "396777a0-591f-ea11-8454-0003ff246138",
      created_at: "2019-12-15 16:40:44",
      updated_at: "2019-12-15 16:40:44"
    });

    const p8 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 8,
      purchase_order: "ddb09457-14de-4c09-920a-8debd55f7c55",
      sales_order: "90fe6ea1-591f-ea11-8454-0003ff24768f",
      created_at: "2019-12-15 16:40:45",
      updated_at: "2019-12-15 16:40:45"
    });

    const p9 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 9,
      purchase_order: "b365a5ad-591f-ea11-8454-0003ff24768f",
      sales_order: "66ad6fe6-3238-409c-b3da-0bbff6002c55",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p10 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 10,
      purchase_order: "13d351cd-a15a-4e24-a303-8a85591a8b58",
      sales_order: "c904693e-2220-ea11-8454-0003ff249b63",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p11 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 11,
      purchase_order: "0852a630-cf24-46f7-87d0-12c008c0b1f7",
      sales_order: "d86ba373-2920-ea11-8454-0003ff24768f",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p12 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 12,
      purchase_order: "da9b12d6-2920-ea11-8454-0003ff24768f",
      sales_order: "81e4a458-ada2-42a4-9e5c-221d5e9dee87",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p13 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 13,
      purchase_order: "af098dcb-5111-4db6-a291-e8365aee40c9",
      sales_order: "50161f4a-2e20-ea11-8454-0003ff24768f",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p14 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 14,
      purchase_order: "54338a70-4792-4a43-83f1-d71d232e2949",
      sales_order: "e189be28-3b20-ea11-8454-0003ff2470a5",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p15 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 15,
      purchase_order: "7ddb80b6-3b20-ea11-8454-0003ff249b63",
      sales_order: "06c9eab1-453a-44db-9843-3679179f11a6",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p16 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 16,
      purchase_order: "3a222cfd-b943-4375-826c-6ba69334379b",
      sales_order: "229a71da-3c20-ea11-8454-0003ff249b63",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p17 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 17,
      purchase_order: "3a222cfd-b943-4375-826c-6ba69334379b",
      sales_order: "977d41de-3c20-ea11-8454-0003ff24802c",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });

    const p18 = await Factory.model("App/Models/OrderCorrespondence").create({
      id: 18,
      purchase_order: "53c3dc37-bd72-4698-9068-112710e1af21",
      sales_order: "cd20bbc6-3e20-ea11-8454-0003ff249b63",
      created_at: "2019-12-15 16:41:05",
      updated_at: "2019-12-15 16:41:05"
    });
  }
}

module.exports = OrderCorrespondenceSeeder;
