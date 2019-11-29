import makeRequest, { endPoints } from './constants';

const createSalesOrder = ({ 
    documentType,
    serie,
    buyerCustomerParty,
    documentDate,
    discount,
    paymentMethod,
    deliveryTerm,
    salesChannel,
    company,
    remarks,
    unloadingPoint,
    unloadingStreetName,
    unloadingBuildingNumber,
    unloadingPostalZone,
    unloadingCityName,
    unloadingCountry,
    documentLines}) =>
  makeRequest({
    method:  "POST" ,
    endPoint: endPoints.salesOrders,
    data: {
        documentType,
        serie,
        buyerCustomerParty,
        documentDate,
        discount,
        paymentMethod,
        deliveryTerm,
        salesChannel,
        company,
        remarks,
        unloadingPoint,
        unloadingStreetName,
        unloadingBuildingNumber,
        unloadingPostalZone,
        unloadingCityName,
        unloadingCountry,
        documentLines,
    }
  });

export default createSalesOrder;
