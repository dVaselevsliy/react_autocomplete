export const getPreperedName = (goods, { query }) => {
  let preperedName = [...goods]

  const normalizedGoods = query.trim().toLowerCase()

  if (normalizedGoods) {
    preperedName = preperedName.filter(
      name => name.toLowerCase().includes(normalizedGoods)
    )
  }

  return preperedName
}
