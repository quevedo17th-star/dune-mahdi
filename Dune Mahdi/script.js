// --- Placement Logic ---
class PlacementLogic {
    getHarvesterInstructions() {
        return `
            <ol>
                <li><strong>En el Sector de Cosecha (Carta de Táctica 1):</strong></li>
                <li>Coloca Cosechadoras en este orden de prioridad:
                    <ul>
                        <li>Áreas de Desierto Profundo vacías (no adyacentes a Atreides/Sietch).</li>
                        <li>Áreas de Desierto vacías (no adyacentes a Atreides/Sietch).</li>
                        <li>Otras Áreas de Desierto Profundo libres.</li>
                        <li>Otras Áreas de Desierto libres.</li>
                    </ul>
                </li>
                <li><em>Si no caben:</em> Coloca en un Sector Adyacente (NO en el Sietch Objetivo) siguiendo el mismo orden.</li>
            </ol>
        `;
    }

    getCarryallInstructions() {
        return `
            <p>Coloca Alas de Acarreo en Zonas Aéreas que protejan al <strong>mayor número de Cosechadoras</strong>.</p>
        `;
    }

    getOrnithopterInstructions() {
        return `
            <ol>
                <li>Si hay Legiones Harkonnen a 2 áreas de un Sietch atacable: Coloca 1 Ornitóptero en su Zona Aérea.</li>
                <li>Coloca el resto en Zonas Aéreas conectadas al <strong>Sietch Objetivo</strong>.</li>
                <li><em>Si no hay espacio:</em> Colócalos en Zonas Aéreas de Sectores adyacentes al Sietch Objetivo (Prioridad: Sector Central, luego otros).</li>
            </ol>
        `;
    }
}

