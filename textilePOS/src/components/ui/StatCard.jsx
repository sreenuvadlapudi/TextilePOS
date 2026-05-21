export default function StatCard({ title, value, delta, description }) {
  return (
    <article className="stat-card">
      <div className="stat-card-header">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
      <p>{description}</p>
      {delta ? <small>{delta}</small> : null}
    </article>
  )
}
