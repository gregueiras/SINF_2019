"use strict";

const OrderCorrespondence = use("App/Models/OrderCorrespondence");
class OrderCorrespondenceController {
    static boot() {
        super.boot();
    }
    async addCorrespondence({ request, response }) {
        console.log("inside add correspondence");
        let body = request.post();
        let { salesOrder, purchaseOrder } = body.data;
        let order = await OrderCorrespondence.create({ sales_order: salesOrder, purchase_order: purchaseOrder });
        return response.json({message:'Success'})

    }
    async getCorrespondence(request) {
        
        const { params } = request;
        const { salesOrder } = params;
        const correspondence = (
          await OrderCorrespondence.query()
            .where({ sales_order: salesOrder })
            .fetch()
        ).toJSON();
        if (correspondence.length > 0)
            return correspondence[0];
        else return null;
      }


}

module.exports = OrderCorrespondenceController;