// --- Action Logic ---
class ActionLogic {
    getLeadershipStrategyInstructions() {
        return `
            <h3>Prioridad de Acción (Liderazgo/Estrategia)</h3>
            
            <div style="border: 1px solid #ffd700; background: rgba(255, 215, 0, 0.05); padding: 0.8rem; border-radius: 4px; margin-bottom: 1rem; text-align: left;">
                <strong style="color: #ffd700;">🏆 1. REGLA DE ORO (Líderes de Renombre):</strong>
                <ul style="margin-top: 0.4rem; font-size: 0.9rem; padding-left: 1.2rem;">
                    <li>¿Hay un Líder de Renombre (Rabban/Feyd) con icono coincidente?
                        <ul style="list-style: none; padding-left: 0.5rem; margin-top: 0.2rem;">
                            <li>✅ <strong>SÍ:</strong> ¡Ejecuta su Acción Especial! (Fin del turno).</li>
                            <li>❌ <strong>NO:</strong> Pasa a la Jerarquía Estándar.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <h4 style="margin-bottom: 0.5rem;">2. Jerarquía de Ejecución Estándar</h4>
            <div style="font-size: 0.9rem; text-align: left;">
                <div style="margin-bottom: 0.8rem;">
                    <strong>A. ATACAR UN SIETCH</strong> <span style="font-size: 0.85rem; opacity: 0.8;">(Si PC Harkonnen > Defensa Sietch)</span>
                    <ol type="1" style="background: rgba(255,255,255,0.05); padding: 0.4rem 0.4rem 0.4rem 1.4rem; border-radius: 4px; margin-top: 0.2rem;">
                        <li>Sietch de <strong>Nivel más alto</strong> (incluso oculto).</li>
                        <li>Mayor diferencia de PC.</li>
                        <li>No requiere Ornitóptero.</li>
                        <li>Sietch Objetivo.</li>
                    </ol>
                </div>

                <div style="margin-bottom: 0.8rem;">
                    <strong>B. ATACAR UNA LEGIÓN</strong> <span style="font-size: 0.85rem; opacity: 0.8;">(Si PC Harkonnen > PC Atreides)</span>
                    <ul style="margin-top: 0.2rem; padding-left: 1.2rem;">
                        <li>🚫 <strong>Sin Ornitópteros</strong> para atacar legiones.</li>
                    </ul>
                    <ol type="1" style="background: rgba(255,255,255,0.05); padding: 0.4rem 0.4rem 0.4rem 1.4rem; border-radius: 4px; margin-top: 0.2rem;">
                        <li>Legión con <strong>Mayor PC</strong>.</li>
                        <li>Contiene Líder de Renombre.</li>
                    </ol>
                </div>

                <div style="margin-bottom: 0.8rem;">
                    <strong>C. MOVER LEGIONES</strong> <span style="font-size: 0.85rem; opacity: 0.8;">(Si no se puede atacar)</span>
                    <ul style="padding-left: 1.2rem; margin-top: 0.2rem;">
                        <li><strong>Objetivo:</strong> Sietch más cercano.</li>
                        <li><strong>Ruta:</strong> Camino más corto (ignora fronteras rojas).</li>
                        <li><strong>Desempates:</strong> Fusión > Cercanía a Sietch > Terreno Defensivo.</li>
                    </ul>
                </div>
            </div>

            <hr style="border-color: var(--color-sand); opacity: 0.3; margin: 1rem 0;">

            <div style="background: rgba(138, 0, 0, 0.15); border: 1px solid var(--color-harkonnen); padding: 0.8rem; border-radius: 4px; text-align: left;">
                <h4 style="margin-top: 0; color: #ff5252;">⚔️ Cálculo de Potencia de Combate (PC)</h4>
                <p style="font-size: 0.85rem; margin-bottom: 0.5rem;"><em>Fundamental para decidir si ataca. Solo ataca si su PC es ESTRICTAMENTE MAYOR.</em></p>
                
                <div style="margin-bottom: 0.8rem;">
                    <strong style="color: var(--color-sand);">1. FÓRMULA ESTÁNDAR (Rápida)</strong>
                    <ul style="font-size: 0.9rem; margin-top: 0.2rem; padding-left: 1.2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem;">
                        <li><strong>+1</strong> por Unidad</li>
                        <li><strong>+1</strong> por Líder</li>
                        <li><strong>+2</strong> por Ficha Despliegue</li>
                    </ul>
                    <div style="font-size: 0.8rem; margin-top: 0.3rem; opacity: 0.8;">* Nivel de Sietch NO suma aquí.</div>
                </div>

                <div>
                    <strong style="color: var(--color-sand);">2. FÓRMULA DE DESEMPATE (Detallada)</strong>
                    <ul style="font-size: 0.9rem; margin-top: 0.2rem; padding-left: 1.2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem;">
                        <li><strong>1 pt:</strong> Líder Genérico</li>
                        <li><strong>2 pts:</strong> Unidad Normal / Líder Renombre</li>
                        <li><strong>3 pts:</strong> Unidad Élite</li>
                        <li><strong>4 pts:</strong> Sardaukar / Fedaykin</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getDeploymentInstructions() {
        return `
            <h3>Acción de Despliegue</h3>
            
            <div style="font-size: 0.9rem; text-align: left;">
                <h4 style="margin-bottom: 0.5rem; color: var(--color-sand);">1. ¿QUÉ SE DESPLIEGA?</h4>
                <p style="margin-bottom: 0.5rem;">Despliega las Unidades indicadas + <strong>1 Líder</strong>.</p>
                
                <div style="background: rgba(255,255,255,0.05); padding: 0.6rem; border-radius: 4px; margin-bottom: 1rem;">
                    <strong>Jerarquía de Líder (Orden Estricto):</strong>
                    <ol type="1" style="padding-left: 1.2rem; margin-top: 0.3rem;">
                        <li><strong style="color: #ffd700;">Prioridad Máxima:</strong> Rabban o Feyd-Rautha.</li>
                        <li><strong>Líder de Renombre:</strong> Cualquier otro disponible.</li>
                        <li><strong>Líder Genérico:</strong> Bashar.</li>
                    </ol>
                    <div style="font-size: 0.85rem; margin-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 0.3rem;">
                        <em>* Si falta una Unidad: Sustitúyela por una de <strong style="color: #ff9100;">PC Superior</strong> (o inferior si no hay).</em>
                    </div>
                </div>

                <h4 style="margin-bottom: 0.5rem; color: var(--color-sand);">2. ¿DÓNDE SE DESPLIEGA?</h4>
                <p style="margin-bottom: 0.3rem;">Busca un <strong>Asentamiento Harkonnen</strong> siguiendo este orden:</p>
                
                <ol type="A" style="background: rgba(138, 0, 0, 0.1); border: 1px solid var(--color-harkonnen); padding: 0.6rem 0.6rem 0.6rem 1.4rem; border-radius: 4px; margin-bottom: 1rem;">
                    <li style="margin-bottom: 0.4rem;">Donde esté la Legión con <strong>Mayor Potencia de Combate</strong>.</li>
                    <li>El más cercano al <strong>Sietch Objetivo</strong>.</li>
                </ol>

                <div style="border-left: 3px solid #ff5252; padding-left: 0.8rem; background: rgba(255, 82, 82, 0.05);">
                    <strong style="color: #ff5252;">⚠️ Límite de Acumulación:</strong>
                    <p style="margin-top: 0.3rem; font-size: 0.9rem;">
                        Si el despliegue excede el límite (6 unidades comúnmente), las unidades sobrantes van al <strong>siguiente asentamiento</strong> en orden de prioridad.
                    </p>
                </div>

                <div style="margin-top: 0.8rem; border-left: 3px solid var(--color-spice); padding-left: 0.8rem; background: rgba(193, 98, 0, 0.05);">
                    <strong style="color: var(--color-spice);">⚠️ Falta de Miniaturas:</strong>
                    <p style="margin-top: 0.3rem; font-size: 0.9rem;">
                        Si NO quedan miniaturas del tipo requerido en la reserva:
                    </p>
                    <ol style="margin-top: 0.3rem; padding-left: 1.2rem; font-size: 0.9rem;">
                        <li>Sustitúyela por una unidad de <strong>PC Inmediatamente Superior</strong>.</li>
                        <li>Si no hay superior, usa una de <strong>PC Inmediatamente Inferior</strong>.</li>
                    </ol>
                </div>
            </div>
        `;
    }

    getMentatInstructions() {
        return `
            <h3>Acción de Mentat</h3>
            
            <div style="font-size: 0.9rem; text-align: left;">
                <div style="background: rgba(255,255,255,0.05); padding: 0.8rem; border-radius: 4px; margin-bottom: 1rem;">
                    <strong style="color: var(--color-spice);">1. SELECCIÓN Y ROBO (Alternancia)</strong>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem;">
                        <li><strong>Mira la pila de descartes:</strong>
                            <ul style="list-style: none; padding-left: 0; margin-top: 0.2rem;">
                                <li>🦅 Visible Harkonnen -> Roba <strong>Aliados Corrino</strong>.</li>
                                <li>⚜️ Visible Corrino -> Roba <strong>Casa Harkonnen</strong>.</li>
                                <li>🕳️ Vacío -> Roba <strong>Casa Harkonnen</strong>.</li>
                            </ul>
                        </li>
                    </ul>
                    <div style="font-size: 0.85rem; margin-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 0.3rem;">
                        <em>* Juega la carta <strong>inmediatamente</strong>.</em>
                    </div>
                </div>

                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--color-sand);">2. RESOLUCIÓN DE EFECTOS</strong>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem; line-height: 1.5;">
                        <li><strong>Desplegar / Mover / Atacar:</strong> Usa reglas de Despliegue o Liderazgo (Prioridad Sietch).</li>
                        <li><strong>Colocar / Sustituir Unidades:</strong> Usa reglas de Casa (Cerca Sietch Objetivo).</li>
                        <li><strong>Colocar Vehículos:</strong> Usa reglas de Colocación (Cosechadoras en Sector Cosecha).</li>
                        <li><strong>Robar Cartas:</strong> ⚠️ <strong>NO las juegues.</strong> Ponlas en el <strong>Mazo de Refuerzos</strong>.</li>
                        <li><strong>Juega una Carta:</strong> Roba otra (alternando) y juega YA.</li>
                    </ul>
                </div>

