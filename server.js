const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

process.on('uncaughtException', (err) => {
    console.log('❌ Error no controlado:', err);
});

process.on('unhandledRejection', (err) => {
    console.log('❌ Promesa no manejada:', err);
});
/* =========================
   🚍 BUSES (CRUD)
========================= */

// LISTAR
app.get('/buses', (req, res) => {
    db.query("SELECT * FROM buses", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

// CREAR
app.post('/buses', (req, res) => {
    const { placa, marca, modelo, anio } = req.body;

    db.query(
        "INSERT INTO buses (placa, marca, modelo, anio) VALUES (?, ?, ?, ?)",
        [placa, marca, modelo, anio],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Bus creado" });
        }
    );
});

// EDITAR
app.put('/buses/:id', (req, res) => {
    const { placa, marca, modelo, anio } = req.body;

    db.query(
        "UPDATE buses SET placa=?, marca=?, modelo=?, anio=? WHERE id=?",
        [placa, marca, modelo, anio, req.params.id],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Bus actualizado" });
        }
    );
});

// ELIMINAR
app.delete('/buses/:id', (req, res) => {
    db.query("DELETE FROM buses WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: "Bus eliminado" });
    });
});

app.get('/buses/:id', (req, res) => {
    db.query(
        "SELECT * FROM buses WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.json(err);

            if (result.length === 0) {
                return res.status(404).json({ message: "Bus no encontrado" });
            }

            res.json(result[0]);
        }
    );
});


/* =========================
   👨‍✈️ CONDUCTORES (CRUD)
========================= */

app.get('/conductores', (req, res) => {
    db.query("SELECT * FROM conductores", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

app.post('/conductores', (req, res) => {
    const { nombre, dni, telefono, licencia, tipoLicencia } = req.body;

    db.query(
        "INSERT INTO conductores (nombre, dni, telefono, licencia, tipoLicencia) VALUES (?, ?, ?, ?, ?)",
        [nombre, dni, telefono, licencia, tipoLicencia],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Conductor creado" });
        }
    );
});

app.put('/conductores/:id', (req, res) => {
    const { nombre, dni, telefono, licencia, tipoLicencia } = req.body;

    db.query(
        "UPDATE conductores SET nombre=?, dni=?, telefono=?, licencia=?, tipoLicencia=? WHERE id=?",
        [nombre, dni, telefono, licencia, tipoLicencia, req.params.id],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Conductor actualizado" });
        }
    );
});

app.delete('/conductores/:id', (req, res) => {
    db.query("DELETE FROM conductores WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: "Conductor eliminado" });
    });
});

app.get('/conductores/:id', (req, res) => {
    db.query(
        "SELECT * FROM conductores WHERE id = ?",
        [req.params.id],
        (err, result) => {
            if (err) return res.json(err);

            if (result.length === 0) {
                return res.status(404).json({ message: "Conductor no encontrado" });
            }

            res.json(result[0]);
        }
    );
});

/* =========================
   🏢 SUCURSALES (CRUD)
========================= */

app.get('/sucursales', (req, res) => {
    db.query("SELECT * FROM sucursales", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

app.get('/sucursales/:id', (req, res) => {
    db.query(
        "SELECT * FROM sucursales WHERE id = ?",
        [req.params.id],
        (err, result) => {
            if (err) return res.json(err);

            if (result.length === 0) {
                return res.status(404).json({ message: "Sucursal no encontrada" });
            }

            res.json(result[0]);
        }
    );
});

app.post('/sucursales', (req, res) => {
    const { codigo, nombre, direccion } = req.body;

    db.query(
        "INSERT INTO sucursales (codigo, nombre, direccion) VALUES (?, ?, ?)",
        [codigo, nombre, direccion],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Sucursal creada" });
        }
    );
});

app.put('/sucursales/:id', (req, res) => {
    const { codigo, nombre, direccion } = req.body;

    db.query(
        "UPDATE sucursales SET codigo=?, nombre=?, direccion=? WHERE id=?",
        [codigo, nombre, direccion, req.params.id],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Sucursal actualizada" });
        }
    );
});

app.delete('/sucursales/:id', (req, res) => {
    db.query(
        "DELETE FROM sucursales WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Sucursal eliminada" });
        }
    );
});

/* =========================
   📍 DESTINOS (CRUD)
========================= */

