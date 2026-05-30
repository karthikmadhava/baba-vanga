// ====================================================
// GEOPOLITICAL CONFLICT FALLBACK DATASET (MID-2026)
// ====================================================
const fallbackConflictsData = [
    {
        id: "russia-ukraine",
        title: "Russia-Ukraine Conventional War",
        region: "Eastern Europe",
        coords: [48.3794, 37.9610],
        baseIntensity: 85,
        baseSpillover: "extreme",
        description: "A high-intensity conventional war. Despite slow frontline shifts, massive drone warfare and long-range strikes against economic infrastructure persist. The conflict carries a high risk of escalating to a direct military confrontation between Russia and NATO, making its global spillover potential extremely critical.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 15, intensityBoost: 15, desc: "Direct NATO engagement triggers global war threat, raising spillover risk to absolute maximum." },
            economicBlockade: { spilloverBoost: 10, intensityBoost: 5, desc: "Secondary sanctions and Black Sea maritime blockades trigger severe grain and fertilizer shortfalls." },
            cyberWarfare: { spilloverBoost: 12, intensityBoost: 8, desc: "Wide-scale cyberattacks targeting EU-US power grids and financial messaging protocols." }
        }
    },
    {
        id: "gaza-israel",
        title: "Israel-Gaza Ceasefire Volatility",
        region: "Middle East",
        coords: [31.3547, 34.3088],
        baseIntensity: 80,
        baseSpillover: "extreme",
        description: "Following ceasefire agreements, massive internal disputes over geographic control persist. High casualty rates, refugee relocations, and humanitarian crises fuel ongoing tension. The risk of spilling over into surrounding nations remains high, threatening broader Middle Eastern alliances.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 15, intensityBoost: 10, desc: "Direct regional power deployment triggers wide-scale ground campaigns." },
            economicBlockade: { spilloverBoost: 10, intensityBoost: 5, desc: "Extended border closures halt trade networks and trigger severe fuel price spikes." },
            cyberWarfare: { spilloverBoost: 5, intensityBoost: 5, desc: "Disruptions to regional communication arrays and emergency channels." }
        }
    },
    {
        id: "us-iran",
        title: "Iran-US-Israel Confrontation",
        region: "Middle East",
        coords: [27.1894, 56.2708],
        baseIntensity: 65,
        baseSpillover: "extreme",
        description: "Operation Epic Fury airstrikes and retaliatory missile/drone launches have led to highly volatile maritime standoffs. Continued skirmishes in the Strait of Hormuz disrupt global energy transportation channels.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 20, intensityBoost: 25, desc: "Airstrikes escalate into a regional ground war, causing immediate global energy market shocks." },
            economicBlockade: { spilloverBoost: 25, intensityBoost: 10, desc: "Full blockade of the Strait of Hormuz cuts off 20% of global oil supply, leading to critical global inflation." },
            cyberWarfare: { spilloverBoost: 10, intensityBoost: 10, desc: "State-sponsored cyber strikes compromise regional energy infrastructure." }
        }
    },
    {
        id: "sudan-civil-war",
        title: "Sudan Civil Conflict (SAF vs RSF)",
        region: "East Africa",
        coords: [15.5007, 32.5599],
        baseIntensity: 75,
        baseSpillover: "mild",
        description: "A devastating civil war between the SAF and RSF has caused widespread destruction, mass internal displacement, and severe regional hunger. While humanitarian fallout is catastrophic, direct escalation into a major global power clash is currently contained.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 15, intensityBoost: 15, desc: "Inflow of mercenary groups and foreign arms shipments expands the battle lines across East Africa." },
            economicBlockade: { spilloverBoost: 5, intensityBoost: 5, desc: "Red Sea logistics bottlenecks limit access to crucial relief materials." },
            cyberWarfare: { spilloverBoost: 2, intensityBoost: 2, desc: "Disruption to local telecommunications infrastructure." }
        }
    },
    {
        id: "myanmar-war",
        title: "Myanmar Resistance Insurgency",
        region: "Southeast Asia",
        coords: [19.7633, 96.0785],
        baseIntensity: 60,
        baseSpillover: "mild",
        description: "The military junta faces ongoing territorial losses to coalition forces and ethnic resistance groups. Widespread regional skirmishes persist, creating severe refugee migration pressures along border zones.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 10, intensityBoost: 15, desc: "Direct border involvement or military backing from neighboring states expands the geographic scope." },
            economicBlockade: { spilloverBoost: 8, intensityBoost: 5, desc: "Sanctions on mineral and gas exports cause severe regional currency devaluations." },
            cyberWarfare: { spilloverBoost: 2, intensityBoost: 2, desc: "Junta-sponsored surveillance and localized network blackouts." }
        }
    },
    {
        id: "taiwan-strait",
        title: "Taiwan Strait Military Stand-Off",
        region: "East Asia",
        coords: [24.4200, 120.2500],
        baseIntensity: 30,
        baseSpillover: "extreme",
        description: "While not an active shooting conflict, intense naval deployments, air incursions, and rhetoric create a flashpoint. Any active confrontation would immediately involve the US and China, severely impacting global semiconductor supply chains.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 50, intensityBoost: 60, desc: "Direct naval interception leads to conventional warfare, triggering a world war scenario." },
            economicBlockade: { spilloverBoost: 40, intensityBoost: 20, desc: "A total maritime blockade of Taiwan halts 60%+ of global advanced microchip deliveries, causing global tech collapse." },
            cyberWarfare: { spilloverBoost: 20, intensityBoost: 15, desc: "Aggressive cyber attacks targeting power arrays and financial centers ahead of naval maneuvers." }
        }
    },
    {
        id: "yemen-red-sea",
        title: "Red Sea Maritime Shipping Conflict",
        region: "Middle East",
        coords: [15.3694, 44.1910],
        baseIntensity: 50,
        baseSpillover: "high",
        description: "Drone and missile attacks on cargo vessels by Houthi forces have forced global logistics networks to divert around Africa. US-led naval coalitions conduct frequent retaliatory strikes on launch facilities.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 15, intensityBoost: 15, desc: "Coalition forces deploy ground units in coastal launching hubs, intensifying local warfare." },
            economicBlockade: { spilloverBoost: 20, intensityBoost: 5, desc: "Complete closure of Bab-el-Mandeb, forcing prolonged maritime re-routing and surging transport costs." },
            cyberWarfare: { spilloverBoost: 5, intensityBoost: 5, desc: "Spoofing of maritime GPS tracking and radar arrays." }
        }
    },
    {
        id: "drc-insurgency",
        title: "DR Congo M23 Conflict",
        region: "Central Africa",
        coords: [-1.6585, 29.2230],
        baseIntensity: 55,
        baseSpillover: "local",
        description: "Violent incursions by M23 and local militia forces continue to displace thousands in eastern DRC, complicated by local disease outbreaks. The conflict remains localized but risks triggering wider central African border clashes.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 15, intensityBoost: 15, desc: "Direct cross-border military incursions escalate tensions between DRC and Rwanda into full conventional war." },
            economicBlockade: { spilloverBoost: 5, intensityBoost: 5, desc: "Critical disruptions to cobalt and copper mining exports, driving global battery material shortages." },
            cyberWarfare: { spilloverBoost: 1, intensityBoost: 1, desc: "Minimal digital impact on localized communications." }
        }
    },
    {
        id: "sahel-insurgency",
        title: "Sahel Region Insurgencies",
        region: "West Africa / Sahel",
        coords: [13.5116, 2.1128],
        baseIntensity: 45,
        baseSpillover: "mild",
        description: "Insurgent activities and military coups in Niger, Mali, and Burkina Faso have led to the withdrawal of western military forces. High levels of local insecurity persist, driving migration flows toward North Africa and Europe.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 12, intensityBoost: 12, desc: "Engagement of foreign private military contractors increases security instability." },
            economicBlockade: { spilloverBoost: 6, intensityBoost: 4, desc: "Sanctions by ECOWAS and Western nations restrict regional commerce, fueling black market networks." },
            cyberWarfare: { spilloverBoost: 2, intensityBoost: 2, desc: "State media blockades and coordinated misinformation campaigns." }
        }
    },
    {
        id: "korean-peninsula",
        title: "Korean Peninsula Demarcation Stand-Off",
        region: "East Asia",
        coords: [37.9250, 127.2000],
        baseIntensity: 20,
        baseSpillover: "high",
        description: "Artillery drills, balloon launches, and mutual terminations of military pacts maintain high tensions. High global impact due to the presence of nuclear weapons and defense treaties with major superpowers.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 45, intensityBoost: 55, desc: "Border skirmishes activate US-South Korea mutual defense pact, drawing in global military networks." },
            economicBlockade: { spilloverBoost: 15, intensityBoost: 10, desc: "Complete shipping trade restrictions in the Yellow Sea." },
            cyberWarfare: { spilloverBoost: 25, intensityBoost: 15, desc: "Highly aggressive cyber strikes targeting state grids and semiconductor manufacturing." }
        }
    },
    {
        id: "haiti-crisis",
        title: "Haiti Gang & Institutional Collapse",
        region: "Caribbean",
        coords: [18.5392, -72.3350],
        baseIntensity: 50,
        baseSpillover: "local",
        description: "Criminal factions retain control over Port-au-Prince. The breakdown of state institutions has resulted in high violence and critical food insecurity. The threat remains localized but triggers migration flows toward North America.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 10, intensityBoost: 12, desc: "International security missions expand operations, leading to intensive urban battles." },
            economicBlockade: { spilloverBoost: 5, intensityBoost: 5, desc: "Fuel port blockades stop distribution networks, halting local utilities." },
            cyberWarfare: { spilloverBoost: 1, intensityBoost: 1, desc: "Negligible digital impact." }
        }
    },
    {
        id: "mozambique-insurgency",
        title: "Cabo Delgado Insurgency",
        region: "Southeast Africa",
        coords: [-12.9740, 40.5178],
        baseIntensity: 35,
        baseSpillover: "local",
        description: "Insurgent forces continue to target villages and security forces in northern Mozambique, periodically halting multibillion-dollar LNG projects. The conflict remains localized but impacts regional energy investments.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 8, intensityBoost: 10, desc: "Deployment of regional task forces expands security zones." },
            economicBlockade: { spilloverBoost: 10, intensityBoost: 5, desc: "Long-term halting of LNG projects raises energy import bills for neighboring states." },
            cyberWarfare: { spilloverBoost: 1, intensityBoost: 1, desc: "Negligible digital impact." }
        }
    },
    {
        id: "syria-civil-war",
        title: "Syrian Civil War Status",
        region: "Middle East",
        coords: [33.5138, 36.2765],
        baseIntensity: 40,
        baseSpillover: "high",
        description: "A partially frozen conflict characterized by sporadic regional clashes and strikes from Israel, Turkey, and Coalition forces. The complex overlap of global powers ensures high escalation potential.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 20, intensityBoost: 20, desc: "Renewed wide-scale military offensives backed by international air support." },
            economicBlockade: { spilloverBoost: 5, intensityBoost: 5, desc: "Pipeline closures and sanctions further restrict reconstruction efforts." },
            cyberWarfare: { spilloverBoost: 5, intensityBoost: 5, desc: "Disruptions to regional air defence network signals." }
        }
    },
    {
        id: "libya-instability",
        title: "Libya Dual-Government Crisis",
        region: "North Africa",
        coords: [32.8872, 13.1913],
        baseIntensity: 30,
        baseSpillover: "local",
        description: "Split governance structures and sporadic militia clashes around oil infrastructure persist. Tensions remain localized, although they periodically disrupt Mediterranean energy pipelines.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 12, intensityBoost: 10, desc: "Foreign backing of rival governments triggers mobilization of heavy armaments." },
            economicBlockade: { spilloverBoost: 15, intensityBoost: 5, desc: "Militia shut-downs of key crude oil terminals spike European fuel prices." },
            cyberWarfare: { spilloverBoost: 2, intensityBoost: 2, desc: "Localized utility infrastructure hacking." }
        }
    },
    {
        id: "somalia-insurgency",
        title: "Somalia Al-Shabaab Insurgency",
        region: "Horn of Africa",
        coords: [2.0469, 45.3182],
        baseIntensity: 40,
        baseSpillover: "local",
        description: "Government military operations against Al-Shabaab insurgent strongholds continue. The conflict is mostly localized, but regional tensions in the Horn of Africa add risk.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 10, intensityBoost: 8, desc: "Increased regional military involvement shifts military dynamics." },
            economicBlockade: { spilloverBoost: 5, intensityBoost: 5, desc: "Piracy resurgence or shipping disruptions off the Horn of Africa." },
            cyberWarfare: { spilloverBoost: 1, intensityBoost: 1, desc: "Negligible digital impact." }
        }
    },
    {
        id: "kashmir-conflict",
        title: "India-Pakistan Border Conflict",
        region: "South Asia",
        coords: [34.0837, 74.7973],
        baseIntensity: 50,
        baseSpillover: "high",
        description: "Ongoing territorial dispute over the Kashmir region between nuclear-armed nations India and Pakistan. Frequent artillery stand-offs and border incursions along the Line of Control (LoC) maintain elevated risks of escalation.",
        sandboxModifiers: {
            foreignInvolvement: { spilloverBoost: 25, intensityBoost: 15, desc: "Superpower alignment shifts or military backing escalates tensions." },
            economicBlockade: { spilloverBoost: 15, intensityBoost: 10, desc: "Indus Water Treaty disputes or trade bans impact regional resource channels." },
            cyberWarfare: { spilloverBoost: 10, intensityBoost: 5, desc: "State-sponsored digital attacks targeting national energy grids." }
        }
    }
];

