import { RETURN_TYPES } from './index';
import {
  getCompanyKey,
} from '../services/jasmin';
import {
  isProcessed,
  getCorrespondenceB,
  getCustomerParty,
  getSellerParty,
} from '../services/db';
import getSalesInvoices from '../services/jasmin/getSalesInvoices';

import Queue from '../lib/Queue';

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

    const company = await getCompanyKey({ companyID: companyA });

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
    let areNewDocuments = false;
    for (const salesInvoice of salesInvoices) {
      const replicated = await isProcessed({
        userID,
        fileID: salesInvoice.id,
      });
      if (!replicated) {
        console.log('NEW SI');
        areNewDocuments = true;
        try {

          const documentLines = [];
          let abort = false;
          for (const line of salesInvoice.documentLines) {
            const {
              quantity,
              unitPrice,
              grossValue,
              taxTotal,
              lineExtensionAmount,
              salesItem,
            } = line;
            const purchasesItem = await getCorrespondenceB({
              companyA,
              companyB,
              product: salesItem, //TAP1
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
          console.log(abort);
          if (!abort) {
            /*console.dir({
              company,
              buyerCustomerParty: customerParty,
              deliveryTerm: purchaseOrder.deliveryTerm,
              documentLines,
            });*/

            Queue.add('create_PI', {
              documentType: "VFA",
              salesInvoice,
              company, //FEUP-GX
              documentLines,
              sellerSupplierParty: sellerParty,
              userID,
              companyID: companyA,
            });
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
      console.log('NO NEW RES');
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
