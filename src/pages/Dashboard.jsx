export default function Dashboard() {
  const cards = [
    {
      title: "Total Sales",
      amount: "₹2,45,000"
    },
    {
      title: "Total Purchase",
      amount: "₹1,12,000"
    },
    {
      title: "Net Profit",
      amount: "₹1,33,000"
    },
    {
      title: "Cash In Hand",
      amount: "₹45,000"
    }
  ]

  return (
    <div>
      <h1
        style={{
          fontSize: "38px",
          marginBottom: "10px"
        }}
      >
        Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px"
        }}
      >
        Welcome to BillMitra Accounting System
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px"
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "20px"
            }}
          >
            <p
              style={{
                color: "#64748b"
              }}
            >
              {card.title}
            </p>

            <h2
              style={{
                marginTop: "10px",
                fontSize: "32px"
              }}
            >
              {card.amount}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}
