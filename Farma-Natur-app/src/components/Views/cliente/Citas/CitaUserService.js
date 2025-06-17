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

export async function solicitarCitaPorEmail(dto) {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:8080/citas/solicitar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dto)
  });
  if (!res.ok) throw new Error('No se pudo enviar la solicitud de cita');
  return await res.json();
}

