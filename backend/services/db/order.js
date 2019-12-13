
import axios from 'axios';

export const addCorrespondence = ({ purchaseOrder, salesOrder }) => axios.post(`http://0.0.0.0:3335/order/addCorrespondence`, {
    data: {
        purchaseOrder,
        salesOrder
    }
});

export const getPurchaseOrderCorrespondence = ({ salesOrder }) => {
    
    const req = axios.get(`http://0.0.0.0:3335/order/getCorrespondence/${salesOrder}`);
    
    const { data } = req;
    console.log("getPurchaseOrderCorrespondence "+data);
    const { purchase_order } = data;
    return purchase_order;
};