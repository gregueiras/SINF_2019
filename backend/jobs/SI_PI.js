import { RETURN_TYPES } from './index';
import {
  getCompanyName,
} from '../services/jasmin';
import {
  isProcessed,
  getCorrespondence,
  getCustomerParty,
  getSellerParty,
} from '../services/db';
import Queue from '../lib/Queue';
import getSalesInvoices from '../services/jasmin/getSalesInvoices';

const options = {
  /*
  repeat: {
    every: 60 * 1000
  }
  */
};

export default {
  key: 'SI_PI',
  options,
  async handle({ data }, done) {
    const { companyA, companyB } = data;

    const customerParty = await getCustomerParty({
        companyA,
        companyB,
      });
  
      const sellerParty = await getSellerParty({
        companyA,
        companyB,
      });


      console.log(customerParty)

    const userID = 1;

    const info = {
      userID,
      processID: 1,
      companyA,
      companyB,
    };


    // get serie's purchase order
    let salesInvoicesData;
    try {
      salesInvoicesData = (await getSalesInvoices({ companyID: companyB })).data;
    } catch (e) {
      console.error(e.response.data);
    }

    // company A = 2
    console.log(salesInvoicesData)

    const salesInvoices = salesInvoicesData.filter(
      (si) => 
        si.isActive
        && !si.isDeleted
        && si.buyerCustomerParty == customerParty, //0001
    );

    if (!salesInvoices) {
      done(null, {
        value: RETURN_TYPES.END_TRIGGER_FAIL,
        msg: `No sales invoices found. Please check if you have defined it correctly.`,
        ...info,
        options,
      });
    }
    console.log(salesInvoices)
    let areNewDocuments = false;
    for (const salesInvoice of salesInvoices) {
      const replicated = await isProcessed({
        userID,
        fileID: salesInvoice.id,
      });
      console.log("replicated " + replicated)
      if (!replicated) {
        console.log('NEW SI');
        areNewDocuments = true;
        try {
          // GET SELLER CUSTOM PARTY
          const company = await getCompanyName({ companyID: companyB });

          const documentLines = [];
          let abort = false;
          for (const line of saleInvoice.documentLines) {
            const {
              quantity,
              unitPrice,
              grossValue,
              taxTotal,
              lineExtensionAmount,
              salesItem,
            } = line;

            const purchasesItem = await getCorrespondence({
              companyA,
              companyB,
              product: salesItem,
            });

            if (purchasesItem === undefined) {
              abort = true;
              // LOG UNDEFINED CORRESPONDENCE done(RETURN_TYPES.END_ACTION_FAIL, {value: `There is no correspondence of ${purchasesItem} in ${companyA} and ${companyB}`})
            } else {
              documentLines.push({
                quantity,
                unitPrice,
                deliveryDate: '2019-12-30T00:00:00',
                grossValue,
                taxTotal,
                lineExtensionAmount,
                purchasesItem,
              });
            }
          }
          if (!abort) {
            /*console.dir({
              company,
              buyerCustomerParty: customerParty,
              deliveryTerm: purchaseOrder.deliveryTerm,
              documentLines,
            });*/

            console.log('here');

            /*Queue.add('create_PI', {
              saleInvoice,
              company,
              buyerCustomerParty: customerParty,
              sellerCompany: company,
              documentLines,
              userID,
              companyID: companyB
            });*/
          }
        } catch (e) {
          if (e.response) {
            console.error(e.response.data);
            done(null, {
              value: RETURN_TYPES.END_ACTION_FAIL,
              data: e.response.data,
              ...info,
              options,
            });
          } else {
            console.error(e);
            done(null, {
              value: RETURN_TYPES.END_ACTION_FAIL,
              ...info,
              data: e,
              options,
            });
          }
        }
      }
    }
    if (!areNewDocuments) {
      console.log('NO NEW RES AQUI');
      done(null, {
        result: RETURN_TYPES.END_NO_NEW_DOCUMENTS,
        ...info,
        options,
      });
    } else {
      done(null, {
        value: RETURN_TYPES.END_SUCCESS,
        ...info,
        options,
      });
    }
  },
};