                <div style="background: rgba(138, 0, 0, 0.1); border-left: 3px solid var(--color-harkonnen); padding: 0.6rem; margin-bottom: 0.8rem;">
                    <strong>📍 Eventos Genéricos:</strong>
                    <p style="margin-top: 0.2rem; font-size: 0.9rem;">Resuelve lo más cerca posible del <strong>Sietch Objetivo</strong>.</p>
                </div>

                <div style="background: rgba(40, 40, 40, 0.5); border: 1px solid #777; padding: 0.6rem; border-radius: 4px;">
                    <strong>🚫 Cartas Imposibles:</strong>
                    <p style="margin-top: 0.2rem; font-size: 0.9rem;">
                        Si un efecto no se puede cumplir, <strong>coloca la carta en el Mazo de Refuerzos</strong> (Combustible para combate).
                    </p>
                </div>
            </div>
        `;
    }

    getHouseInstructions() {
        return `
            <h3>Acción de Casa (Harkonnen)</h3>
            
            <div style="font-size: 0.9rem; text-align: left;">
                <div style="border-left: 3px solid #ff5252; padding-left: 0.8rem; background: rgba(255, 82, 82, 0.05); margin-bottom: 1rem;">
                    <strong style="color: #ff5252;">🧛‍♂️ Nota del Barón:</strong>
                    <p style="margin-top: 0.3rem; font-size: 0.9rem;">
                        Si el <strong>Barón Harkonnen</strong> está activo (bocarriba), sus capacidades especiales tienen prioridad sobre estas reglas estándar.
                    </p>
                </div>

                <div style="background: rgba(255, 215, 0, 0.1); border: 1px solid #ffd700; padding: 0.8rem; border-radius: 4px; margin-bottom: 1rem; text-align: center;">
                    <strong style="color: #ffd700; font-size: 1rem;">⚡ ¡EJECUTA AMBOS EFECTOS! ⚡</strong>
                    <p style="margin-top: 0.3rem; font-size: 0.9rem;">(Primero Sustitución, luego Vehículos)</p>
                </div>

                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--color-sand);">1. SUSTITUCIÓN DE UNIDADES</strong>
                    <p style="margin-top: 0.2rem; margin-bottom: 0.4rem;">Mejora tropas (Normal -> Élite) en este orden de prioridad:</p>
                    <ol type="1" style="background: rgba(255,255,255,0.05); padding: 0.6rem 0.6rem 0.6rem 1.4rem; border-radius: 4px;">
                        <li>Legión más cercana a <strong>CUALQUIER Sietch</strong>.</li>
                        <li>Legión con <strong>Mayor PC</strong> (vs un Sietch atacable).</li>
                        <li>Legión más cercana al <strong>Sietch Objetivo</strong>.</li>
                    </ol>
                </div>

                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--color-sand);">2. COLOCACIÓN DE VEHÍCULOS</strong>
                    <p style="margin-top: 0.2rem; margin-bottom: 0.4rem;">Coloca SIEMPRE <strong>1 Cosechadora</strong> Y <strong>1 Ornitóptero</strong>.</p>
                    
                    <ul style="padding-left: 1.2rem; line-height: 1.5;">
                        <li><strong>🚜 Cosechadora:</strong> Prioriza <strong>Sector de Cosecha Actual</strong> (Desierto profundo vacío > Desierto vacío).</li>
                        <li><strong>🚁 Ornitóptero:</strong> 
                            <ul style="list-style: none; padding-left: 0.5rem; margin-top: 0.2rem; background: rgba(0,0,0,0.2); padding: 0.4rem; border-radius: 4px;">
                                <li>1. Zona Aérea a <strong>2 áreas</strong> de un Sietch (para atacar).</li>
                                <li>2. Zona Aérea conectada al <strong>Sector del Sietch Objetivo</strong>.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
}