// ====================================================
// APPLICATION STATE
// ====================================================
let appState = {
    conflicts: [...fallbackConflictsData],
    filteredConflicts: [...fallbackConflictsData],
    searchQuery: "",
    activeFilter: "all",
    selectedConflict: null,
    sandboxTriggers: {
        foreignInvolvement: false,
        economicBlockade: false,
        cyberWarfare: false
    }
};

// ====================================================
// LEAFLET MAP INITIALIZATION
// ====================================================
let map;
let mapLayers = {}; // Key: conflictId, Value: { circle, pulse }

function initMap() {
    map = L.map('map', {
        center: [22.0, 15.0],
        zoom: 2.5,
        minZoom: 2,
        maxZoom: 8,
        zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    updateMapMarkers();

    // Force recalculation of map size once layout completes to prevent gray area
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }
    }, 200);

    // Keep map size aligned on browser resize
    window.addEventListener("resize", () => {
        if (map) {
            map.invalidateSize();
        }
    });
}

function getColorForRisk(risk) {
    switch (risk) {
        case "extreme": return "#b30202";
        case "high": return "#f43f5e";
        case "mild": return "#fb7185";
        case "local": return "#fbbf24";
        default: return "#fbbf24";
    }
}

function getConflictSimulatedValues(conflict) {
    let simulatedIntensity = conflict.baseIntensity;
    let spilloverPoints = 0;
    
    if (conflict.baseSpillover === "local") spilloverPoints = 20;
    else if (conflict.baseSpillover === "mild") spilloverPoints = 45;
    else if (conflict.baseSpillover === "high") spilloverPoints = 70;
    else if (conflict.baseSpillover === "extreme") spilloverPoints = 95;

    const isSelected = appState.selectedConflict && appState.selectedConflict.id === conflict.id;
    
    if (isSelected) {
        if (appState.sandboxTriggers.foreignInvolvement) {
            simulatedIntensity += conflict.sandboxModifiers.foreignInvolvement.intensityBoost;
            spilloverPoints += conflict.sandboxModifiers.foreignInvolvement.spilloverBoost;
        }
        if (appState.sandboxTriggers.economicBlockade) {
            simulatedIntensity += conflict.sandboxModifiers.economicBlockade.intensityBoost;
            spilloverPoints += conflict.sandboxModifiers.economicBlockade.spilloverBoost;
        }
        if (appState.sandboxTriggers.cyberWarfare) {
            simulatedIntensity += conflict.sandboxModifiers.cyberWarfare.intensityBoost;
            spilloverPoints += conflict.sandboxModifiers.cyberWarfare.spilloverBoost;
        }
    }

    simulatedIntensity = Math.min(100, simulatedIntensity);
    spilloverPoints = Math.min(100, spilloverPoints);

    let simulatedSpillover = "local";
    if (spilloverPoints >= 80) simulatedSpillover = "extreme";
    else if (spilloverPoints >= 60) simulatedSpillover = "high";
    else if (spilloverPoints >= 40) simulatedSpillover = "mild";

    return {
        intensity: simulatedIntensity,
        spillover: simulatedSpillover,
        spilloverScore: spilloverPoints
    };
}

