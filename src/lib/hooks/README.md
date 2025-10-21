# TanStack Query Hooks

Koleksi custom hooks yang menggunakan TanStack Query untuk state management dan caching API calls.

## Features

- **Automatic Caching**: Data di-cache secara otomatis dengan stale time dan garbage collection
- **Background Refetching**: Data di-refetch di background untuk memastikan data terbaru
- **Optimistic Updates**: Update UI sebelum API call selesai untuk UX yang lebih baik
- **Error Handling**: Error handling yang konsisten di seluruh aplikasi
- **Loading States**: Loading states yang mudah digunakan
- **No Prop Drilling**: State management tanpa prop drilling

## Available Hooks

### Services Hooks

#### `useServices()`
Mengambil data semua services dengan caching.

```tsx
const { data: services, isLoading, error } = useServices();
```

#### `useService(serviceId)`
Mengambil data service berdasarkan ID.

```tsx
const { data: service, isLoading, error } = useService('service-id');
```

### Orders Hooks

#### `useOrders()`
Mengambil data semua orders dengan caching.

```tsx
const { data: orders, isLoading, error } = useOrders();
```

#### `useOrder(orderId)`
Mengambil data order berdasarkan ID.

```tsx
const { data: order, isLoading, error } = useOrder('order-id');
```

#### `useCreateOrder()`
Mutation untuk membuat order baru.

```tsx
const createOrderMutation = useCreateOrder();

const handleSubmit = async (data) => {
  try {
    await createOrderMutation.mutateAsync(data);
    // Order berhasil dibuat
  } catch (error) {
    // Handle error
  }
};
```

#### `useUpdateOrder()`
Mutation untuk update order dengan cache invalidation.

```tsx
const updateOrderMutation = useUpdateOrder();

const handleUpdate = async (id, data) => {
  try {
    await updateOrderMutation.mutateAsync({ id, data });
    // Order berhasil diupdate
  } catch (error) {
    // Handle error
  }
};
```

#### `useOptimisticUpdateOrder()`
Mutation dengan optimistic updates untuk UX yang lebih baik.

```tsx
const optimisticUpdateMutation = useOptimisticUpdateOrder();

const handleOptimisticUpdate = async (id, data) => {
  // UI akan update langsung, rollback jika error
  await optimisticUpdateMutation.mutateAsync({ id, data });
};
```

### Utility Hooks

#### `useInvoice()`
Hook untuk mengelola invoice preview dan download.

```tsx
const {
  previewOrder,
  invoiceNo,
  openInvoicePreview,
  closeInvoicePreview,
  printInvoice,
  downloadInvoice,
  isOpen
} = useInvoice();
```

#### `useErrorHandler()`
Hook untuk error handling yang konsisten.

```tsx
const { handleError, handleApiError } = useErrorHandler();

// Handle error dengan context
const errorMessage = handleError(error, 'User login');

// Handle API error dengan user notification
handleApiError(error, 'mengirim pesanan');
```

## Query Keys

Query keys digunakan untuk caching dan invalidation:

```typescript
// Services
serviceKeys.all = ['services']
serviceKeys.lists() = ['services', 'list']
serviceKeys.list(filters) = ['services', 'list', { filters }]

// Orders
orderKeys.all = ['orders']
orderKeys.lists() = ['orders', 'list']
orderKeys.details() = ['orders', 'detail']
orderKeys.detail(id) = ['orders', 'detail', id]
```

## Configuration

Query client dikonfigurasi dengan:

- **Stale Time**: 5 menit untuk services, 2 menit untuk orders
- **Cache Time**: 10 menit
- **Retry**: 3 kali untuk queries, 1 kali untuk mutations
- **Refetch on Window Focus**: Disabled
- **Refetch on Reconnect**: Enabled

## Benefits

1. **No Prop Drilling**: State tidak perlu di-pass melalui props
2. **Automatic Caching**: Data di-cache otomatis, tidak perlu fetch ulang
3. **Background Updates**: Data selalu fresh tanpa loading state
4. **Optimistic Updates**: UI responsive dengan rollback on error
5. **Error Handling**: Error handling yang konsisten
6. **Loading States**: Loading states yang mudah digunakan
7. **DevTools**: React Query DevTools untuk debugging

## Usage Example

```tsx
function CatalogPage() {
  // Data di-fetch otomatis, di-cache, dan di-refetch di background
  const { data: services, isLoading, error } = useServices();
  const createOrderMutation = useCreateOrder();

  const handleSubmit = async (formData) => {
    try {
      await createOrderMutation.mutateAsync(formData);
      // Cache otomatis di-invalidate dan data di-refetch
    } catch (error) {
      // Error handling
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return <ServicesList services={services} />;
}
```