// --- UI Manager ---
class UIManager {
    constructor() {
        this.roundDisplay = document.getElementById('round-display');
        this.phaseDisplay = document.getElementById('phase-display');
        this.mainContent = document.getElementById('main-content');
        this.nextBtn = document.getElementById('next-btn');
        this.undoBtn = document.getElementById('undo-btn');
        this.logBtn = document.getElementById('log-btn');
        this.dieControls = document.getElementById('die-controls');
    }

    showDieControls() { if (this.dieControls) this.dieControls.style.display = 'block'; }
    hideDieControls() { if (this.dieControls) this.dieControls.style.display = 'none'; }

    updateRound(round) {
        if (this.roundDisplay) this.roundDisplay.textContent = `Ronda ${round}`;
    }

    updatePhase(phaseName) {
        if (this.phaseDisplay) this.phaseDisplay.textContent = phaseName;
    }

    showCard(title, content, isAction = false) {
        if (this.mainContent) {
            this.mainContent.innerHTML = `
                <div class="card ${isAction ? 'action-card' : ''}">
                    <h2>${title}</h2>
                    <div class="card-content">${content}</div>
                </div>
            `;
        }
    }

    enableNext(enabled = true) {
        if (this.nextBtn) this.nextBtn.disabled = !enabled;
    }

    enableUndo(enabled = true) {
        if (this.undoBtn) this.undoBtn.disabled = !enabled;
    }
}

// --- Game Engine ---
const PHASES = {
    SETUP: 'Preparación',
    START_ROUND: 'Inicio de Ronda',
    VEHICLE_PLACEMENT: 'Colocación de Vehículos',
    ACTION_PHASE: 'Fase 2: Resolución de Acciones',
    DESERT_HAZARDS: 'Peligros del Desierto',
    SPICE_HARVEST: 'Cosecha de Especia',
    END_OF_ROUND: 'Fin de Ronda'
};

class GameEngine {
    constructor(ui) {
        this.ui = ui;
        this.placementLogic = new PlacementLogic();
        this.actionLogic = new ActionLogic();

        this.round = 1;
        this.phase = PHASES.SETUP;
        this.step = 0;

        this.actionHistory = [];

        // Bind controls
        document.querySelectorAll('.btn-die').forEach(btn => {
            if (btn.dataset.result) {
                btn.addEventListener('click', (e) => this.handleDieInput(e.target.dataset.result));
            }
        });
    }

    startNewGame() {
        this.round = 0;
        this.actionHistory = []; // Reset history
        this.phase = PHASES.START_ROUND;
        this.step = 0;
        this.ui.updateRound(this.round);
        this.nextStep();
    }

    nextStep() {
        this.ui.updatePhase(this.phase);
        this.ui.hideDieControls();
        this.ui.enableNext(true);

        switch (this.phase) {
            case PHASES.START_ROUND:
                this.handleStartRound();
                break;
            case PHASES.VEHICLE_PLACEMENT:
                this.handleVehiclePlacement();
                break;
            case PHASES.ACTION_PHASE:
                this.handleActionPhase();
                break;
            case PHASES.DESERT_HAZARDS:
                this.handleDesertHazards();
                break;
            case PHASES.SPICE_HARVEST:
                this.handleSpiceHarvest();
                break;
            case PHASES.END_OF_ROUND:
                this.handleEndOfRound();
                break;
        }
    }

    handleStartRound() {
        if (this.step === 0) {
            this.round++;
            this.ui.updateRound(this.round);

            this.ui.showCard("Inicio de Ronda", `
                <ul>
                    <li>Baraja el mazo de Táctica.</li>
                    <li>Roba y revela <strong>2 Cartas de Presciencia</strong>.</li>
                </ul>
            `);
            this.step++;
        } else if (this.step === 1) {
            this.ui.showCard("Sector de Cosecha", `
                <p>Roba 1 carta de Táctica del mazo de Táctica.</p>
                <p>Esta carta indica el <strong>Sector de Cosecha</strong>.</p>
            `);
            this.step++;
        } else if (this.step === 2) {
            this.ui.showCard("Sietch Objetivo", `
                <p>Roba la siguiente carta de Táctica.</p>
                <p>Esta carta indica el <strong>Sietch Objetivo</strong>.</p>
                <p><em>(Si el Sector coincide con el de Cosecha o el Sietch está destruido, descártala y roba otra).</em></p>
            `);
            this.step++;
        } else if (this.step === 3) {
            this.ui.showCard("Refuerzos", `
                <p>Roba 1 carta de Aliados Corrino y 1 carta de Casa Harkonnen.</p>
                <p>Colócalas <strong>bocabajo</strong> en el mazo de Refuerzos.</p>
            `);
            this.step++;
        } else if (this.step === 4) {
            this.ui.showCard("Disponibilidad de Vehículos", `
                <img src="assets/harvester.jpg" class="hero-image" style="width: 100%; height: 160px; object-fit: cover; border-radius: 4px; border: 1px solid var(--color-spice); margin-bottom: 1rem;">
                <div style="background: rgba(255, 145, 0, 0.1); border: 1px solid var(--color-spice); padding: 0.8rem; border-radius: 4px; text-align: center;">
                    <p>Antes de colocar vehículos, consulta el tablero:</p>
                    <h3 style="color: var(--color-spice); margin: 0.5rem 0;">"La Especia Debe Manar"</h3>
                    <p>Esto determinará cuántas Cosechadoras, Alas y Ornitópteros están disponibles.</p>
                </div>
            `);
            this.phase = PHASES.VEHICLE_PLACEMENT;
            this.step = 0;
        }
    }

