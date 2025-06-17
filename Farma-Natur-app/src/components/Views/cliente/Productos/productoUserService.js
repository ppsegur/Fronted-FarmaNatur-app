export async function getComentariosDeProducto(username) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8080/comentario/producto/${username}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!response.ok) throw new Error('No se pudieron obtener los comentarios');
  return await response.json();
}