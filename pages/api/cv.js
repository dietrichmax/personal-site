import generatePDF from "@/lib/utils/generatePDF";

export default async (_, res) => {

  const pdf = await generatePDF();

  res.setHeader("Content-Type", "application/pdf");
  res.send(pdf);

};