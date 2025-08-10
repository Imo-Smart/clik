import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Search, MapPin, Home, Shield, Zap, Clock, Star, Heart, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isRenting, setIsRenting] = useState(false)
  const [rentingStep, setRentingStep] = useState(0)
  const [userVerified, setUserVerified] = useState(true) // Simulando usuário já verificado

  // Dados simulados de imóveis
  const properties = [
    {
      id: 1,
      title: "Apartamento Moderno no Centro",
      location: "Centro, São Paulo - SP",
      price: 2500,
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      rating: 4.8,
      verified: true,
      instantRent: true
    },
    {
      id: 2,
      title: "Casa com Jardim",
      location: "Vila Madalena, São Paulo - SP",
      price: 3200,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      rating: 4.9,
      verified: true,
      instantRent: true
    },
    {
      id: 3,
      title: "Loft Industrial",
      location: "Pinheiros, São Paulo - SP",
      price: 2800,
      bedrooms: 1,
      bathrooms: 1,
      area: 80,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      rating: 4.7,
      verified: true,
      instantRent: true
    }
  ]

  const handleInstantRent = (property) => {
    if (!userVerified) {
      alert('Usuário precisa estar verificado para aluguel instantâneo')
      return
    }
    
    setSelectedProperty(property)
    setIsRenting(true)
    setRentingStep(0)
    
    // Simula o processo de aluguel instantâneo
    const steps = [
      'Verificando elegibilidade...',
      'Gerando contrato digital...',
      'Processando pagamento...',
      'Finalizando locação...',
      'Sucesso! Imóvel alugado!'
    ]
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        setRentingStep(index + 1)
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsRenting(false)
            setRentingStep(0)
            alert(`Parabéns! Você alugou ${property.title} com sucesso! As chaves digitais foram enviadas para seu app.`)
          }, 2000)
        }
      }, (index + 1) * 1000)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ImoClick
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                Usuário Verificado
              </Badge>
              <Button variant="outline">Meu Perfil</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Alugue com Um Clique
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            A revolução do mercado imobiliário chegou. Sem burocracia, sem terceiros, sem complicação. 
            Apenas um clique e o imóvel é seu.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Digite o bairro, cidade ou tipo de imóvel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-20 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 transition-all"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aluguel Instantâneo</h3>
            <p className="text-gray-600">Um clique e pronto! Sem papelada, sem espera.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Seguro</h3>
            <p className="text-gray-600">Verificação biométrica e contratos digitais.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sem Burocracia</h3>
            <p className="text-gray-600">Zero papelada, zero intermediários.</p>
          </motion.div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  {property.verified && (
                    <Badge className="absolute top-4 left-4 bg-green-500">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{property.bedrooms} quartos</span>
                    <span>{property.bathrooms} banheiros</span>
                    <span>{property.area}m²</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        R$ {property.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                    
                    {property.instantRent && userVerified ? (
                      <Button 
                        onClick={() => handleInstantRent(property)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Alugar Agora
                      </Button>
                    ) : (
                      <Button variant="outline">Ver Detalhes</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instant Rent Modal */}
      <AnimatePresence>
        {isRenting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Aluguel Instantâneo</h3>
                <p className="text-gray-600 mb-6">{selectedProperty?.title}</p>
                
                <div className="space-y-4">
                  {[
                    'Verificando elegibilidade...',
                    'Gerando contrato digital...',
                    'Processando pagamento...',
                    'Finalizando locação...',
                    'Sucesso! Imóvel alugado!'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        rentingStep > index ? 'bg-green-500' : rentingStep === index + 1 ? 'bg-blue-500' : 'bg-gray-200'
                      }`}>
                        {rentingStep > index ? (
                          <span className="text-white text-xs">✓</span>
                        ) : rentingStep === index + 1 ? (
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        ) : (
                          <span className="text-gray-400 text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={`${
                        rentingStep > index ? 'text-green-600 font-semibold' : 
                        rentingStep === index + 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                
                {rentingStep === 5 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <p className="text-green-800 font-semibold">
                      🎉 Parabéns! Você alugou o imóvel com sucesso!
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      As chaves digitais foram enviadas para seu smartphone.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">ImoClick</h3>
            </div>
            <p className="text-gray-400 mb-6">
              A revolução do mercado imobiliário. Alugue com confiança, rapidez e segurança.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <span>© 2025 ImoClick. Todos os direitos reservados.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

