// Servicio para crear comentario de producto
export async function crearComentarioProducto(productoId, comentario) {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:8080/comentario/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productoId, comentario })
  });
  if (!res.ok) throw new Error('No se pudo crear el comentario');
  return await res.json();
}
export async function editarComentarioProducto(productoId, comentario) {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:8080/comentario/editar', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productoId, comentario })
  });
  if (!res.ok) throw await res.json();
  return await res.json();
}