    handleVehiclePlacement() {
        // Enforce Mahdi Mode: Unify all vehicle placement instructions in one screen
        const harvesters = this.placementLogic.getHarvesterInstructions();
        const carryalls = this.placementLogic.getCarryallInstructions();
        const ornithopters = this.placementLogic.getOrnithopterInstructions();

        const unitedContent = `
            <div style="text-align: left; font-size: 0.9rem;">
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem; margin-bottom: 0.5rem;">🚜 Cosechadoras</h4>
                    <div>${harvesters}</div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem; margin-bottom: 0.5rem;">🚁 Alas de Acarreo</h4>
                    <div>${carryalls}</div>
                </div>

                <div>
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem; margin-bottom: 0.5rem;">👁️ Ornitópteros</h4>
                    <div>${ornithopters}</div>
                </div>
            </div>
        `;

        this.ui.showCard("Colocación de Vehículos", unitedContent);

        // Advance phase immediately for the next click
        this.phase = PHASES.ACTION_PHASE;
        this.step = 0;

        this.ui.updatePhase(this.phase);
    }

    handleActionPhase() {
        this.ui.showCard("Fase 2: Resolución de Acciones", `
            <p>Es tu turno. Realiza tus acciones.</p>
            <p>Cuando termine tu turno, tira <strong>1 Dado de Acción Harkonnen</strong> y selecciona el resultado abajo. Siempre se debe dar <strong>PRIORIDAD</strong> a la <strong style="color: #ff5252;">Acción Especial</strong> (texto en rojo) de los Líderes de Renombre activos.</p>
        `);
        this.ui.showDieControls();
        this.ui.enableNext(false);
    }

    handleDieInput(result) {
        // Check for 3 consecutive repeats
        const len = this.actionHistory.length;
        if (len >= 3) {
            const last1 = this.actionHistory[len - 1];
            const last2 = this.actionHistory[len - 2];
            const last3 = this.actionHistory[len - 3];

            if (last1 === result && last2 === result && last3 === result) {
                alert("¡El Automa no puede repetir la misma acción más de 3 veces seguidas! Tira el dado de nuevo.");
                return; // Do not proceed
            }
        }

        this.actionHistory.push(result);

        let instructions = "";
        switch (result) {
            case 'leadership':
            case 'strategy':
                instructions = this.actionLogic.getLeadershipStrategyInstructions();
                break;
            case 'deployment':
                instructions = this.actionLogic.getDeploymentInstructions();
                break;
            case 'mentat':
                instructions = this.actionLogic.getMentatInstructions();
                break;
            case 'house':
                instructions = this.actionLogic.getHouseInstructions();
                break;
        }

        this.ui.showCard(`Acción: ${result.toUpperCase()}`, instructions, true);
        this.ui.hideDieControls();
        this.ui.enableNext(true);
    }

    endRound() {
        this.phase = PHASES.DESERT_HAZARDS;
        this.step = 0;
        this.nextStep();
    }

