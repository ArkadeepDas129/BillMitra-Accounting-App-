import {
  ref,
  push
}
from "firebase/database"

import {
  db
}
from "../firebase"

export async function saveVoucher(

  companyId,

  voucher
) {

  const vouchersRef =
    ref(

      db,

      `companies/${companyId}/vouchers`
    )

  await push(
    vouchersRef,
    voucher
  )
}