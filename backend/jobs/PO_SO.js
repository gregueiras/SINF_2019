import { RETURN_TYPES } from "./index";
import getSeries from "../services/jasmin/getSeries";
import createSeries from "../services/jasmin/createSeries";

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

    // TODO: GET INTERCOMPANY ID FROM DATABASE
    const in_id = 1;
    const serieName = `IC${in_id}`;
    const serie = series.find(({ serieKey }) => serieKey === serieName);

    if (serie === undefined) {
      const description = `Series to intercompany documents between ${companyA} and ${companyB}`;
      await createSeries(serieName, description);
    }

    // create sales order
    // IF SERIES ERROR; MUST HAVE ICx SERIES IN DOCUMENT TYPE EVF

  }
};
