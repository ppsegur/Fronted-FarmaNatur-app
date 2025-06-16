export async function getProductos(page = 0, size = 10, sort = ['id,asc']) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  const params = new URLSearchParams({
    page,
    size,
    sort: sort.join('&sort=')
  });
  const res = await fetch(`http://localhost:8080/producto/all?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log('Productos recibidos:', data); // <-- Aquí ves lo que recibes
  return data;
}


export async function editProducto(id, formData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  await fetch(`http://localhost:8080/producto/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
      // NO pongas Content-Type aquí
    },
    body: formData,
  });
}



export async function deleteProducto(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  await fetch(`http://localhost:8080/producto/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function crearProducto(formData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  await fetch('http://localhost:8080/producto', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}