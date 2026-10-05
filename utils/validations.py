def validate_name(nombre):
    if not nombre:
        return False
    return len(nombre.strip()) >= 4

def validate_email(email):
    if not email:
        return False
    if len(email) < 15:
        return False

    return "@" in email

def validate_telefono(telefono):
    if not telefono:
        return False
    if len(telefono) < 8:
        return False
    return telefono.isdigit()

def validate_comuna(comuna_id):
    if not comuna_id:
        return False
    return comuna_id.isdigit()

def validate_rut(rut):
    if not rut:
        return False
    return len(rut) >= 8

def validate_calle(calle):
    if not calle:
        return False
    return len(calle.strip()) >= 10