app.get('/destinos', (req, res) => {
    db.query("SELECT * FROM destinos", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

app.post('/destinos', (req, res) => {
    const { nombre, direccion } = req.body;

    db.query(
        "INSERT INTO destinos (nombre, direccion) VALUES (?, ?)",
        [nombre, direccion],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Destino creado" });
        }
    );
});

app.put('/destinos/:id', (req, res) => {
    const { nombre, direccion } = req.body;

    db.query(
        "UPDATE destinos SET nombre=?, direccion=? WHERE id=?",
        [nombre, direccion, req.params.id],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Destino actualizado" });
        }
    );
});

app.delete('/destinos/:id', (req, res) => {
    db.query("DELETE FROM destinos WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: "Destino eliminado" });
    });
});

app.get('/destinos/:id', (req, res) => {

    db.query(
        "SELECT * FROM destinos WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if (err) return res.json(err);

            if (result.length === 0) {
                return res.status(404).json({ message: "Destino no encontrado" });
            }

            res.json(result[0]);
        }
    );
});


/* =========================
   🚍 VIAJES
========================= */

app.get('/viajes', (req, res) => {

    const sql = `
    SELECT 
        v.id,
        v.precio,
        v.tiempo_aproximado,
        v.fecha,

        b.id AS bus_id,
        b.placa,

        c.id AS conductor_id,
        c.nombre AS conductor,

        s.id AS origen_id,
        s.nombre AS origen,

        d.id AS destino_id,
        d.nombre AS destino

    FROM viajes v
    JOIN buses b ON v.bus_id = b.id
    JOIN conductores c ON v.conductor_id = c.id
    JOIN sucursales s ON v.origen_id = s.id
    JOIN destinos d ON v.destino_id = d.id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

app.get('/viajes/:id', (req, res) => {

    const sql = `
    SELECT * FROM viajes WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) return res.json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Viaje no encontrado" });
        }

        res.json(result[0]);
    });
});

app.post('/viajes', (req, res) => {

    const {
        bus_id,
        conductor_id,
        origen_id,
        destino_id,
        precio,
        tiempo_aproximado,
        fecha
    } = req.body;

    const sql = `
    INSERT INTO viajes 
    (bus_id, conductor_id, origen_id, destino_id, precio, tiempo_aproximado, fecha)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [bus_id, conductor_id, origen_id, destino_id, precio, tiempo_aproximado, fecha],
        (err, result) => {

            if (err) return res.json(err);

            res.json({
                message: "Viaje creado",
                id: result.insertId
            });
        }
    );
});

app.put('/viajes/:id', (req, res) => {

    const {
        bus_id,
        conductor_id,
        origen_id,
        destino_id,
        precio,
        tiempo_aproximado,
        fecha
    } = req.body;

    const sql = `
    UPDATE viajes SET
        bus_id=?,
        conductor_id=?,
        origen_id=?,
        destino_id=?,
        precio=?,
        tiempo_aproximado=?,
        fecha=?
    WHERE id=?
    `;

    db.query(sql,
        [bus_id, conductor_id, origen_id, destino_id, precio, tiempo_aproximado, fecha, req.params.id],
        (err, result) => {

            if (err) return res.json(err);

            res.json({ message: "Viaje actualizado" });
        }
    );
});

app.delete('/viajes/:id', (req, res) => {

    db.query(
        "DELETE FROM viajes WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err) return res.json(err);

            res.json({ message: "Viaje eliminado" });
        }
    );
});




/* =========================
   🪑 RESERVAS
========================= */

app.get('/reservas/:viaje_id', (req, res) => {
    db.query(
        "SELECT asiento FROM reservas WHERE viaje_id=?",
        [req.params.viaje_id],
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
});

app.post('/reservas', (req, res) => {
    const { viaje_id, asiento, nombre_cliente, dni_cliente } = req.body;

    db.query(
        `INSERT INTO reservas 
        (viaje_id, asiento, nombre_cliente, dni_cliente, estado, fecha_reserva)
        VALUES (?, ?, ?, ?, 'confirmado', NOW())`,
        [viaje_id, asiento, nombre_cliente, dni_cliente],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: "Reserva creada" });
        }
    );
});


/* =========================
   🚀 SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API corriendo en puerto " + PORT);
});