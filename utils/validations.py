from datetime import datetime, timedelta

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

def validate_lugar(lugar):
    if not lugar:
        return False
    return len(lugar.strip()) >= 8

def validate_fecha(fecha):
    if not fecha:
        return False
    try:
        fecha_avistamiento = datetime.strptime(fecha, "%Y-$m-%DT%H:M")
    except ValueError:
        return False

    fecha_actual = datetime.now()
    fecha_minima= fecha_actual - timedelta(days=365)
    
    return fecha_minima <= fecha_avistamiento <= fecha_actual

def validate_voluntario(voluntario_id):
    if not voluntario_id:
        return False
    return voluntario_id.isdigit()

def validate_ave(ave_id):
    if not ave_id:
        return False
    return ave_id.isdigit()