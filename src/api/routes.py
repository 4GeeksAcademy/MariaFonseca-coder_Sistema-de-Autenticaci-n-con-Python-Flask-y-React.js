"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import json


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# create register part
@api.route("/signup", methods=["POST"])
def create_one_user():
    try:
        body = json.loads(request.data)

        # Verificación si todos los campos están presentes
        required_fields = ["name", "last_name", "email", "phone_number", "password"]
        for field in required_fields:
            if field not in body:
                return jsonify({"msg": f"Missing field: {field}"}), 400

        # Verificar si el correo ya está registrado
        existing_user = User.query.filter_by(email=body["email"]).first()
        if existing_user:
            return jsonify({"msg": "Este correo ya está registrado. Por favor, usa otro email."}), 400

        # Crear nuevo usuario con los datos recibidos
        new_user = User(
            name=body["name"],
            last_name=body["last_name"],
            email=body["email"],
            phone_number=body["phone_number"],
            password=current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8'),
            is_active=True  # Valor fijo o lo puedes recibir si lo deseas.
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User created"}), 201  # 201 porque estamos creando un nuevo recurso
    except Exception as e:
        print("Error en la creación del usuario:", str(e))  # Registra el error en consola
        return jsonify({"msg": "Internal Server Error"}), 500


# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Valida el usuario por email
    user =User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "User not found"}), 401
    # Verificar la contraseña que sea la encriptada
    valid_password = current_app.bcrypt.check_password_hash(user.password, password)
    if valid_password is False:
        return jsonify({"msg": "Invalid password or user email"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
# @api.route("/perfil", methods=["GET"])
# @jwt_required()
# def protected():
#     # Access the identity of the current user with get_jwt_identity
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200



@api.route("/perfil", methods=["GET"])
@jwt_required()
def get_profile():
    # Obtener la identidad del usuario actual
    current_user = get_jwt_identity()

    # Buscar al usuario en la base de datos (reemplazar "email" si usas ID como identidad)
    user = User.query.filter_by(email=current_user).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Retornar los datos del usuario
    return jsonify({
        "name": user.name,
        "last_name": user.last_name,
        "email": user.email,
        "phone_number": user.phone_number,
    }), 200