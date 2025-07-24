import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Heart, 
  Menu,
  Search,
  Filter,
  Share2,
  ShoppingCart,
  MessageCircle,
  ArrowUp
} from 'lucide-react';

// ===============================================
// 🎯 COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ===============================================
const App = () => {
  // ===============================================
  // 🔥 ESTADO PRINCIPAL DE LA APLICACIÓN
  // ===============================================
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'product' | 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ===============================================
  // 📦 CONFIGURACIÓN Y DATOS DE LA MARCA
  // ===============================================
  const brandConfig = {
    name: 'URBAN STYLE',
    tagline: 'Estilo que define tu personalidad',
    description: 'Encuentra la mejor ropa urbana con estilo único y calidad premium',
    colors: {
      primary: 'indigo',
      secondary: 'purple',
      accent: 'blue'
    },
    contact: {
      whatsapp: '+52 55 1234 5678',
      email: 'contacto@urbanstyle.com',
      instagram: '@urbanstyle_mx'
    },
    shipping: {
      freeShippingMin: 2000,
      deliveryTime: '24-48 horas'
    }
  };

  // ===============================================
  // 📦 BASE DE DATOS DE PRODUCTOS
  // ===============================================
  const products = [
    {
      id: 'hoodie-premium',
      name: 'Hoodie Premium Algodón',
      price: 2500,
      originalPrice: 3200,
      description: 'Sudadera con capucha de algodón premium 100% orgánico. Diseño unisex con ajuste cómodo, bolsillo frontal tipo canguro y capucha ajustable. Perfecta para cualquier ocasión casual.',
      category: 'Hoodies',
      tags: ['premium', 'algodón', 'unisex', 'casual'],
      rating: 4.8,
      reviews: 124,
      inStock: true,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=800&fit=crop&crop=center'
      ],
      colors: [
        { name: 'Negro', hex: '#1a1a1a', available: true, stock: 15 },
        { name: 'Azul Marino', hex: '#1e40af', available: true, stock: 8 },
        { name: 'Gris Carbón', hex: '#374151', available: true, stock: 12 },
        { name: 'Blanco Hueso', hex: '#f8fafc', available: false, stock: 0 }
      ],
      sizes: [
        { name: 'XS', available: true, stock: 5 },
        { name: 'S', available: true, stock: 10 },
        { name: 'M', available: true, stock: 15 },
        { name: 'L', available: true, stock: 12 },
        { name: 'XL', available: true, stock: 8 },
        { name: 'XXL', available: false, stock: 0 }
      ],
      details: {
        material: '100% Algodón Orgánico',
        care: 'Lavado en máquina agua fría',
        origin: 'Hecho en México',
        weight: '380 GSM'
      },
      mercadoLibreLinks: {
        'M-Negro': 'https://articulo.mercadolibre.com.mx/MLM-hoodie-premium-m-negro',
        'L-Azul Marino': 'https://articulo.mercadolibre.com.mx/MLM-hoodie-premium-l-azul',
        'S-Gris Carbón': 'https://articulo.mercadolibre.com.mx/MLM-hoodie-premium-s-gris',
        'default': 'https://listado.mercadolibre.com.mx/hoodie-premium-urban-style'
      }
    },
    {
      id: 'tshirt-essential',
      name: 'Camiseta Essential Basic',
      price: 850,
      originalPrice: 1200,
      description: 'Camiseta básica de corte moderno y relajado. Fabricada con algodón 100% orgánico de fibra larga para mayor suavidad y durabilidad. Cuello redondo reforzado y costuras planas.',
      category: 'Camisetas',
      tags: ['básica', 'algodón', 'everyday', 'versátil'],
      rating: 4.6,
      reviews: 89,
      inStock: true,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1583743814966-8936f37f8a41?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center'
      ],
      colors: [
        { name: 'Blanco', hex: '#ffffff', available: true, stock: 20 },
        { name: 'Negro', hex: '#1a1a1a', available: true, stock: 18 },
        { name: 'Gris Claro', hex: '#e5e7eb', available: true, stock: 15 },
        { name: 'Azul Cielo', hex: '#3b82f6', available: true, stock: 10 }
      ],
      sizes: [
        { name: 'XS', available: true, stock: 8 },
        { name: 'S', available: true, stock: 15 },
        { name: 'M', available: true, stock: 20 },
        { name: 'L', available: true, stock: 18 },
        { name: 'XL', available: true, stock: 12 },
        { name: 'XXL', available: true, stock: 6 }
      ],
      details: {
        material: '100% Algodón Ring Spun',
        care: 'Lavado en máquina agua tibia',
        origin: 'Hecho en México',
        weight: '180 GSM'
      },
      mercadoLibreLinks: {
        'M-Blanco': 'https://articulo.mercadolibre.com.mx/MLM-tshirt-essential-m-blanco',
        'L-Negro': 'https://articulo.mercadolibre.com.mx/MLM-tshirt-essential-l-negro',
        'default': 'https://listado.mercadolibre.com.mx/camiseta-essential-urban-style'
      }
    },
    {
      id: 'jacket-urban',
      name: 'Chaqueta Urban Windbreaker',
      price: 3200,
      originalPrice: 4000,
      description: 'Chaqueta cortavientos con diseño urbano contemporáneo. Resistente al agua y viento, con forro interior suave. Incluye capucha plegable, bolsillos con cierre y ajuste en cintura.',
      category: 'Chaquetas',
      tags: ['windbreaker', 'urban', 'resistente', 'capucha'],
      rating: 4.9,
      reviews: 67,
      inStock: true,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&h=800&fit=crop&crop=center'
      ],
      colors: [
        { name: 'Negro Mate', hex: '#1a1a1a', available: true, stock: 8 },
        { name: 'Verde Militar', hex: '#059669', available: true, stock: 6 },
        { name: 'Azul Navy', hex: '#1e40af', available: true, stock: 10 },
        { name: 'Gris Grafito', hex: '#374151', available: true, stock: 7 }
      ],
      sizes: [
        { name: 'S', available: true, stock: 6 },
        { name: 'M', available: true, stock: 10 },
        { name: 'L', available: true, stock: 12 },
        { name: 'XL', available: true, stock: 8 },
        { name: 'XXL', available: false, stock: 0 }
      ],
      details: {
        material: 'Poliéster ripstop + forro polar',
        care: 'Lavado a mano agua fría',
        origin: 'Diseñado en México',
        weight: '320 GSM'
      },
      mercadoLibreLinks: {
        'M-Negro Mate': 'https://articulo.mercadolibre.com.mx/MLM-jacket-urban-m-negro',
        'L-Verde Militar': 'https://articulo.mercadolibre.com.mx/MLM-jacket-urban-l-verde',
        'default': 'https://listado.mercadolibre.com.mx/chaqueta-urban-windbreaker'
      }
    },
    {
      id: 'pants-jogger',
      name: 'Pantalón Jogger Comfort',
      price: 1800,
      originalPrice: 2400,
      description: 'Pantalón jogger de corte moderno con ajuste cómodo y elástico en cintura. Fabricado con mezcla de algodón y elastano para máxima comodidad. Bolsillos laterales y traseros funcionales.',
      category: 'Pantalones',
      tags: ['jogger', 'cómodo', 'elástico', 'casual'],
      rating: 4.7,
      reviews: 156,
      inStock: true,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1506629905607-53e103a0265d?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop&crop=center'
      ],
      colors: [
        { name: 'Negro', hex: '#1a1a1a', available: true, stock: 15 },
        { name: 'Gris Oxford', hex: '#6b7280', available: true, stock: 12 },
        { name: 'Azul Marino', hex: '#1e40af', available: true, stock: 10 },
        { name: 'Verde Oliva', hex: '#65a30d', available: true, stock: 8 }
      ],
      sizes: [
        { name: 'XS', available: true, stock: 5 },
        { name: 'S', available: true, stock: 12 },
        { name: 'M', available: true, stock: 18 },
        { name: 'L', available: true, stock: 15 },
        { name: 'XL', available: true, stock: 10 },
        { name: 'XXL', available: true, stock: 6 }
      ],
      details: {
        material: '95% Algodón, 5% Elastano',
        care: 'Lavado en máquina agua tibia',
        origin: 'Hecho en México',
        weight: '280 GSM'
      },
      mercadoLibreLinks: {
        'M-Negro': 'https://articulo.mercadolibre.com.mx/MLM-jogger-comfort-m-negro',
        'L-Gris Oxford': 'https://articulo.mercadolibre.com.mx/MLM-jogger-comfort-l-gris',
        'default': 'https://listado.mercadolibre.com.mx/pantalon-jogger-comfort'
      }
    },
    {
      id: 'cap-urban',
      name: 'Gorra Urban Classic',
      price: 650,
      originalPrice: 900,
      description: 'Gorra estilo snapback con diseño urbano minimalista. Visera plana, ajuste trasero regulable y bordado discreto del logo. Fabricada con algodón de alta calidad.',
      category: 'Accesorios',
      tags: ['gorra', 'snapback', 'urban', 'ajustable'],
      rating: 4.5,
      reviews: 45,
      inStock: true,
      featured: false,
      images: [
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=800&fit=crop&crop=center'
      ],
      colors: [
        { name: 'Negro', hex: '#1a1a1a', available: true, stock: 25 },
        { name: 'Blanco', hex: '#ffffff', available: true, stock: 20 },
        { name: 'Gris', hex: '#6b7280', available: true, stock: 18 },
        { name: 'Azul Navy', hex: '#1e40af', available: true, stock: 15 }
      ],
      sizes: [
        { name: 'Única', available: true, stock: 78 }
      ],
      details: {
        material: '100% Algodón Twill',
        care: 'Lavado a mano',
        origin: 'Hecho en México',
        weight: '120 GSM'
      },
      mercadoLibreLinks: {
        'default': 'https://listado.mercadolibre.com.mx/gorra-urban-classic'
      }
    },
    {
      id: 'backpack-urban',
      name: 'Mochila Urban Explorer',
      price: 2200,
      originalPrice: 2800,
      description: 'Mochila urbana de 25L con diseño minimalista y funcional. Compartimento acolchado para laptop hasta 15", bolsillos organizadores y material resistente al agua.',
      category: 'Accesorios',
      tags: ['mochila', 'laptop', 'urbana', 'resistente'],
      rating: 4.9,
      reviews: 89,
      inStock: true,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=800&fit=crop&crop=center'
      ],
      colors: [
        { name: 'Negro', hex: '#1a1a1a', available: true, stock: 12 },
        { name: 'Gris Antracita', hex: '#374151', available: true, stock: 8 },
        { name: 'Azul Navy', hex: '#1e40af', available: true, stock: 10 }
      ],
      sizes: [
        { name: 'Única', available: true, stock: 30 }
      ],
      details: {
        material: 'Cordura 1000D + forro interior',
        care: 'Limpieza con paño húmedo',
        origin: 'Diseñado en México',
        weight: '850g'
      },
      mercadoLibreLinks: {
        'default': 'https://listado.mercadolibre.com.mx/mochila-urban-explorer'
      }
    }
  ];

  // ===============================================
  // 🎯 EFECTOS Y FUNCIONES UTILITARIAS
  // ===============================================
  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Listener para scroll
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===============================================
  // 🎯 FUNCIONES DE NAVEGACIÓN
  // ===============================================
  const openProductView = useCallback((product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    setSelectedSize('');
    setSelectedColor('');
    setCurrentImageIndex(0);
    setShowMobileMenu(false);
    scrollToTop();
  }, []);

  const backToHome = useCallback(() => {
    setCurrentView('home');
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
    setCurrentImageIndex(0);
  }, []);

  // ===============================================
  // 🖼️ FUNCIONES DE GALERÍA DE IMÁGENES
  // ===============================================
  const nextImage = useCallback(() => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProduct]);

  const prevImage = useCallback(() => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  }, [selectedProduct]);

  const selectImage = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  // ===============================================
  // 💝 FUNCIONES DE FAVORITOS
  // ===============================================
  const toggleFavorite = useCallback((productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  // ===============================================
  // 🛒 FUNCIONES DEL CARRITO
  // ===============================================
  const addToCart = useCallback((product, size, color) => {
    const cartItem = {
      id: `${product.id}-${size}-${color}`,
      product,
      size,
      color,
      quantity: 1,
      addedAt: new Date().toISOString()
    };

    setCart(prev => {
      const existingItem = prev.find(item => item.id === cartItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, cartItem];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // ===============================================
  // 🛒 FUNCIÓN DE COMPRA
  // ===============================================
  const handleBuyClick = useCallback(() => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor selecciona talla y color');
      return;
    }

    // Agregar al carrito (opcional)
    addToCart(selectedProduct, selectedSize, selectedColor);

    // Redirect a Mercado Libre
    const combination = `${selectedSize}-${selectedColor}`;
    const link = selectedProduct.mercadoLibreLinks[combination] || 
                selectedProduct.mercadoLibreLinks['default'];
    
    window.open(link, '_blank');
  }, [selectedProduct, selectedSize, selectedColor, addToCart]);

  // ===============================================
  // 🔍 FUNCIONES DE BÚSQUEDA Y FILTROS
  // ===============================================
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // ===============================================
  // 🎨 COMPONENTES DE UI REUTILIZABLES
  // ===============================================
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold">Cargando {brandConfig.name}...</h2>
        <p className="opacity-80 mt-2">Preparando la mejor experiencia para ti</p>
      </div>
    </div>
  );

  const StarRating = ({ rating, reviews }) => (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300'
            }
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviews} {reviews === 1 ? 'reseña' : 'reseñas'})
      </span>
    </div>
  );

  // ===============================================
  // 🏠 COMPONENTE: PÁGINA PRINCIPAL
  // ===============================================
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
      {/* Header */}
      <header className="text-center py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl tracking-tight">
            {brandConfig.name}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
            {brandConfig.tagline}
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium">
              ✨ Envío gratis en compras +${brandConfig.shipping.freeShippingMin.toLocaleString()}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium">
              🚚 Entrega {brandConfig.shipping.deliveryTime}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium">
              🇲🇽 Hecho en México
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Nuestra Colección'}
          </h2>
          <p className="text-white/80 text-lg">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && searchQuery && (
          <div className="text-center py-20">
            <div className="text-white/60 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No encontramos productos
            </h3>
            <p className="text-white/80 mb-6">
              Intenta con otros términos de búsqueda
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${brandConfig.contact.whatsapp.replace(/\s/g, '').replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-40"
        title="Contactar por WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );

  // ===============================================
  // 🛍️ COMPONENTE: TARJETA DE PRODUCTO
  // ===============================================
  const ProductCard = ({ product, index }) => {
    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    return (
      <div 
        className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer group relative animate-fade-in`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discountPercentage}%
            </span>
          )}
          {product.featured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Destacado
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Agotado
            </span>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full z-10 hover:bg-white transition-all hover:scale-110"
        >
          <Heart 
            size={20} 
            className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
          />
        </button>

        {/* Product Image */}
        <div 
          className="h-72 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden"
          style={{ backgroundImage: `url(${product.images[0]})` }}
          onClick={() => openProductView(product)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Product Info */}
        <div className="p-6">
          {/* Rating */}
          <div className="mb-3">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
          
          {/* Category */}
          <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
            {product.category}
          </span>
          
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              ${product.price.toLocaleString()} MXN
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm mb-6 line-clamp-3">
            {product.description}
          </p>
          
          {/* Colors Preview */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Colores:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-400 ml-1">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>
          
          {/* Action Button */}
          <button
            onClick={() => openProductView(product)}
            disabled={!product.inStock}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
              product.inStock
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Ver Detalles' : 'Agotado'}
          </button>
        </div>
      </div>
    );
  };

  // ===============================================
  // 📱 COMPONENTE: VISTA DE PRODUCTO DETALLADO
  // ===============================================
  const ProductDetailView = () => {
    if (!selectedProduct) return null;

    const discountPercentage = Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100);
    const selectedColorObj = selectedProduct.colors.find(c => c.name === selectedColor);
    const selectedSizeObj = selectedProduct.sizes.find(s => s.name === selectedSize);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm sticky top-0 z-40 border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={backToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Volver al catálogo</span>
            </button>
            
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold text-gray-900 truncate max-w-xs hidden md:block">
                {selectedProduct.name}
              </h1>
              
              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedProduct.name,
                      text: selectedProduct.description,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copiado al portapapeles');
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Compartir producto"
              >
                <Share2 size={20} className="text-gray-600" />
              </button>
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(selectedProduct.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Agregar a favoritos"
              >
                <Heart 
                  size={24} 
                  className={favorites.has(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Galería de Imágenes */}
            <div className="space-y-6">
              {/* Imagen Principal */}
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src={selectedProduct.images[currentImageIndex]}
                  alt={`${selectedProduct.name} - Vista ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Controles de navegación */}
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Indicador de imagen */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>

                {/* Zoom hint */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Desliza para ver más
                </div>
              </div>

              {/* Miniaturas */}
              <div className="grid grid-cols-4 gap-3">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'ring-3 ring-indigo-600 scale-105 shadow-lg' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100 hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Vista ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Información del Producto */}
            <div className="space-y-8">
              {/* Header del producto */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                    {selectedProduct.category}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                      -{discountPercentage}% OFF
                    </span>
                  )}
                  {selectedProduct.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedProduct.name}
                </h1>
                
                <div className="mb-4">
                  <StarRating rating={selectedProduct.rating} reviews={selectedProduct.reviews} />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl md:text-4xl font-bold text-indigo-600">
                    ${selectedProduct.price.toLocaleString()} MXN
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-xl md:text-2xl text-gray-400 line-through">
                      ${selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {selectedProduct.description}
                </p>

                {/* Product Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProduct.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selector de Tallas */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Talla: {selectedSize && <span className="text-indigo-600">{selectedSize}</span>}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size.name}
                      onClick={() => size.available && setSelectedSize(size.name)}
                      disabled={!size.available}
                      className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 relative ${
                        selectedSize === size.name
                          ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                          : size.available
                          ? 'bg-white border-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:bg-indigo-50'
                          : 'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {size.name}
                      {!size.available && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                      )}
                      {size.available && size.stock <= 3 && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedSizeObj && selectedSizeObj.stock <= 3 && (
                  <p className="text-orange-600 text-sm mt-2">
                    ⚠️ Solo quedan {selectedSizeObj.stock} unidades en esta talla
                  </p>
                )}
              </div>

              {/* Selector de Colores */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Color: {selectedColor && <span className="text-indigo-600">{selectedColor}</span>}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {selectedProduct.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => color.available && setSelectedColor(color.name)}
                      disabled={!color.available}
                      className={`relative w-16 h-16 rounded-full transition-all duration-200 ${
                        selectedColor === color.name 
                          ? 'ring-4 ring-indigo-600 ring-offset-2 scale-110 shadow-lg' 
                          : color.available
                          ? 'hover:scale-110 ring-2 ring-gray-300 hover:ring-gray-400 shadow-md'
                          : 'opacity-50 cursor-not-allowed ring-2 ring-gray-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} ${color.available ? '' : '(Agotado)'}`}
                    >
                      {!color.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-0.5 h-full bg-red-500 rotate-45 rounded"></div>
                        </div>
                      )}
                      {color.available && color.stock <= 3 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                          !
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedColorObj && selectedColorObj.stock <= 3 && (
                  <p className="text-orange-600 text-sm mt-3">
                    ⚠️ Solo quedan {selectedColorObj.stock} unidades en {selectedColorObj.name}
                  </p>
                )}
              </div>

              {/* Resumen de Selección */}
              <div className="bg-gray-100 rounded-2xl p-6">
                {selectedSize && selectedColor ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Talla:</span>
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold">
                          {selectedSize}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Color:</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: selectedColorObj?.hex }}
                          ></div>
                          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                            {selectedColor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 mb-2">
                      ${selectedProduct.price.toLocaleString()} MXN
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedProduct.price >= brandConfig.shipping.freeShippingMin 
                        ? '🚚 Envío gratis incluido' 
                        : `Agrega ${(brandConfig.shipping.freeShippingMin - selectedProduct.price).toLocaleString()} más para envío gratis`
                      }
                    </p>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Selecciona talla y color para continuar
                  </p>
                )}
              </div>

              {/* Botón de Compra */}
              <button
                onClick={handleBuyClick}
                disabled={!selectedSize || !selectedColor || !selectedProduct.inStock}
                className={`w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-200 flex items-center justify-center gap-4 ${
                  selectedSize && selectedColor && selectedProduct.inStock
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={24} />
                {!selectedProduct.inStock 
                  ? 'Producto Agotado'
                  : 'Comprar en Mercado Libre'
                }
              </button>

              {/* Información adicional */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900">Detalles del producto:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium">{selectedProduct.details.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cuidado:</span>
                      <span className="font-medium">{selectedProduct.details.care}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origen:</span>
                      <span className="font-medium">{selectedProduct.details.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peso:</span>
                      <span className="font-medium">{selectedProduct.details.weight}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900">Beneficios:</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Envío gratis en compras +${brandConfig.shipping.freeShippingMin.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Entrega en {brandConfig.shipping.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Garantía de 30 días</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Cambios gratuitos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Float Button */}
        <a
          href={`https://wa.me/${brandConfig.contact.whatsapp.replace(/\s/g, '').replace('+', '')}?text=Hola! Me interesa el producto: ${selectedProduct.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-40"
          title="Preguntar por WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    );
  };

  // ===============================================
  // 🎯 RENDER PRINCIPAL
  // ===============================================
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="font-sans relative">
      {currentView === 'home' ? <HomePage /> : <ProductDetailView />}
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-2xl hover:bg-indigo-700 transition-all hover:scale-110 z-40"
          title="Volver arriba"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Global Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default App;