"use strict";

const OrderCorrespondence = use("App/Models/OrderCorrespondence");
class OrderCorrespondenceController {
    static boot() {
        super.boot();
    }

    async getAll() {
      const oc = await OrderCorrespondence.all();
      return oc.rows;
    }

    async addCorrespondence({ request, response }) {
        console.log("inside add correspondence");
        let body = request.post();
        let { salesOrder, purchaseOrder } = body.data;
        let order = await OrderCorrespondence.create({ sales_order: salesOrder, purchase_order: purchaseOrder });
        return response.json({message:'Success'})

    }
    async getPurchaseOrderCorrespondence(request) {
        
        const { params } = request;
        const { salesOrder } = params;
        console.log("sales order "+salesOrder);
        const correspondence = (
          await OrderCorrespondence.query()
            .where({ sales_order: salesOrder })
            .fetch()
        ).toJSON();
        console.log("correspondence "+JSON.stringify(correspondence[0])+" "+correspondence.length);
        if (correspondence.length > 0){
            console.log("correspondence maior que 0");
            return correspondence[0];
        }
        else return null;
      }

      async getSalesOrderCorrespondence(request) {
        
        const { params } = request;
        const { purchaseOrder } = params;
        console.log("purchase order "+purchaseOrder);
        const correspondence = (
          await OrderCorrespondence.query()
            .where({ purchase_order: purchaseOrder })
            .fetch()
        ).toJSON();
        console.log("correspondence "+JSON.stringify(correspondence[0])+" "+correspondence.length);
        if (correspondence.length > 0){
            console.log("correspondence maior que 0");
            return correspondence[0];
        }
        else return null;
      }


}

module.exports = OrderCorrespondenceController;