function updateMapMarkers() {
    if (map) {
        map.invalidateSize();
    }
    Object.keys(mapLayers).forEach(id => {
        map.removeLayer(mapLayers[id].circle);
        map.removeLayer(mapLayers[id].pulse);
    });
    mapLayers = {};

    appState.filteredConflicts.forEach(conflict => {
        const sim = getConflictSimulatedValues(conflict);
        const color = getColorForRisk(sim.spillover);
        
        const radiusMeters = 100000 + (sim.intensity * 5000);

        const circle = L.circle(conflict.coords, {
            color: color,
            weight: 1.5,
            fillColor: color,
            fillOpacity: sim.spillover === "extreme" ? 0.35 : 0.25,
            radius: radiusMeters,
            className: `map-circle-${conflict.id}`
        }).addTo(map);

        const pulseRadius = radiusMeters * 1.3;
        const pulseCircle = L.circle(conflict.coords, {
            color: color,
            weight: 0.8,
            dashArray: '4, 8',
            fillColor: 'transparent',
            radius: pulseRadius,
            interactive: false
        }).addTo(map);

        circle.on('click', () => {
            selectConflict(conflict.id);
        });

        circle.bindTooltip(`
            <div style="font-family: var(--font-body); padding: 2px;">
                <b style="font-family: var(--font-heading);">${conflict.title}</b><br/>
                Risk Level: <span style="color:${color}; font-weight:bold; text-transform:uppercase;">${sim.spillover}</span><br/>
                Intensity: ${sim.intensity}/100
            </div>
        `, { sticky: true, opacity: 0.9 });

        mapLayers[conflict.id] = {
            circle: circle,
            pulse: pulseCircle
        };
    });
}