    handleDesertHazards() {
        this.ui.showCard("Fase 3: Peligros del Desierto (Atreides)", `
            <h3>Señales de Gusanos</h3>
            <ol style="font-size: 0.95rem; text-align: left; padding-left: 1.2rem;">
                <li><strong>Descarta</strong> fichas en Áreas con Atreides o Gusanos. Mezcla la reserva.</li>
                <li><strong>Coloca</strong> 1 ficha (al azar) en cada <strong>Desierto</strong> con Legión/Cosechadora Harkonnen (si no hay ya ficha/Gusano).</li>
                <li><strong>Resuelve</strong> las fichas:
                    <ul style="margin-top:0.3rem; background: rgba(0,0,0,0.3); padding:0.5rem; border-radius:4px; list-style:none;">
                        <li>🟫 <strong>Arena:</strong> Descarta la ficha.</li>
                        <li>🐛 <strong>Gusano:</strong> Coloca Gusano. Descarta ficha.</li>
                        <li>🏜️ <strong>Gusano (Enterrado):</strong> Si es <em>Desierto Profundo</em>, coloca Gusano. Si no, descarta.</li>
                    </ul>
                </li>
                <li><strong>Efecto del Gusano:</strong>
                    <ul style="margin-top:0.3rem;">
                        <li><strong>Cosechadora:</strong> Retírala (salvo que uses Ala de Acarreo).</li>
                        <li><strong>Legión:</strong> Debe retirarse. Si no puede, el Gusano ataca. <br><em style="font-size:0.85em">(Si hay Cosechadora+Legión y Legión se retira, Cosechadora también se va salvo Ala).</em></li>
                    </ul>
                </li>
            </ol>

            <div style="margin: 0.8rem 0; padding: 0.6rem; border-left: 3px solid var(--color-sand); background: rgba(212, 180, 131, 0.08); text-align: left; font-size: 0.9rem;">
                <strong>🚁 Ala de Acarreo al Rescate:</strong><br>
                Puedes retirar 1 Ala (de Zona conectada) para salvar una Cosechadora.
            </div>

            <h3>Tormentas de Coriolis</h3>
            <div style="text-align: left; font-size: 0.95rem;">
                <p><strong>Vulnerables:</strong> Desierto, Desierto Profundo, Erg Menor, Meseta.</p>
                <p><em>(Excepción: Las 5 áreas de Meseta centrales rodeadas de montañas).</em></p>
                
                <p style="margin-top:0.5rem;"><strong>Resolución:</strong> Tira <strong>2 dados</strong> por cada Legión Harkonnen en área vulnerable.</p>
                <ul style="margin-bottom: 0.5rem;">
                    <li>1 Impacto por cada <span style="color: #ff9100;">⚔️</span> (o equivalente).</li>
                    <li>Impactos variables por cada ❄️:</li>
                </ul>
                <table style="width:100%; font-size:0.9rem; border-collapse: collapse; background: rgba(255,255,255,0.05); border-radius: 4px;">
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <td style="padding:6px; font-weight:bold;">Desierto Profundo</td>
                        <td style="padding:6px; text-align:right; color: #ff5252;">2 impactos</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <td style="padding:6px; font-weight:bold;">Desierto</td>
                        <td style="padding:6px; text-align:right; color: #ffab40;">1 impacto</td>
                    </tr>
                    <tr>
                        <td style="padding:6px; font-weight:bold;">Erg Menor / Meseta</td>
                        <td style="padding:6px; text-align:right; color: #69f0ae;">0 impactos</td>
                    </tr>
                </table>
                <p style="font-size: 0.8em; margin-top: 5px; opacity: 0.8;"><em>(Aplica impactos según Criterios de Combate)</em></p>
            </div>
        `);
        this.phase = PHASES.SPICE_HARVEST;
    }

    handleSpiceHarvest() {
        this.ui.showCard("Fase 4: Cosecha de Especia (Harkonnen)", `
            <div style="text-align: left; font-size: 0.9rem;">
                <!-- 1. ACARREO -->
                <div style="margin-bottom: 1rem; border-left: 3px solid #ff9100; padding-left: 0.8rem; background: rgba(255, 145, 0, 0.05);">
                    <strong style="color: #ffb74d;">🚁 Prioridad de Acarreo:</strong>
                    <p style="font-size: 0.9rem; margin-top: 0.3rem;">
                        Si debes decidir qué Cosechadora salvar con un Ala: 
                        <strong>Prioriza SIEMPRE Desierto Profundo</strong> (2 Especia).
                    </p>
                </div>

                <!-- 2. RECOLECCIÓN -->
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem;">1. RECOLECTAR</h4>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem;">
                        <li>Retira Cosechadoras y suma Especia + Reserva.</li>
                    </ul>
                    <table style="width:100%; margin: 0.5rem 0; background: rgba(255,255,255,0.05); border-radius: 4px; border-collapse: collapse; font-size: 0.85rem;">
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <td style="padding:4px 8px;">Desierto</td>
                            <td style="padding:4px 8px; text-align:right; font-weight:bold; color: var(--color-spice);">1 punto</td>
                        </tr>
                        <tr>
                            <td style="padding:4px 8px;">Desierto Profundo</td>
                            <td style="padding:4px 8px; text-align:right; font-weight:bold; color: var(--color-spice);">2 puntos</td>
                        </tr>
                    </table>
                </div>

                <!-- 3. GASTO OBLIGATORIO -->
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem;">2. GASTO OBLIGATORIO (Algoritmo)</h4>
                    <p style="font-size: 0.85em; opacity: 0.8; margin-bottom: 0.5rem;">Sigue este orden estricto de prioridades:</p>
                    
                    <div style="margin-bottom: 0.8rem;">
                        <strong style="color: #ff5252;">PRIORIDAD A (Evitar Ira):</strong>
                        <ul style="margin-top: 0.2rem; padding-left: 1.2rem; list-style: circle;">
                            <li>Gasta para <strong>MANTENER</strong> posición.</li>
                            <li>Prioriza marcadores más bajos.</li>
                            <li><strong>Coste:</strong> 2 Especia / marcador.</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 0.8rem;">
                        <strong style="color: #69f0ae;">PRIORIDAD B (Mejorar Relación):</strong>
                        <ul style="margin-top: 0.2rem; padding-left: 1.2rem; list-style: circle;">
                            <li>Si sobra, gasta para <strong>SUBIR</strong> 1 escalón.</li>
                            <li>Empezando por los marcadores más bajos.</li>
                            <li><strong>Coste:</strong> 3 Especia / marcador (Max 1 subida por tipo).</li>
                        </ul>
                    </div>
                </div>

                <!-- 4. SUPREMACIA Y RESERVA -->
                <div style="background: rgba(0,0,0,0.2); padding: 0.8rem; border-radius: 4px; margin-bottom: 1rem;">
                    <h4 style="color: var(--color-spice); margin-bottom: 0.1rem; font-size: 0.95rem;">💎 Supremacía y Reserva</h4>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem; line-height: 1.4;">
                        <li><strong>NO usa "Acopio de Especia".</strong></li>
                        <li><strong>Gana +1 Supremacía SI:</strong> 
                            <ul style="padding-left: 1rem; list-style: square; color: #ffd700;">
                                <li>Todos los marcadores están al Máximo.</li>
                                <li>TIENE especia de sobra para mantenerlos a todos.</li>
                            </ul>
                        </li>
                        <li style="margin-top: 0.4rem;"><strong>Reserva:</strong> Solo guarda lo que <strong>imposiblemente</strong> pudo gastar.</li>
                    </ul>
                </div>
            </div>
            
            <div style="margin-top: 0.5rem; border-top: 1px solid rgba(193, 98, 0, 0.3); padding-top: 0.3rem; font-size: 0.85rem; text-align: center; font-style: italic;">
                Si 1 marcador no sube o se mantiene, <strong>baja 1 escalón</strong>.
            </div>
        `);
        this.phase = PHASES.END_OF_ROUND;
    }

