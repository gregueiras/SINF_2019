import makeRequest, { endPoints, constants } from './constants';

const createSalesOrder = ({ 
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
    company,
    data: {
        documentType: "ECL",
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
