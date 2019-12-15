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
  }
}

module.exports = OrderCorrespondenceSeeder;
