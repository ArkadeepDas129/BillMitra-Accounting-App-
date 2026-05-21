export function createSalesVoucher({

  customerName,
  subtotal,
  cgst,
  sgst,
  grandTotal,
  invoiceNumber

}) {

  return {

    voucherType: "Sales",

    invoiceNumber,

    date:
      new Date()
      .toISOString(),

    total:
      grandTotal,

    entries: [

      {
        ledger:
          customerName,

        type:
          "Dr",

        amount:
          grandTotal
      },

      {
        ledger:
          "Sales Account",

        type:
          "Cr",

        amount:
          subtotal
      },

      {
        ledger:
          "Output CGST",

        type:
          "Cr",

        amount:
          cgst
      },

      {
        ledger:
          "Output SGST",

        type:
          "Cr",

        amount:
          sgst
      }
    ]
  }
}