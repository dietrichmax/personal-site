import generatePDF from "@/lib/utils/generatePDF";
import { getCV } from '@/lib/data/external/cms'

export default async (_, res) => {
  const cvData = await getCV()
  const pdf = await generatePDF(cvData);
  
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdf);

};