// ====================================================
// CHART.JS PROJECTION GRAPH
// ====================================================
let escalationChart;

function initChart() {
    const ctx = document.getElementById('escalation-chart').getContext('2d');
    const gridColor = 'rgba(255, 255, 255, 0.05)';
    
    escalationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Current', 'Q3-26', 'Q4-26', 'Q1-27', 'Q2-27', 'Q3-27'],
            datasets: [
                {
                    label: 'Base Esc. Prob %',
                    data: [0, 0, 0, 0, 0, 0],
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    borderWidth: 1.5,
                    borderDash: [4, 4],
                    fill: false,
                    tension: 0.3
                },
                {
                    label: 'Simulated Esc. Prob %',
                    data: [0, 0, 0, 0, 0, 0],
                    borderColor: '#f43f5e',
                    borderWidth: 2.5,
                    backgroundColor: 'rgba(244, 63, 94, 0.04)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        font: { size: 9, family: 'Inter' }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: '#94a3b8', font: { size: 9 } }
                },
                y: {
                    min: 0,
                    max: 100,
                    grid: { color: gridColor },
                    ticks: {
                        color: '#94a3b8',
                        font: { size: 9 },
                        callback: function(value) { return value + '%'; }
                    }
                }
            }
        }
    });
}

function updateChartProjection(conflict) {
    if (!escalationChart) return;

    const baseVal = getConflictSimulatedValues({ ...conflict, isSelectedMock: false }).spilloverScore;
    
    const baseCurve = [
        baseVal,
        Math.min(100, baseVal * 1.05),
        Math.min(100, baseVal * 1.08),
        Math.min(100, baseVal * 1.12),
        Math.min(100, baseVal * 1.15),
        Math.min(100, baseVal * 1.18)
    ];

    const currentSim = getConflictSimulatedValues(conflict);
    const simVal = currentSim.spilloverScore;
    const simCurve = [
        simVal,
        Math.min(100, simVal * 1.03),
        Math.min(100, simVal * 1.08),
        Math.min(100, simVal * 1.12),
        Math.min(100, simVal * 1.18),
        Math.min(100, simVal * 1.25)
    ];

    escalationChart.data.datasets[0].data = baseCurve;
    escalationChart.data.datasets[1].data = simCurve;

    const themeColor = getColorForRisk(currentSim.spillover);
    escalationChart.data.datasets[1].borderColor = themeColor;
    escalationChart.data.datasets[1].backgroundColor = themeColor + '0d';

    escalationChart.update();
}

