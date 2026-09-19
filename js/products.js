const products = [
  {
    id: 1,
    name: 'Camisa básica',
    category: 'Camisas',
    price: 69000,
    oldPrice: 89000,
    discount: 22,
    description: 'Camisa versátil, cómoda y ideal para un look casual moderno.',
    stock: 12,
    availability: 'Disponible',
    featured: true,
    bestSeller: true,
    newArrival: true,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco', 'Azul'],
    tags: ['popular', 'oferta']
  },
  {
    id: 2,
    name: 'Camisa oversize',
    category: 'Camisas',
    price: 89000,
    oldPrice: 119000,
    discount: 25,
    description: 'Estilo relajado con cortes modernos para combinar con denim o accesorios.',
    stock: 8,
    availability: 'Pocas unidades',
    featured: true,
    bestSeller: false,
    newArrival: true,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco', 'Rojo'],
    tags: ['oferta']
  },
  {
    id: 3,
    name: 'Pantalón casual',
    category: 'Pantalones',
    price: 99000,
    oldPrice: 129000,
    discount: 23,
    description: 'Confección limpia con comodidad para uso diario y looks equilibrados.',
    stock: 6,
    availability: 'Disponible',
    featured: false,
    bestSeller: true,
    newArrival: false,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gris', 'Negro', 'Azul'],
    tags: ['popular']
  },
  {
    id: 4,
    name: 'Jeans classic',
    category: 'Jeans',
    price: 119000,
    oldPrice: 149000,
    discount: 20,
    description: 'Pantalón de jean con corte moderno y color neutral para cualquier temporada.',
    stock: 14,
    availability: 'Disponible',
    featured: true,
    bestSeller: false,
    newArrival: true,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Azul', 'Negro'],
    tags: ['oferta']
  },
  {
    id: 5,
    name: 'Chaqueta ligera',
    category: 'Chaquetas',
    price: 159000,
    oldPrice: 209000,
    discount: 24,
    description: 'Chaqueta moderna y funcional para completar looks de negocio o casual.',
    stock: 3,
    availability: 'Pocas unidades',
    featured: true,
    bestSeller: false,
    newArrival: false,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Azul'],
    tags: ['popular']
  },
  {
    id: 6,
    name: 'Zapatos urbanos',
    category: 'Calzado',
    price: 179000,
    oldPrice: 229000,
    discount: 22,
    description: 'Calzado cómodo con líneas sencillas y acabado premium para cada día.',
    stock: 0,
    availability: 'Agotado',
    featured: false,
    bestSeller: true,
    newArrival: false,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Negro', 'Blanco'],
    tags: ['bestseller']
  },
  {
    id: 7,
    name: 'Sudadera premium',
    category: 'Chaquetas',
    price: 129000,
    oldPrice: 169000,
    discount: 24,
    description: 'Sudadera con textura elegante para uso cotidiano y estilo sobrio.',
    stock: 9,
    availability: 'Disponible',
    featured: true,
    bestSeller: true,
    newArrival: false,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Blanco', 'Gris'],
    tags: ['popular']
  },
  {
    id: 8,
    name: 'Accesorio urban',
    category: 'Accesorios',
    price: 42000,
    oldPrice: 59000,
    discount: 29,
    description: 'Detalle funcional y sofisticado para complementar cualquier outfit.',
    stock: 30,
    availability: 'Disponible',
    featured: false,
    bestSeller: false,
    newArrival: true,
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['Único'],
    colors: ['Negro', 'Blanco', 'Rojo'],
    tags: ['oferta']
  }
];

const coupons = {
  LOGICODE10: 0.1,
  WELCOME15: 0.15
};

const formatPrice = (value) => `$${Number(value).toLocaleString('es-CO')}`;
window.formatPrice = formatPrice;

const WHATSAPP_NUMBER = '573234507432';
