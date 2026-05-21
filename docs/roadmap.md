# Roadmap — Delicias de la ama

## Objetivo

Crear una web app de pedidos online para street food especializada en empanadas artesanales.

La plataforma debe permitir:
- Comprar online.
- Pagar online.
- Hacer seguimiento del pedido.
- Gestionar pedidos desde un panel administrador.
- Mantener historial de pedidos de clientes.
- Escalar fácilmente a nuevos productos.

---

# Fase 1 — MVP Inicial

## Frontend

### Landing page
- Branding moderno street food.
- Hero principal.
- Productos destacados.
- CTA de pedido rápido.
- Diseño mobile-first.

### Catálogo
- Listado de empanadas.
- Imagen.
- Descripción.
- Precio.
- Etiquetas:
  - picante
  - vegetariano
  - premium
  - nuevo

### Carrito
- Añadir/eliminar productos.
- Modificar cantidades.
- Calcular subtotal y total.
- Persistencia temporal.

### Checkout
- Datos del cliente.
- Dirección o recogida.
- Método de pago.
- Confirmación del pedido.

### Seguimiento
Estados:
- recibido
- preparando
- horneando
- listo
- entregado
- cancelado

---

# Fase 2 — Usuarios

## Autenticación
- Registro.
- Inicio de sesión.
- Recuperación de contraseña.
- Logout.

## Perfil de usuario
- Nombre.
- Teléfono.
- Dirección favorita.
- Historial de pedidos.

## Historial de pedidos
- Ver últimos pedidos.
- Repetir pedido.
- Ver detalle completo.

---

# Fase 3 — Panel Administrador

## Dashboard
- Pedidos activos.
- Ventas del día.
- Productos más vendidos.

## Gestión de pedidos
- Cambiar estado.
- Filtrar pedidos.
- Buscar cliente.

## Gestión de productos
- Crear productos.
- Editar productos.
- Activar/desactivar productos.

---

# Fase 4 — Pagos y producción

## Integraciones
- Stripe.
- Posible Redsys futura.

## Cocina
- Vista simplificada para cocina.
- Pantalla de pedidos en tiempo real.

## Tickets
- Impresión automática.
- Número de pedido.

---

# Fase 5 — Escalabilidad

## Delivery
- Integración con repartidores.
- Tracking simple.

## Marketing
- Cupones.
- Descuentos.
- Fidelización.

## Analytics
- Ventas.
- Horas pico.
- Productos más vendidos.

---

# Stack Tecnológico

## Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Backend
- Supabase
- PostgreSQL
- Supabase Auth

## Infraestructura
- Vercel
- Edge Functions

## Pagos
- Stripe

---

# Prioridades Técnicas

1. Simplicidad.
2. Coste bajo.
3. Mobile-first.
4. Código mantenible.
5. Velocidad de carga.
6. Escalabilidad futura.

---

# Objetivo de lanzamiento

Primera versión funcional:
- catálogo
- carrito
- pedidos
- login
- admin básico
- pagos online

Tiempo objetivo:
4–8 semanas.