// ====================================================
// STATE MUTATORS & UI SYNC
// ====================================================

function renderConflictList() {
    const listContainer = document.getElementById("conflict-list-container");
    listContainer.innerHTML = "";

    if (appState.filteredConflicts.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; color: #94a3b8; padding: 20px; font-size: 0.82rem;">
                No conflicts match the search/filter criteria.
            </div>
        `;
        return;
    }

    appState.filteredConflicts.forEach(conflict => {
        const sim = getConflictSimulatedValues(conflict);
        const isActive = appState.selectedConflict && appState.selectedConflict.id === conflict.id;
        
        const card = document.createElement("div");
        card.className = `conflict-card ${isActive ? 'active' : ''}`;
        card.setAttribute("role", "listitem");
        card.setAttribute("id", `card-${conflict.id}`);
        
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <h3 class="card-title">${conflict.title}</h3>
                    <span class="card-region">${conflict.region}</span>
                </div>
                <span class="risk-pill pill-${sim.spillover}">${sim.spillover} Risk</span>
            </div>
            <p class="card-summary">${conflict.description}</p>
            <div class="card-intensity">
                <span class="intensity-label">Intensity: ${sim.intensity}%</span>
                <div class="intensity-bar-bg">
                    <div class="intensity-bar-fill" style="width: ${sim.intensity}%; background-color: ${getColorForRisk(sim.spillover)}"></div>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            selectConflict(conflict.id);
        });

        listContainer.appendChild(card);
    });
}

function selectConflict(id) {
    const conflict = appState.conflicts.find(c => c.id === id);
    if (!conflict) return;

    appState.selectedConflict = conflict;
    
    appState.sandboxTriggers = {
        foreignInvolvement: false,
        economicBlockade: false,
        cyberWarfare: false
    };

    renderConflictList();

    map.flyTo(conflict.coords, 4.5, {
        animate: true,
        duration: 1.2
    });

    document.getElementById("detail-title").innerText = conflict.title;
    document.getElementById("detail-region").innerText = conflict.region;
    document.getElementById("detail-description").innerText = conflict.description;

    document.getElementById("trigger-foreign-involvement").checked = false;
    document.getElementById("trigger-economic-blockade").checked = false;
    document.getElementById("trigger-cyber-warfare").checked = false;

    syncSandboxStats();
    updateChartProjection(conflict);

    const panel = document.getElementById("details-panel");
    panel.classList.remove("hidden");
    panel.classList.add("visible");
    panel.setAttribute("aria-hidden", "false");
}

function closeDetailsPanel() {
    appState.selectedConflict = null;
    renderConflictList();
    
    const panel = document.getElementById("details-panel");
    panel.classList.remove("visible");
    panel.classList.add("hidden");
    panel.setAttribute("aria-hidden", "true");

    map.flyTo([22.0, 15.0], 2.5, {
        animate: true,
        duration: 1.2
    });

    syncSandboxStats();
    updateGlobalMetrics();
}

function syncSandboxStats() {
    if (appState.selectedConflict) {
        const sim = getConflictSimulatedValues(appState.selectedConflict);
        const color = getColorForRisk(sim.spillover);
        
        const spilloverValEl = document.getElementById("simulated-spillover-val");
        spilloverValEl.innerText = sim.spillover.toUpperCase();
        spilloverValEl.style.color = color;

        let radiusLabel = "100km (Localized impact)";
        if (sim.intensity > 80) radiusLabel = "500km+ (Widespread Conventional War)";
        else if (sim.intensity > 60) radiusLabel = "350km (Major Regional Civil War)";
        else if (sim.intensity > 40) radiusLabel = "200km (Regional Insurgency)";

        document.getElementById("simulated-intensity-val").innerText = radiusLabel;
    }
    
    updateMapMarkers();
}

// Recalculates metrics and updates the WW3 likelihood index in bottom pane
function updateGlobalMetrics() {
    const totalCount = appState.conflicts.length;
    let extremeOrHighCount = 0;
    let sumTensionScore = 0;
    
    appState.conflicts.forEach(c => {
        const sim = getConflictSimulatedValues(c);
        if (sim.spillover === "extreme" || sim.spillover === "high") {
            extremeOrHighCount++;
        }
        sumTensionScore += sim.spilloverScore;
    });

    const averageTensionIndex = Math.round(sumTensionScore / totalCount);

    document.getElementById("val-total-conflicts").innerText = totalCount;
    document.getElementById("val-high-risk").innerText = extremeOrHighCount;
    document.getElementById("val-tension-index").innerText = `${averageTensionIndex}/100`;

    // Recalculate WW3 Risk Score based on global tension + sandbox additions
    let ww3Score = Math.round(averageTensionIndex * 1.1);
    
    // Add additional points if sandbox triggers are checked globally
    if (appState.sandboxTriggers.foreignInvolvement) ww3Score += 15;
    if (appState.sandboxTriggers.economicBlockade) ww3Score += 10;
    if (appState.sandboxTriggers.cyberWarfare) ww3Score += 5;
    
    ww3Score = Math.min(99, Math.max(10, ww3Score));

    const ww3El = document.getElementById("global-ww3-index");
    if (ww3El) {
        let label = "ELEVATED";
        let color = "#f97316"; // Orange
        
        if (ww3Score < 40) {
            label = "LOW";
            color = "#10b981"; // Green
        } else if (ww3Score < 60) {
            label = "MODERATE";
            color = "#eab308"; // Yellow
        } else if (ww3Score >= 85) {
            label = "CRITICAL";
            color = "#b30202"; // Deep Red
        } else if (ww3Score >= 60) {
            label = "ELEVATED";
            color = "#ef4444"; // Red
        }
        
        ww3El.innerText = `${label} (${ww3Score}%)`;
        ww3El.style.color = color;
    }
}

function applySearchAndFilters() {
    appState.filteredConflicts = appState.conflicts.filter(conflict => {
        const sim = getConflictSimulatedValues(conflict);
        const searchLower = appState.searchQuery.toLowerCase();
        
        const matchesSearch = conflict.title.toLowerCase().includes(searchLower) ||
                              conflict.region.toLowerCase().includes(searchLower) ||
                              conflict.description.toLowerCase().includes(searchLower);

        let matchesSeverity = true;
        if (appState.activeFilter !== "all") {
            matchesSeverity = sim.spillover === appState.activeFilter;
        }

        return matchesSearch && matchesSeverity;
    });

    renderConflictList();
    updateMapMarkers();
}

// ====================================================
// BOTTOM TAB NAVIGATION
// ====================================================
function initBottomTabs() {
    const tabs = document.querySelectorAll(".analysis-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetPaneId = "pane-" + tab.getAttribute("data-analysis-tab");
            
            // Remove active state from all tabs and panes
            tabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            document.querySelectorAll(".analysis-pane").forEach(p => p.classList.remove("active"));
            
            // Set active state on clicked tab and pane
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            const targetPane = document.getElementById(targetPaneId);
            if (targetPane) {
                targetPane.classList.add("active");
            }
        });
    });
}

// ====================================================
// DYNAMIC FETCH OF UPDATEABLE DATA
// ====================================================
function fetchDynamicConflictData() {
    // Attempt to load dynamically updated conflicts.json from the GCS bucket
    fetch("conflicts.json")
        .then(response => {
            if (!response.ok) throw new Error("Status: " + response.status);
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                console.log("🚀 Loaded updated geopolitical dataset from GCS");
                appState.conflicts = data;
                applySearchAndFilters();
                updateGlobalMetrics();
            }
        })
        .catch(error => {
            console.warn("⚠️ Using built-in fallback dataset (Dynamic conflicts.json not initialized yet):", error.message);
        });
}

// ====================================================
// EVENT LISTENERS & SETUP
// ====================================================
document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initChart();
    initBottomTabs();
    
    // Perform initial local render
    renderConflictList();
    updateGlobalMetrics();

    // Check for dynamic GCS-served conflict data
    fetchDynamicConflictData();

    // Register search input
    document.getElementById("conflict-search").addEventListener("input", (e) => {
        appState.searchQuery = e.target.value;
        applySearchAndFilters();
    });

    // Register filter clicks
    const filters = ["all", "extreme", "high", "mild", "local"];
    filters.forEach(filterType => {
        const btn = document.getElementById(`filter-${filterType === "all" ? "all" : filterType === "extreme" ? "extreme" : filterType === "high" ? "high" : filterType === "local" ? "local" : "mild"}`);
        if (btn) {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-tab").forEach(tab => tab.classList.remove("active"));
                btn.classList.add("active");
                appState.activeFilter = filterType;
                applySearchAndFilters();
            });
        }
    });

    // Details close button
    document.getElementById("close-detail").addEventListener("click", () => {
        closeDetailsPanel();
    });

    // Sandbox Toggle Checkboxes
    const triggers = ["foreign-involvement", "economic-blockade", "cyber-warfare"];
    triggers.forEach(triggerName => {
        const camelName = triggerName.replace(/-([a-z])/g, g => g[1].toUpperCase());
        document.getElementById(`trigger-${triggerName}`).addEventListener("change", (e) => {
            appState.sandboxTriggers[camelName] = e.target.checked;
            syncSandboxStats();
            updateGlobalMetrics();
            if (appState.selectedConflict) {
                updateChartProjection(appState.selectedConflict);
                renderConflictList();
            }
        });
    });
});
