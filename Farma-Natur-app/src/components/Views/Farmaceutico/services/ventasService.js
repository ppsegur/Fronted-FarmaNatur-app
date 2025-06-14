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