import {
  useEffect,
  useState
}
from "react"

import {

  saveParty,
  getParties

}
from "../service/partyService"

export default function Parties() {

  const [parties, setParties] =
    useState([])

  const [form, setForm] =
    useState({

      name: "",
      gstin: "",
      address: "",
      phone: "",
      state: ""

    })

  async function loadParties() {

    const data =
      await getParties(
        "demo-company"
      )

    setParties(data)
  }

  useEffect(() => {

    loadParties()

  }, [])

  async function handleSave() {

    if (!form.name)
      return

    await saveParty(

      "demo-company",

      form
    )

    setForm({

      name: "",
      gstin: "",
      address: "",
      phone: "",
      state: ""
    })

    loadParties()

    alert(
      "Party Saved"
    )
  }

  return (

    <div className="page-container">

      <h1 className="page-title">
        Parties
      </h1>

      {/* FORM */}

      <div className="party-form">

        <input

          type="text"

          placeholder="Party Name"

          value={form.name}

          onChange={(e)=>

            setForm({

              ...form,

              name:
                e.target.value
            })
          }
        />

        <input

          type="text"

          placeholder="GSTIN"

          value={form.gstin}

          onChange={(e)=>

            setForm({

              ...form,

              gstin:
                e.target.value
            })
          }
        />

        <input

          type="text"

          placeholder="Address"

          value={form.address}

          onChange={(e)=>

            setForm({

              ...form,

              address:
                e.target.value
            })
          }
        />

        <input

          type="text"

          placeholder="Phone"

          value={form.phone}

          onChange={(e)=>

            setForm({

              ...form,

              phone:
                e.target.value
            })
          }
        />

        <input

          type="text"

          placeholder="State"

          value={form.state}

          onChange={(e)=>

            setForm({

              ...form,

              state:
                e.target.value
            })
          }
        />

        <button
          onClick={handleSave}
        >

          Save Party

        </button>

      </div>

      {/* PARTY LIST */}

      <div className="party-list">

        {

          parties.map(

            (
              party,
              index
            ) => (

              <div
                className="party-card"
                key={index}
              >

                <h2>
                  {party.name}
                </h2>

                <p>
                  GSTIN:
                  {party.gstin}
                </p>

                <p>
                  Address:
                  {party.address}
                </p>

                <p>
                  Phone:
                  {party.phone}
                </p>

                <p>
                  State:
                  {party.state}
                </p>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}