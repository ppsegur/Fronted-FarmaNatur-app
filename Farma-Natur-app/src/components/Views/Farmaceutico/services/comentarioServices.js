const API_URL = "http://localhost:8080/comentario";

export async function getAllComentarios(page = 0, size = 10, sort = ["id,asc"]) {
  const params = new URLSearchParams({
    page,
    size,
    sort: sort.join("&sort=")
  });
  const response = await fetch(`${API_URL}/all?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Error al obtener los comentarios");
  }
  return await response.json();
}
export async function deleteComentario(clienteId,id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  const response = await fetch(`${API_URL}/eliminar/${clienteId}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el comentario');
  }
}