# EcoMarket - Plataforma de Materiales Reciclables

Una plataforma de ecommerce para la compra y venta de materiales reciclables y residuos reutilizables, conectando empresas para promover la economía circular.

## Características

- 🔐 Autenticación con NextAuth.js (credenciales + Google OAuth)
- 🛒 Marketplace con filtros avanzados
- 💳 Integración con Stripe para pagos seguros
- 📱 Diseño responsive con Tailwind CSS y Shadcn/ui
- 🗄️ Base de datos SQLite (desarrollo) / PostgreSQL (producción)
- ☁️ Almacenamiento de imágenes con Uploadthing
- 📊 Dashboard para gestión de productos y órdenes

## Tecnologías

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/ui
- **Backend:** Next.js API Routes
- **Base de datos:** Prisma + SQLite/PostgreSQL
- **Autenticación:** NextAuth.js
- **Pagos:** Stripe
- **Imágenes:** Uploadthing

## Instalación y Configuración

### 1. Clonar y Instalar Dependencias

```bash
git clone <repository-url>
cd ecomarket
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura las variables:

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secreto-aqui"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Uploadthing
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# Stripe
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### 3. Configurar la Base de Datos

```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init
```

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticación
│   ├── dashboard/         # Dashboard de usuario
│   ├── marketplace/       # Página del marketplace
│   └── products/          # Páginas de productos
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes Shadcn/ui
│   └── providers.tsx     # Proveedores de contexto
├── lib/                   # Utilidades
│   ├── auth.ts           # Configuración NextAuth
│   └── prisma.ts         # Cliente Prisma
└── prisma/               # Esquemas de base de datos
    ├── schema.prisma
    └── migrations/
```

## Modelos de Datos

### Usuario
- Información básica y de contacto
- Roles: user, business, admin
- Ubicación geográfica

### Producto
- Detalles del material reciclable
- Categorías específicas para residuos
- Información de precios y cantidades
- Ubicación y estado del material

### Orden
- Gestión de transacciones
- Integración con Stripe
- Seguimiento de estados

## API Endpoints

- `GET/POST /api/products` - Gestión de productos
- `GET/PUT/DELETE /api/products/[id]` - Producto específico
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/checkout` - Procesamiento de pagos
- `GET /api/orders` - Órdenes del usuario

## Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Cambia la base de datos a PostgreSQL (Vercel Postgres)
4. Despliega

### Variables de Producción

Asegúrate de configurar estas variables en producción:

- `DATABASE_URL` - URL de PostgreSQL
- `NEXTAUTH_URL` - URL de tu dominio
- `NEXTAUTH_SECRET` - Secreto seguro
- `STRIPE_SECRET_KEY` - Clave secreta de Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Clave pública de Stripe

## Desarrollo

### Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Linting
npm run lint

# Base de datos
npx prisma studio    # Interfaz gráfica de la BD
npx prisma migrate dev  # Nuevas migraciones
npx prisma generate  # Regenerar cliente
```

### Testing

Para testing básico, verifica que las rutas principales funcionen:

- `/` - Página de inicio
- `/marketplace` - Marketplace
- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro
- `/dashboard` - Dashboard (requiere autenticación)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

## Soporte

Para soporte, abre un issue en el repositorio o contacta al equipo de desarrollo.
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
