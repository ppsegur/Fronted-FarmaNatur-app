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
export async function getProductoMasComentado() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  const res = await fetch("http://localhost:8080/comentario/producto-con-mas-comentarios", {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener el producto más comentado");
  return await res.json();
}

export async function getClienteQueMasComenta() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  const res = await fetch("http://localhost:8080/comentario/cliente-que-mas-comenta", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener el cliente que más comenta");
  return await res.json();
}

export async function getTop3ProductosMasComentados() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  const res = await fetch("http://localhost:8080/comentario/top3-productos-mas-comentados", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener el top 3 productos");
  return await res.json();
}



