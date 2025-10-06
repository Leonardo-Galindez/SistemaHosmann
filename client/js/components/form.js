export function crearFormUpdate() {
    const section = document.createElement("section");
    section.id = "form-remito";
    section.className = "fixed inset-0 flex items-center justify-center bg-black/60 z-50"; // overlay modal

    section.innerHTML = `
        <div class="bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <!-- Header -->
            <div class="flex justify-between items-center bg-slate-800/90 px-6 py-4 border-b border-slate-700">
                <h2 class="text-xl font-bold text-white flex items-center gap-2">
                    <i class='bx bx-receipt text-blue-400 text-2xl'></i> Formulario Parte
                </h2>
                <button id="cerrar-form" class="text-slate-400 hover:text-red-500 transition text-xl">
                    <i class='bx bx-x'></i>
                </button>
            </div>

            <!-- Contenedor con scroll -->
            <div class="overflow-y-auto p-6">
                <form class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-white">

                    <!-- Datos Principales -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Datos Principales</h3>
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-300">ID Respuesta</label>
                        <input name="idRespuesta" type="text" class="input readonly" readonly />
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-300">Nro Parte</label>
                        <input name="nroParte" type="text" class="input readonly" readonly />
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-300">Fecha</label>
                        <input name="fecha" type="date" class="input" />
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-300">Cliente (Razón Social)</label>
                        <input name="cliente" type="text" class="input" />
                    </div>

                    <!-- Datos Operativos -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Datos Operativos</h3>
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-300">Ejecutante</label>
                        <input name="ejecutante" type="text" class="input" />
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-300">Equipo</label>
                        <input name="equipo" type="text" class="input" />
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-300">Tipo Equipo</label>
                        <input name="tipoEquipo" type="text" class="input" />
                    </div>

                    <!-- Movimiento -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Movimiento</h3>
                    </div>

                    <div><label class="block mb-1 text-slate-300">Km Recorridos</label><input name="kmRecorridos" type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Viajes</label><input name="cantidadViajes" type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Día</label><input name="dia" type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Lugar</label><input name="lugar" type="text" class="input" /></div>

                    <!-- Descripción -->
                    <div class="col-span-full">
                        <label class="block mb-1 text-slate-300">Descripción</label>
                        <textarea name="descripcion" rows="3" class="input"></textarea>
                    </div>

                    <!-- Horarios -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Horarios</h3>
                    </div>

                    <div><label class="block mb-1 text-slate-300">Hora Inicio</label><input name="horaInicio" type="time" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Hora Fin</label><input name="horaFin" type="time" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Horas</label><input name="cantidadHoras" type="number" step="0.1" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Observación</label><input name="observaciones" type="text" class="input" /></div>

                    <!-- Datos Complementarios -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Datos Complementarios</h3>
                    </div>

                    <div><label class="block mb-1 text-slate-300">Km Repaso</label><input name="kmRepaso" type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Lugar Motoniveladora</label><input name="lugarMotiniveladora" type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Viajes Cisterna</label><input name="viajesCisterna" type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Lugar Cisterna</label><input name="lugarCisterna" type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Destino Batea</label><input name="destinoBatea" type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Viajes Batea</label><input name="viajesBatea" type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">M³ Batea</label><input name="m3Batea" type="number" step="0.01" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Litros Gasoil</label><input name="ltsgasoil" type="number" step="0.01" class="input" /></div>
                    
                    <!-- Detalle -->
                    <div class="col-span-full">
                        <label class="block mb-1 text-slate-300">Detalle</label>
                        <textarea name="detalle" rows="3" class="input" placeholder="Indicar porque esta desaprobado el parte"></textarea>
                    </div>
                    
                    <!-- Botones -->
                    <div class="col-span-full flex justify-end gap-3 mt-6">
                        <button type="submit" class="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 shadow-md">
                            <i class='bx bx-save text-lg'></i> Guardar
                        </button>
                        <button type="reset" class="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 shadow-md">
                            <i class='bx bx-x-circle text-lg'></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Clase de estilo para inputs
    const style = document.createElement("style");
    style.textContent = `
        .input {
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: rgb(30 41 59);
            border: 1px solid rgb(71 85 105);
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .input:focus {
            outline: none;
            border-color: rgb(59 130 246);
            box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
        }
        .readonly {
            background-color: rgba(51, 65, 85, 0.8);
            color: rgb(148, 163, 184);
            cursor: not-allowed;
        }
    `;
    section.appendChild(style);

    return section;
}


export function crearFormUsuario() {
    const section = document.createElement("form");
    section.id = "usuario-form";
    section.className = "fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4";

    section.innerHTML = `
        <div class="bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 
                    w-full max-w-md sm:max-w-2xl lg:max-w-3xl flex flex-col overflow-hidden max-h-[90vh]">
            
            <!-- Header -->
            <div class="flex justify-between items-center bg-slate-800/90 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700">
                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <i class='bx bx-user text-blue-400 text-xl sm:text-2xl'></i> Formulario Usuario
                </h2>
                <button id="cerrar-form-usuario" type="button" class="text-slate-400 hover:text-red-500 transition text-xl">
                    <i class='bx bx-x'></i>
                </button>
            </div>

            <!-- Contenido -->
            <div class="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 gap-4 sm:gap-6 text-sm text-white">

                <div>
                    <label class="block mb-1 text-slate-300">ID</label>
                    <input type="text" class="input" />
                </div>

                <div>
                    <label class="block mb-1 text-slate-300">Nombre</label>
                    <input type="text" class="input" required />
                </div>

                <div>
                    <label class="block mb-1 text-slate-300">Apellido</label>
                    <input type="text" class="input" required />
                </div>

                <div>
                    <label class="block mb-1 text-slate-300">Teléfono</label>
                    <input type="tel" class="input" />
                </div>

                <div>
                    <label class="block mb-1 text-slate-300">Correo</label>
                    <input type="email" class="input" required />
                </div>

                <div>
                    <label class="block mb-1 text-slate-300">Contraseña</label>
                    <input type="password" id="password" class="input" required />
                </div>

                <div>
                    <label class="block mb-1 text-slate-300">Repetir Contraseña</label>
                    <input type="password" id="password2" class="input" required />
                    <p id="password-error" class="text-red-500 text-xs mt-1 hidden">Las contraseñas no coinciden</p>
                </div>

                <div>
                    <label class="block mb-1 text-slate-300">Tipo de Usuario</label>
                    <select class="input" required>
                        <option value="">Seleccione un tipo</option>
                        <option value="admin">Admin</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </div>

                <!-- Botones -->
                <div class="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6">
                    <button type="submit" class="w-full sm:w-auto px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 shadow-md">
                        <i class='bx bx-save text-lg'></i> Guardar
                    </button>
                    <button type="reset" class="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 shadow-md">
                        <i class='bx bx-x-circle text-lg'></i> Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;

    // Clase de estilo para inputs
    const style = document.createElement("style");
    style.textContent = `
        .input {
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: rgb(30 41 59); /* slate-800 */
            border: 1px solid rgb(71 85 105); /* slate-600 */
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .input:focus {
            outline: none;
            border-color: rgb(59 130 246); /* blue-500 */
            box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
        }
    `;
    section.appendChild(style);

    // ---- Validación de contraseñas ----
    section.addEventListener("submit", (e) => {
        const pass = section.querySelector("#password").value;
        const pass2 = section.querySelector("#password2").value;
        const error = section.querySelector("#password-error");

        if (pass !== pass2) {
            e.preventDefault();
            error.classList.remove("hidden");
        } else {
            error.classList.add("hidden");
        }
    });

    return section;
}

export function crearFormCliente() {
    const section = document.createElement("form");
    section.id = "cliente-form";
    section.className = "fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4";

    section.innerHTML = `
        <div class="bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 
                    w-full max-w-md sm:max-w-2xl lg:max-w-3xl flex flex-col overflow-hidden max-h-[90vh]">
            
            <!-- Header -->
            <div class="flex justify-between items-center bg-slate-800/90 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700">
                <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <i class='bx bx-user text-blue-400 text-xl sm:text-2xl'></i> Formulario Cliente
                </h2>
                <button id="cerrar-form-cliente" type="button" class="text-slate-400 hover:text-red-500 transition text-xl">
                    <i class='bx bx-x'></i>
                </button>
            </div>

            <!-- Contenido -->
            <div class="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 gap-4 sm:gap-6 text-sm text-white">

                <div>
                    <label for="cliente-cuit" class="block mb-1 text-slate-300">CUIT</label>
                    <input id="cliente-cuit" type="text" class="input" required />
                </div>

                <div>
                    <label for="cliente-razonSocial" class="block mb-1 text-slate-300">Razón Social</label>
                    <input id="cliente-razonSocial" type="text" class="input" required />
                </div>

                <div>
                    <label for="cliente-correo" class="block mb-1 text-slate-300">Correo</label>
                    <input id="cliente-correo" type="email" class="input" required />
                </div>

                <div>
                    <label for="cliente-direccion" class="block mb-1 text-slate-300">Dirección</label>
                    <input id="cliente-direccion" type="text" class="input" required />
                </div>

                <!-- Botones -->
                <div class="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6">
                    <button type="submit" class="w-full sm:w-auto px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 shadow-md">
                        <i class='bx bx-save text-lg'></i> Guardar
                    </button>
                    <button type="reset" class="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 shadow-md">
                        <i class='bx bx-x-circle text-lg'></i> Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;

    // Clase de estilo para inputs
    const style = document.createElement("style");
    style.textContent = `
        .input {
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: rgb(30 41 59); /* slate-800 */
            border: 1px solid rgb(71 85 105); /* slate-600 */
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .input:focus {
            outline: none;
            border-color: rgb(59 130 246); /* blue-500 */
            box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
        }
    `;
    section.appendChild(style);

    // ---- Envío del formulario ----
    section.addEventListener("submit", (e) => {
        e.preventDefault();

        const cliente = {
            cuit: section.querySelector("#cliente-cuit").value.trim(),
            razonSocial: section.querySelector("#cliente-razonSocial").value.trim(),
            correo: section.querySelector("#cliente-correo").value.trim(),
            direccion: section.querySelector("#cliente-direccion").value.trim()
        };

        console.log("Cliente a guardar:", cliente);
        // Aquí harías el fetch o axios hacia tu backend PHP/Node para guardar en la BD
    });

    return section;
}