    handleEndOfRound() {
        this.ui.showCard("Fase 5: Fin de la Ronda (El Reloj)", `
            <div style="text-align: left; font-size: 0.9rem;">
                
                <!-- 1. MANTENIMIENTO ATREIDES -->
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: #4fc3f7; border-bottom: 1px solid rgba(79, 195, 247, 0.3); padding-bottom: 0.2rem;">1. TU MANTENIMIENTO (Atreides)</h4>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem; color: #e0f7fa;">
                        <li><strong>Victoria:</strong> ¿Cumples tu Objetivo Secreto?</li>
                        <li><strong>Limpieza:</strong> Retira TODOS los Ornitópteros y Alas.</li>
                        <li><strong>Líderes:</strong> Recupera líderes agotados (salvo Tanque).</li>
                        <li><strong>Mano:</strong> Descarta hasta tener max <strong>6 cartas</strong>.</li>
                        <li><strong>Presciencia:</strong> Gestiona cartas reveladas no reclamadas.</li>
                    </ul>
                </div>

                <!-- 2. PASOS MAHDI -->
                <div style="margin-bottom: 1rem; background: rgba(255, 82, 82, 0.05); padding: 0.6rem; border-radius: 4px; border: 1px solid rgba(255, 82, 82, 0.2);">
                    <h4 style="color: #ff5252; margin-bottom: 0.4rem;">2. EL RELOJ (Pasos Mahdi)</h4>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem;">
                        <li style="margin-bottom: 0.4rem;">
                            <strong>👑 INERCIA (+1 Supremacía):</strong><br>
                            Avanza 1 casilla el marcador de Supremacía Harkonnen. 
                            <em style="opacity: 0.7; font-size: 0.85em;">(Ocurre SIEMPRE).</em>
                        </li>
                        <li>
                            <strong>🔄 RESET TÁCTICO:</strong><br>
                            Baraja las <strong>8 cartas de Táctica</strong> para formar un nuevo mazo.
                        </li>
                    </ul>
                </div>

                <!-- 3. PROHIBICIONES -->
                <div style="border-left: 3px solid #ffd700; padding-left: 0.8rem; background: rgba(255, 215, 0, 0.05);">
                    <strong style="color: #ffd700;">🚫 RESTRICCIONES MAHDI:</strong>
                    <ul style="margin-top: 0.3rem; padding-left: 1.2rem; font-size: 0.9em;">
                        <li style="margin-bottom: 0.3rem;"><strong>Mazo de Refuerzos:</strong> NUNCA descartes cartas de este mazo (se acumulan).</li>
                        <li><strong>Líderes Renombre:</strong> NUNCA los sustituyas si están en el tablero.</li>
                    </ul>
                </div>
            </div>
            
            <div style="margin-top: 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                <p style="margin-bottom: 0.5rem; color: var(--color-sand); font-size: 0.9rem;">Para comenzar la <strong>Nueva Ronda</strong>:</p>
                <div style="display: inline-block; padding: 0.5rem 1rem; border: 1px solid var(--color-spice); border-radius: 4px; color: var(--color-spice); font-weight: bold; background: rgba(193, 98, 0, 0.1);">
                    PULSA "SIGUIENTE" ⬇️
                </div>
            </div>
            
            <div style="margin-top: 1rem; text-align: center;">
                <button onclick="window.close()" class="btn-secondary" style="border-color: #ff4444; color: #ff4444; font-size: 0.9rem; padding: 0.6rem 1.2rem; opacity: 0.9; width: 100%;">
                    🚫 Cerrar / Fin de Partida
                </button>
            </div>
        `);
        this.phase = PHASES.START_ROUND;
        this.step = 0;
    }

