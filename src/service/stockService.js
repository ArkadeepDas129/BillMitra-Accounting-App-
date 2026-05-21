import {

  ref,
  push,
  get

}
from "firebase/database"

import {
  db
}
from "../firebase"

/* SAVE STOCK ENTRY */

export async function saveStockEntry(

  companyId,

  itemName,

  entry

) {

  const stockRef = ref(

    db,

    `companies/${companyId}/stock/${itemName}`
  )

  await push(

    stockRef,

    entry
  )
}

/* GET STOCK */

export async function getStock(

  companyId

) {

  const stockRef = ref(

    db,

    `companies/${companyId}/stock`
  )

  const snapshot =
    await get(stockRef)

  if (
    snapshot.exists()
  ) {

    return snapshot.val()
  }

  return {}
}