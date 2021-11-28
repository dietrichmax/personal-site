import generatePDF from "@/src/utils/generatePDF";
import { getCV } from '@/src/data/external/cms'

export default async (_, res) => {
  const cvData = await getCV()
  const pdf = await generatePDF(cvData);
  
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdf);

};

