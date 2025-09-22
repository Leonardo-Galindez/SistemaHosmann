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
                    <div><label class="block mb-1 text-slate-300">ID</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Nro Remito</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Fecha</label><input type="date" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cliente (Razón Social)</label><input type="text" class="input" /></div>

                    <!-- Datos Operativos -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Datos Operativos</h3>
                    </div>
                    <div><label class="block mb-1 text-slate-300">CUIT</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Ejecutante</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Equipo</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Tipo Equipo</label><input type="text" class="input" /></div>

                    <!-- Movimiento -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Movimiento</h3>
                    </div>
                    <div><label class="block mb-1 text-slate-300">Km Recorridos</label><input type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Viajes</label><input type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Día</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Lugar</label><input type="text" class="input" /></div>

                    <!-- Descripción -->
                    <div class="col-span-full">
                        <label class="block mb-1 text-slate-300">Descripción</label>
                        <textarea rows="3" class="input"></textarea>
                    </div>

                    <!-- Horarios -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Horarios</h3>
                    </div>
                    <div><label class="block mb-1 text-slate-300">Hora Inicio</label><input type="time" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Hora Fin</label><input type="time" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Horas</label><input type="number" step="0.1" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Observación</label><input type="text" class="input" /></div>

                    <!-- Datos Complementarios -->
                    <div class="col-span-full">
                        <h3 class="text-slate-300 text-xs uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">Datos Complementarios</h3>
                    </div>
                    <div><label class="block mb-1 text-slate-300">Km Repaso</label><input type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Lugar Motoniveladora</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Viajes Cisterna</label><input type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Lugar Cisterna</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Destino Batea</label><input type="text" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Cantidad Viajes Batea</label><input type="number" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">M³ Batea</label><input type="number" step="0.01" class="input" /></div>
                    <div><label class="block mb-1 text-slate-300">Litros Gasoil</label><input type="number" step="0.01" class="input" /></div>

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

    return section;
}


export function crearFormUsuario() {
    const section = document.createElement("form");
    section.id = "usuario-form";
    section.className = "fixed inset-0 flex items-center justify-center bg-black/60 z-50";

    section.innerHTML = `
        <div class="bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 max-w-3xl w-full flex flex-col overflow-hidden max-h-screen overflow-y-auto">
        
            
            <!-- Header -->
            <div class="flex justify-between items-center bg-slate-800/90 px-6 py-4 border-b border-slate-700">
                <h2 class="text-xl font-bold text-white flex items-center gap-2">
                    <i class='bx bx-user text-blue-400 text-2xl'></i> Formulario Usuario
                </h2>
                <button id="cerrar-form-usuario" type="button" class="text-slate-400 hover:text-red-500 transition text-xl">
                    <i class='bx bx-x'></i>
                </button>
            </div>

            <!-- Contenido -->
            <div class="overflow-y-auto p-6 grid grid-cols-1 gap-6 text-sm text-white">

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
                <div class="flex justify-end gap-3 mt-6">
                    <button type="submit" class="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 shadow-md">
                        <i class='bx bx-save text-lg'></i> Guardar
                    </button>
                    <button type="reset" class="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 shadow-md">
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
