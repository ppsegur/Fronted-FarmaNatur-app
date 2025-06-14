export async function getVentas() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  const res = await fetch('http://localhost:8080/carrito/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener las ventas');
  return await res.json();
}
export async function getVentasPorDia(mes, anio) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  const res = await fetch(`http://localhost:8080/carrito/ventas-por-dia?mes=${mes}&anio=${anio}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener ventas por día');
  return await res.json();
}