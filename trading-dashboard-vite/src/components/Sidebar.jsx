import { stocks } from '../data/dummyData'

export default function Sidebar() {
  return (
    <div className="p-3">
      <h5 className="mb-3">Stocks</h5>
      <ul className="list-group">
        {stocks.map((stock, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between">
            <span>{stock.name}</span>
            <span>{stock.price}</span>
            <span className={stock.change.includes('-') ? 'text-danger' : 'text-success'}>
              {stock.change}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
