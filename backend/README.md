# Rasoi Connect Hub Backend

A Flask backend API for the Rasoi Connect Hub project.

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask server:**
   ```bash
   python app.py
   ```

## API Endpoints

### Health Check
- `GET /health` - Check if the backend is running

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Create a new supplier

### Vendors
- `GET /api/vendors` - Get all vendors
- `POST /api/vendors` - Create a new vendor

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order

## Example Usage

### Create a Supplier
```bash
curl -X POST http://localhost:5000/api/suppliers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fresh Vegetables Co",
    "email": "contact@freshveggies.com",
    "phone": "+1234567890",
    "address": "123 Market St, City",
    "specialties": ["vegetables", "fruits"]
  }'
```

### Create a Vendor
```bash
curl -X POST http://localhost:5000/api/vendors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spice Garden Restaurant",
    "email": "info@spicegarden.com",
    "phone": "+1987654321",
    "address": "456 Food Ave, Town",
    "restaurant_type": "Indian"
  }'
```

## Server Information

- **Default Port:** 5000
- **Host:** 0.0.0.0 (accessible from any IP)
- **Debug Mode:** Enabled for development

The server will display "Flask backend is running successfully!" when started. 