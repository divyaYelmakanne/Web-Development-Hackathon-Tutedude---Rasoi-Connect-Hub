from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data storage (in a real app, you'd use a database)
suppliers = []
vendors = []
orders = []

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        "message": "Rasoi Connect Hub Backend API",
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "endpoints": {
            "suppliers": "/api/suppliers",
            "vendors": "/api/vendors", 
            "orders": "/api/orders",
            "health": "/health"
        }
    })

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "message": "Flask backend is running successfully!"
    })

# Supplier endpoints
@app.route('/api/suppliers', methods=['GET'])
def get_suppliers():
    """Get all suppliers"""
    return jsonify({
        "suppliers": suppliers,
        "count": len(suppliers)
    })

@app.route('/api/suppliers', methods=['POST'])
def create_supplier():
    """Create a new supplier"""
    data = request.get_json()
    
    if not data or 'name' not in data:
        return jsonify({"error": "Name is required"}), 400
    
    supplier = {
        "id": len(suppliers) + 1,
        "name": data['name'],
        "email": data.get('email', ''),
        "phone": data.get('phone', ''),
        "address": data.get('address', ''),
        "specialties": data.get('specialties', []),
        "created_at": datetime.now().isoformat()
    }
    
    suppliers.append(supplier)
    return jsonify(supplier), 201

# Vendor endpoints
@app.route('/api/vendors', methods=['GET'])
def get_vendors():
    """Get all vendors"""
    return jsonify({
        "vendors": vendors,
        "count": len(vendors)
    })

@app.route('/api/vendors', methods=['POST'])
def create_vendor():
    """Create a new vendor"""
    data = request.get_json()
    
    if not data or 'name' not in data:
        return jsonify({"error": "Name is required"}), 400
    
    vendor = {
        "id": len(vendors) + 1,
        "name": data['name'],
        "email": data.get('email', ''),
        "phone": data.get('phone', ''),
        "address": data.get('address', ''),
        "restaurant_type": data.get('restaurant_type', ''),
        "created_at": datetime.now().isoformat()
    }
    
    vendors.append(vendor)
    return jsonify(vendor), 201

# Order endpoints
@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Get all orders"""
    return jsonify({
        "orders": orders,
        "count": len(orders)
    })

@app.route('/api/orders', methods=['POST'])
def create_order():
    """Create a new order"""
    data = request.get_json()
    
    if not data or 'vendor_id' not in data or 'supplier_id' not in data:
        return jsonify({"error": "Vendor ID and Supplier ID are required"}), 400
    
    order = {
        "id": len(orders) + 1,
        "vendor_id": data['vendor_id'],
        "supplier_id": data['supplier_id'],
        "items": data.get('items', []),
        "total_amount": data.get('total_amount', 0),
        "status": data.get('status', 'pending'),
        "created_at": datetime.now().isoformat()
    }
    
    orders.append(order)
    return jsonify(order), 201

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    print("🚀 Starting Rasoi Connect Hub Backend...")
    print(f"📡 Server will be running on http://localhost:{port}")
    print("✅ Flask backend is running successfully!")
    
    app.run(host='0.0.0.0', port=port, debug=True) 