    handleCombat() {
        this.ui.hideDieControls();
        this.ui.enableNext(false); // Disable main next button while in combat view

        this.ui.showCard("⚔️ Resolución de Combate", `
            <div style="text-align: left; font-size: 0.9rem;">
                
                <!-- 1. PREPARACIÓN -->
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem;">1. PREPARACIÓN (Regla de los 6 Dados)</h4>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem;">
                        <li style="margin-bottom: 0.3rem;"><strong>Mazo de Refuerzos CON cartas:</strong><br>
                            El Automa DESCARTA cartas hasta poder tirar <strong>6 DADOS</strong> (Máximo).</li>
                        <li><strong>Mazo de Refuerzos VACÍO:</strong><br>
                            Tira solo los dados de sus Unidades disponibles.</li>
                    </ul>
                </div>

                <!-- 2. RECIBIR DAÑO -->
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem;">2. RECIBIR DAÑO (Prioridad Estricta)</h4>
                    <p style="font-size: 0.85em; opacity: 0.8; margin-bottom: 0.3rem;">Debe eliminar en este orden para proteger su núcleo:</p>
                    <ol type="1" style="background: rgba(138, 0, 0, 0.1); padding: 0.6rem 0.6rem 0.6rem 1.4rem; border-radius: 4px; border: 1px solid var(--color-harkonnen);">
                        <li><strong>Líderes (Carne de cañón):</strong> Elimina Bashar primero. <br><em>(Intenta dejar 1 Líder de Renombre al final).</em></li>
                        <li><strong>Degradar Élites:</strong> Élite -> Normal.</li>
                        <li><strong>Degradar Sardaukar:</strong> Sardaukar -> Normal.</li>
                        <li><strong>Eliminar Tropas:</strong> Elimina Unidades Normales.</li>
                    </ol>
                    <div style="margin-top: 0.4rem; font-size: 0.85rem; color: #ff9100; font-style: italic;">
                        ⚠️ <strong>Excepción Crítica:</strong> Si quitar una unidad deja al Líder SOLO en el área, ¡elimina el Líder ANTES que la última unidad!
                    </div>
                </div>

                <!-- 3. DECISIÓN -->
                <div style="margin-bottom: 1rem;">
                    <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem;">3. DECISIONES TÁCTICAS</h4>
                    <ul style="margin-top: 0.4rem; padding-left: 1.2rem;">
                        <li style="margin-bottom: 0.3rem;"><strong style="color: #ff5252;">JAMÁS SE RETIRA:</strong> Lucha hasta ganar, morir o cesar.</li>
                        <li style="margin-bottom: 0.3rem;"><strong>ASEDIO IMPLACABLE:</strong> No recibe daño automático por "Continuar" contra Sietches.</li>
                        <li><strong>¿CESAR EL ATAQUE?</strong> Solo si:
                            <div style="text-align: center; margin: 0.4rem 0; font-weight: bold; background: rgba(255,255,255,0.05); padding: 0.3rem; border-radius: 4px;">
                                PC Harkonnen &le; (PC Atreides / 2)
                            </div>
                        </li>
                    </ul>
                </div>

                 <!-- CÁLCULO PC -->
                <div style="background: rgba(255, 215, 0, 0.05); padding: 0.6rem; border-radius: 4px; font-size: 0.85rem; margin-bottom: 1rem;">
                    <strong>🧮 Cálculo de PC:</strong><br>
                    1 pt: Líder Genérico<br>
                    2 pts: Líder Renombre / Unidad Normal<br>
                    3 pts: Unidad Élite<br>
                    4 pts: Sardaukar / Fedaykin
                </div>

                <!-- 4. TU RETIRADA -->
                <div>
                     <h4 style="color: var(--color-sand); border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.2rem;">4. RETIRADA ATREIDES</h4>
                     <p>Tú eliges destino. <strong>Prioridad:</strong> Áreas vacías.</p>
                </div>

            </div>
            
            <button id="back-to-action-btn" class="btn-primary" style="margin-top: 1.5rem; width: 100%;">Volver a Fase de Acción</button>
        `);

        // Add listener for the temporary back button
        setTimeout(() => {
            const backBtn = document.getElementById('back-to-action-btn');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    this.handleActionPhase();
                });
            }
        }, 0);
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UIManager();
    const game = new GameEngine(ui);

    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            game.startNewGame();
        });
    }

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            game.nextStep();
        });
    }

    const endRoundBtn = document.getElementById('end-round-btn');
    if (endRoundBtn) {
        endRoundBtn.addEventListener('click', () => {
            game.endRound();
        });
    }

    const combatBtn = document.getElementById('combat-btn');
    if (combatBtn) {
        combatBtn.addEventListener('click', () => {
            game.handleCombat();
        });
    }

    const madhiBtn = document.getElementById('madhi-btn');
    const madhiInfo = document.getElementById('madhi-info');
    const actionCard = document.getElementById('action-card');
    const backMadhiBtn = document.getElementById('back-from-madhi-btn');

    if (madhiBtn) {
        madhiBtn.addEventListener('click', () => {
            if (madhiInfo && actionCard) {
                actionCard.style.display = 'none';
                madhiInfo.style.display = 'block';
                // Ensure we scroll to top of info
                document.querySelector('main').scrollTop = 0;
            }
        });
    }

    if (backMadhiBtn) {
        backMadhiBtn.addEventListener('click', () => {
            if (madhiInfo && actionCard) {
                madhiInfo.style.display = 'none';
                actionCard.style.display = 'block';
            }
        });
    }
});
