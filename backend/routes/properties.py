from flask import Blueprint, jsonify, request
from datetime import datetime
import uuid

properties_bp = Blueprint('properties', __name__)

# Dados simulados de propriedades
properties_data = [
    {
        "id": 1,
        "title": "Apartamento Moderno no Centro",
        "location": "Centro, São Paulo - SP",
        "price": 2500,
        "bedrooms": 2,
        "bathrooms": 1,
        "area": 65,
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "rating": 4.8,
        "verified": True,
        "instant_rent": True,
        "description": "Apartamento completamente mobiliado no coração da cidade, próximo ao metrô e principais pontos comerciais.",
        "amenities": ["Wi-Fi", "Ar Condicionado", "Mobiliado", "Portaria 24h"],
        "owner_id": "owner_001",
        "available": True,
        "created_at": "2025-01-01T00:00:00Z"
    },
    {
        "id": 2,
        "title": "Casa com Jardim",
        "location": "Vila Madalena, São Paulo - SP",
        "price": 3200,
        "bedrooms": 3,
        "bathrooms": 2,
        "area": 120,
        "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
        "rating": 4.9,
        "verified": True,
        "instant_rent": True,
        "description": "Casa charmosa com jardim privativo, ideal para famílias que buscam tranquilidade e conforto.",
        "amenities": ["Jardim", "Garagem", "Churrasqueira", "Pet Friendly"],
        "owner_id": "owner_002",
        "available": True,
        "created_at": "2025-01-02T00:00:00Z"
    },
    {
        "id": 3,
        "title": "Loft Industrial",
        "location": "Pinheiros, São Paulo - SP",
        "price": 2800,
        "bedrooms": 1,
        "bathrooms": 1,
        "area": 80,
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "rating": 4.7,
        "verified": True,
        "instant_rent": True,
        "description": "Loft moderno com design industrial, perfeito para profissionais criativos e jovens executivos.",
        "amenities": ["Pé direito alto", "Mobiliado", "Wi-Fi", "Academia"],
        "owner_id": "owner_003",
        "available": True,
        "created_at": "2025-01-03T00:00:00Z"
    }
]

@properties_bp.route('/properties', methods=['GET'])
def get_properties():
    """Retorna lista de propriedades disponíveis"""
    search = request.args.get('search', '')
    location = request.args.get('location', '')
    min_price = request.args.get('min_price', type=int)
    max_price = request.args.get('max_price', type=int)
    bedrooms = request.args.get('bedrooms', type=int)
    
    filtered_properties = properties_data.copy()
    
    # Filtros
    if search:
        filtered_properties = [p for p in filtered_properties 
                             if search.lower() in p['title'].lower() or search.lower() in p['location'].lower()]
    
    if location:
        filtered_properties = [p for p in filtered_properties 
                             if location.lower() in p['location'].lower()]
    
    if min_price:
        filtered_properties = [p for p in filtered_properties if p['price'] >= min_price]
    
    if max_price:
        filtered_properties = [p for p in filtered_properties if p['price'] <= max_price]
    
    if bedrooms:
        filtered_properties = [p for p in filtered_properties if p['bedrooms'] == bedrooms]
    
    # Apenas propriedades disponíveis
    filtered_properties = [p for p in filtered_properties if p['available']]
    
    return jsonify({
        'success': True,
        'properties': filtered_properties,
        'total': len(filtered_properties)
    })

@properties_bp.route('/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Retorna detalhes de uma propriedade específica"""
    property_data = next((p for p in properties_data if p['id'] == property_id), None)
    
    if not property_data:
        return jsonify({'success': False, 'message': 'Propriedade não encontrada'}), 404
    
    return jsonify({
        'success': True,
        'property': property_data
    })

@properties_bp.route('/properties/<int:property_id>/instant-rent', methods=['POST'])
def instant_rent(property_id):
    """Processa aluguel instantâneo de uma propriedade"""
    data = request.get_json()
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'success': False, 'message': 'ID do usuário é obrigatório'}), 400
    
    # Encontra a propriedade
    property_data = next((p for p in properties_data if p['id'] == property_id), None)
    
    if not property_data:
        return jsonify({'success': False, 'message': 'Propriedade não encontrada'}), 404
    
    if not property_data['available']:
        return jsonify({'success': False, 'message': 'Propriedade não está disponível'}), 400
    
    if not property_data['instant_rent']:
        return jsonify({'success': False, 'message': 'Propriedade não disponível para aluguel instantâneo'}), 400
    
    # Simula processo de aluguel instantâneo
    rental_id = str(uuid.uuid4())
    contract_id = str(uuid.uuid4())
    
    # Marca propriedade como indisponível
    property_data['available'] = False
    
    # Simula geração de contrato e processamento
    rental_data = {
        'rental_id': rental_id,
        'contract_id': contract_id,
        'property_id': property_id,
        'user_id': user_id,
        'monthly_rent': property_data['price'],
        'deposit': property_data['price'] * 2,  # 2 meses de caução
        'start_date': datetime.now().isoformat(),
        'contract_duration': 12,  # 12 meses
        'status': 'active',
        'digital_keys': f"key_{rental_id}",
        'payment_method': 'automatic_debit'
    }
    
    return jsonify({
        'success': True,
        'message': 'Aluguel processado com sucesso!',
        'rental': rental_data,
        'next_steps': [
            'Contrato digital enviado por email',
            'Chaves digitais disponíveis no app',
            'Primeiro pagamento processado automaticamente',
            'Acesso liberado ao imóvel'
        ]
    })

@properties_bp.route('/properties/<int:property_id>/check-eligibility', methods=['POST'])
def check_eligibility(property_id):
    """Verifica elegibilidade do usuário para aluguel instantâneo"""
    data = request.get_json()
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'success': False, 'message': 'ID do usuário é obrigatório'}), 400
    
    # Simula verificação de elegibilidade
    # Em um sistema real, isso consultaria bases de dados de crédito, renda, etc.
    eligibility_score = 85  # Score simulado
    
    eligibility_data = {
        'eligible': eligibility_score >= 70,
        'score': eligibility_score,
        'requirements_met': {
            'identity_verified': True,
            'income_verified': True,
            'credit_score_ok': True,
            'no_restrictions': True
        },
        'estimated_approval_time': '< 1 minuto' if eligibility_score >= 80 else '2-5 minutos'
    }
    
    return jsonify({
        'success': True,
        'eligibility': eligibility_data
    })

@properties_bp.route('/properties/featured', methods=['GET'])
def get_featured_properties():
    """Retorna propriedades em destaque"""
    featured = [p for p in properties_data if p['rating'] >= 4.8 and p['available']]
    
    return jsonify({
        'success': True,
        'featured_properties': featured[:6]  # Máximo 6 em destaque
    })

