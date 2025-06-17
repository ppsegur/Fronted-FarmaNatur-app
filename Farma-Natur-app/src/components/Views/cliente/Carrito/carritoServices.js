export async function eliminarProductoDelCarrito(productoId) {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:8080/carrito/producto/${productoId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function actualizarCantidadProducto(productoId, cantidad) {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:8080/carrito/producto/${productoId}/cantidad/${cantidad}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function finalizarCompra() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:8080/carrito/finalizar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('No se pudo finalizar la compra');
  return await res.json();
}

export async function addProductoAlCarrito(producto) {
    const token = localStorage.getItem('token');
    const dto = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        categoria: producto.categoria,
        url: producto.url || producto.imagen
    };
    await fetch('http://localhost:8080/carrito/producto/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dto)
    });
}

export async function getCarrito() {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/carrito/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('No se pudo obtener el carrito');
    return await res.json();
}