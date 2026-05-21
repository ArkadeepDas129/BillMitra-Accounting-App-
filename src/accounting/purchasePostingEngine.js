export function createPurchaseVoucher({

  supplierName,

  subtotal,

  cgst,

  sgst,

  grandTotal,

  invoiceNumber

}) {

  return {

    voucherType:
      "Purchase",

    invoiceNumber,

    date:
      new Date()
      .toISOString(),

    total:
      grandTotal,

    entries: [

      {

        ledger:
          "Purchase Account",

        type:
          "Dr",

        amount:
          subtotal
      },

      {

        ledger:
          "Input CGST",

        type:
          "Dr",

        amount:
          cgst
      },

      {

        ledger:
          "Input SGST",

        type:
          "Dr",

        amount:
          sgst
      },

      {

        ledger:
          supplierName,

        type:
          "Cr",

        amount:
          grandTotal
      }
    ]
  }
}