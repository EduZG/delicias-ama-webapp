# Delicias de la ama

Web app para street food, empezando con empanadas.

Objetivo:
- Cliente puede ver productos, hacer pedido, pagar y seguir el estado.
- Administrador puede gestionar pedidos, productos, horarios y estados.

Stack preferido:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase para base de datos/auth
- Stripe o Redsys para pagos, empezando preferiblemente con Stripe
- Deploy en Vercel

Prioridades:
1. MVP simple.
2. Diseño mobile-first.
3. Código claro y barato de mantener.
4. Evitar sobreingeniería.

Funcionalidades MVP:
- Catálogo de empanadas.
- Carrito.
- Checkout.
- Panel admin.
- Estados: recibido, preparando, listo, entregado/cancelado.

Funcionalidades de usuarios:
- Registro e inicio de sesión de clientes.
- Login con email y contraseña.
- Perfil de usuario con nombre, teléfono, email y dirección opcional.
- Historial de últimos pedidos del usuario.
- Repetir pedido anterior desde el historial.
- Ver estado actual de pedidos activos.

Base de datos:
- Usar Supabase Auth para usuarios.
- Crear tabla `profiles` vinculada a `auth.users`.
- Crear tabla `orders` con `user_id`.
- Crear tabla `order_items` con los productos del pedido.

Reglas:
- Un usuario solo puede ver sus propios pedidos.
- El administrador puede ver todos los pedidos.
- Guardar al menos los últimos 10 pedidos por usuario.
- Mostrar pedidos ordenados del más reciente al más antiguo.

Pantallas nuevas:
- `/login`
- `/register`
- `/account`
- `/account/orders`
- `/account/orders/[id]`
