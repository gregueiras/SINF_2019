import {RETURN_TYPES} from './index'
import getSeries from '../services/jasmin/getSeries';
import createSeries from '../services/jasmin/createSeries';

export default {
  key: "PO_SO",
  options: {
//    repeat: {
 //     every: 10 * 1000
 // }  
  },
  async handle({ data }) {
    const { companyA, companyB } = data;
    
    // Check if 'INTERCOMPANY_COMPANYA_COMPANYB' series exist
    const series = (await getSeries()).data;

    console.log("Got " , series.length)

    const serieName = `INTERCOMPANY_${companyA.toUpperCase()}_${companyB.toUpperCase()}`;
    const serie = series.find(({ serieKey }) => serieKey === serieName)
    console.log(serie)

    if (serie === undefined) {
      const description = `Series to intercompany documents between ${companyA} and ${companyB}`;
      await createSeries(serieName, description);
    }

    return 0;
  }
};
