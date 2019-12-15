
import axios from 'axios';

export const addCorrespondence = ({ purchaseOrder, salesOrder }) => axios.post(`http://0.0.0.0:3335/order/addCorrespondence`, {
    data: {
        purchaseOrder,
        salesOrder
    }
});

export const getPurchaseOrderCorrespondence =async ({ salesOrder }) => {
    
    const req = await axios.get(`http://0.0.0.0:3335/order/getCorrespondence/purchaseOrder/${salesOrder}`);
    const { data } = req;
    if (data == undefined) return null;
    const { purchase_order } = data;
    return purchase_order;
};

export const getSalesOrderCorrespondence =async ({ purchaseOrder }) => {
    
    const req = await axios.get(`http://0.0.0.0:3335/order/getCorrespondence/salesOrder/${purchaseOrder}`);
    const { data } = req;
    if (data == undefined) return null;
    const { sales_order } = data;
    return sales_order;
};