export async function getCitasByCliente(username) {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:8080/citas/cliente/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('No se pudo obtener el historial de citas');
  return await res.json();
}

