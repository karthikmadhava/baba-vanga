#!/usr/bin/env python3
import os
import json
import random
import subprocess
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime

# Path Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFLICTS_FILE = os.path.join(BASE_DIR, "conflicts.json")
LOG_FILE = os.path.join(BASE_DIR, "crawler.log")

# Fallback Geopolitical Dataset
default_conflicts = [
    {
        "id": "russia-ukraine",
        "title": "Russia-Ukraine Conventional War",
        "region": "Eastern Europe",
        "coords": [48.3794, 37.9610],
        "baseIntensity": 85,
        "baseSpillover": "extreme",
        "description": "A high-intensity conventional war. Despite slow frontline shifts, massive drone warfare and long-range strikes against economic infrastructure persist. The conflict carries a high risk of escalating to a direct military confrontation between Russia and NATO, making its global spillover potential extremely critical.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 15, "intensityBoost": 15, "desc": "Direct NATO engagement triggers global war threat, raising spillover risk to absolute maximum." },
            "economicBlockade": { "spilloverBoost": 10, "intensityBoost": 5, "desc": "Secondary sanctions and Black Sea maritime blockades trigger severe grain and fertilizer shortfalls." },
            "cyberWarfare": { "spilloverBoost": 12, "intensityBoost": 8, "desc": "Wide-scale cyberattacks targeting EU-US power grids and financial messaging protocols." }
        }
    },
    {
        "id": "gaza-israel",
        "title": "Israel-Gaza Ceasefire Volatility",
        "region": "Middle East",
        "coords": [31.3547, 34.3088],
        "baseIntensity": 80,
        "baseSpillover": "extreme",
        "description": "Following ceasefire agreements, massive internal disputes over geographic control persist. High casualty rates, refugee relocations, and humanitarian crises fuel ongoing tension. The risk of spilling over into surrounding nations remains high, threatening broader Middle Eastern alliances.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 15, "intensityBoost": 10, "desc": "Direct regional power deployment triggers wide-scale ground campaigns." },
            "economicBlockade": { "spilloverBoost": 10, "intensityBoost": 5, "desc": "Extended border closures halt trade networks and trigger severe fuel price spikes." },
            "cyberWarfare": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Disruptions to regional communication arrays and emergency channels." }
        }
    },
    {
        "id": "us-iran",
        "title": "Iran-US-Israel Confrontation",
        "region": "Middle East",
        "coords": [27.1894, 56.2708],
        "baseIntensity": 65,
        "baseSpillover": "extreme",
        "description": "Operation Epic Fury airstrikes and retaliatory missile/drone launches have led to highly volatile maritime standoffs. Continued skirmishes in the Strait of Hormuz disrupt global energy transportation channels.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 20, "intensityBoost": 25, "desc": "Airstrikes escalate into a regional ground war, causing immediate global energy market shocks." },
            "economicBlockade": { "spilloverBoost": 25, "intensityBoost": 10, "desc": "Full blockade of the Strait of Hormuz cuts off 20% of global oil supply, leading to critical global inflation." },
            "cyberWarfare": { "spilloverBoost": 10, "intensityBoost": 10, "desc": "State-sponsored cyber strikes compromise regional energy infrastructure." }
        }
    },
    {
        "id": "sudan-civil-war",
        "title": "Sudan Civil Conflict (SAF vs RSF)",
        "region": "East Africa",
        "coords": [15.5007, 32.5599],
        "baseIntensity": 75,
        "baseSpillover": "mild",
        "description": "A devastating civil war between the SAF and RSF has caused widespread destruction, mass internal displacement, and severe regional hunger. While humanitarian fallout is catastrophic, direct escalation into a major global power clash is currently contained.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 15, "intensityBoost": 15, "desc": "Inflow of mercenary groups and foreign arms shipments expands the battle lines across East Africa." },
            "economicBlockade": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Red Sea logistics bottlenecks limit access to crucial relief materials." },
            "cyberWarfare": { "spilloverBoost": 2, "intensityBoost": 2, "desc": "Disruption to local telecommunications infrastructure." }
        }
    },
    {
        "id": "myanmar-war",
        "title": "Myanmar Resistance Insurgency",
        "region": "Southeast Asia",
        "coords": [19.7633, 96.0785],
        "baseIntensity": 60,
        "baseSpillover": "mild",
        "description": "The military junta faces ongoing territorial losses to coalition forces and ethnic resistance groups. Widespread regional skirmishes persist, creating severe refugee migration pressures along border zones.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 10, "intensityBoost": 15, "desc": "Direct border involvement or military backing from neighboring states expands the geographic scope." },
            "economicBlockade": { "spilloverBoost": 8, "intensityBoost": 5, "desc": "Sanctions on mineral and gas exports cause severe regional currency devaluations." },
            "cyberWarfare": { "spilloverBoost": 2, "intensityBoost": 2, "desc": "Junta-sponsored surveillance and localized network blackouts." }
        }
    },
    {
        "id": "taiwan-strait",
        "title": "Taiwan Strait Military Stand-Off",
        "region": "East Asia",
        "coords": [24.4200, 120.2500],
        "baseIntensity": 30,
        "baseSpillover": "extreme",
        "description": "While not an active shooting conflict, intense naval deployments, air incursions, and rhetoric create a flashpoint. Any active confrontation would immediately involve the US and China, severely impacting global semiconductor supply chains.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 50, "intensityBoost": 60, "desc": "Direct naval interception leads to conventional warfare, triggering a world war scenario." },
            "economicBlockade": { "spilloverBoost": 40, "intensityBoost": 20, "desc": "A total maritime blockade of Taiwan halts 60%+ of global advanced microchip deliveries, causing global tech collapse." },
            "cyberWarfare": { "spilloverBoost": 20, "intensityBoost": 15, "desc": "Aggressive cyber attacks targeting power arrays and financial centers ahead of naval maneuvers." }
        }
    },
    {
        "id": "yemen-red-sea",
        "title": "Red Sea Maritime Shipping Conflict",
        "region": "Middle East",
        "coords": [15.3694, 44.1910],
        "baseIntensity": 50,
        "baseSpillover": "high",
        "description": "Drone and missile attacks on cargo vessels by Houthi forces have forced global logistics networks to divert around Africa. US-led naval coalitions conduct frequent retaliatory strikes on launch facilities.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 15, "intensityBoost": 15, "desc": "Coalition forces deploy ground units in coastal launching hubs, intensifying local warfare." },
            "economicBlockade": { "spilloverBoost": 20, "intensityBoost": 5, "desc": "Complete closure of Bab-el-Mandeb, forcing prolonged maritime re-routing and surging transport costs." },
            "cyberWarfare": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Spoofing of maritime GPS tracking and radar arrays." }
        }
    },
    {
        "id": "drc-insurgency",
        "title": "DR Congo M23 Conflict",
        "region": "Central Africa",
        "coords": [-1.6585, 29.2230],
        "baseIntensity": 55,
        "baseSpillover": "local",
        "description": "Violent incursions by M23 and local militia forces continue to displace thousands in eastern DRC, complicated by local disease outbreaks. The conflict remains localized but risks triggering wider central African border clashes.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 15, "intensityBoost": 15, "desc": "Direct cross-border military incursions escalate tensions between DRC and Rwanda into full conventional war." },
            "economicBlockade": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Critical disruptions to cobalt and copper mining exports, driving global battery material shortages." },
            "cyberWarfare": { "spilloverBoost": 1, "intensityBoost": 1, "desc": "Minimal digital impact on localized communications." }
        }
    },
    {
        "id": "sahel-insurgency",
        "title": "Sahel Region Insurgencies",
        "region": "West Africa / Sahel",
        "coords": [13.5116, 2.1128],
        "baseIntensity": 45,
        "baseSpillover": "mild",
        "description": "Insurgent activities and military coups in Niger, Mali, and Burkina Faso have led to the withdrawal of western military forces. High levels of local insecurity persist, driving migration flows toward North Africa and Europe.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 12, "intensityBoost": 12, "desc": "Engagement of foreign private military contractors increases security instability." },
            "economicBlockade": { "spilloverBoost": 6, "intensityBoost": 4, "desc": "Sanctions by ECOWAS and Western nations restrict regional commerce, fueling black market networks." },
            "cyberWarfare": { "spilloverBoost": 2, "intensityBoost": 2, "desc": "State media blockades and coordinated misinformation campaigns." }
        }
    },
    {
        "id": "korean-peninsula",
        "title": "Korean Peninsula Demarcation Stand-Off",
        "region": "East Asia",
        "coords": [37.9250, 127.2000],
        "baseIntensity": 20,
        "baseSpillover": "high",
        "description": "Artillery drills, balloon launches, and mutual terminations of military pacts maintain high tensions. High global impact due to the presence of nuclear weapons and defense treaties with major superpowers.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 45, "intensityBoost": 55, "desc": "Border skirmishes activate US-South Korea mutual defense pact, drawing in global military networks." },
            "economicBlockade": { "spilloverBoost": 15, "intensityBoost": 10, "desc": "Complete shipping trade restrictions in the Yellow Sea." },
            "cyberWarfare": { "spilloverBoost": 25, "intensityBoost": 15, "desc": "Highly aggressive cyber strikes targeting state grids and semiconductor manufacturing." }
        }
    },
    {
        "id": "haiti-crisis",
        "title": "Haiti Gang & Institutional Collapse",
        "region": "Caribbean",
        "coords": [18.5392, -72.3350],
        "baseIntensity": 50,
        "baseSpillover": "local",
        "description": "Criminal factions retain control over Port-au-Prince. The breakdown of state institutions has resulted in high violence and critical food insecurity. The threat remains localized but triggers migration flows toward North America.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 10, "intensityBoost": 12, "desc": "International security missions expand operations, leading to intensive urban battles." },
            "economicBlockade": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Fuel port blockades stop distribution networks, halting local utilities." },
            "cyberWarfare": { "spilloverBoost": 1, "intensityBoost": 1, "desc": "Negligible digital impact." }
        }
    },
    {
        "id": "mozambique-insurgency",
        "title": "Cabo Delgado Insurgency",
        "region": "Southeast Africa",
        "coords": [-12.9740, 40.5178],
        "baseIntensity": 35,
        "baseSpillover": "local",
        "description": "Insurgent forces continue to target villages and security forces in northern Mozambique, periodically halting multibillion-dollar LNG projects. The conflict remains localized but impacts regional energy investments.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 8, "intensityBoost": 10, "desc": "Deployment of regional task forces expands security zones." },
            "economicBlockade": { "spilloverBoost": 10, "intensityBoost": 5, "desc": "Long-term halting of LNG projects raises energy import bills for neighboring states." },
            "cyberWarfare": { "spilloverBoost": 1, "intensityBoost": 1, "desc": "Negligible digital impact." }
        }
    },
    {
        "id": "syria-civil-war",
        "title": "Syrian Civil War Status",
        "region": "Middle East",
        "coords": [33.5138, 36.2765],
        "baseIntensity": 40,
        "baseSpillover": "high",
        "description": "A partially frozen conflict characterized by sporadic regional clashes and strikes from Israel, Turkey, and Coalition forces. The complex overlap of global powers ensures high escalation potential.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 20, "intensityBoost": 20, "desc": "Renewed wide-scale military offensives backed by international air support." },
            "economicBlockade": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Pipeline closures and sanctions further restrict reconstruction efforts." },
            "cyberWarfare": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Disruptions to regional air defence network signals." }
        }
    },
    {
        "id": "libya-instability",
        "title": "Libya Dual-Government Crisis",
        "region": "North Africa",
        "coords": [32.8872, 13.1913],
        "baseIntensity": 30,
        "baseSpillover": "local",
        "description": "Split governance structures and sporadic militia clashes around oil infrastructure persist. Tensions remain localized, although they periodically disrupt Mediterranean energy pipelines.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 12, "intensityBoost": 10, "desc": "Foreign backing of rival governments triggers mobilization of heavy armaments." },
            "economicBlockade": { "spilloverBoost": 15, "intensityBoost": 5, "desc": "Militia shut-downs of key crude oil terminals spike European fuel prices." },
            "cyberWarfare": { "spilloverBoost": 2, "intensityBoost": 2, "desc": "Localized utility infrastructure hacking." }
        }
    },
    {
        "id": "somalia-insurgency",
        "title": "Somalia Al-Shabaab Insurgency",
        "region": "Horn of Africa",
        "coords": [2.0469, 45.3182],
        "baseIntensity": 40,
        "baseSpillover": "local",
        "description": "Government military operations against Al-Shabaab insurgent strongholds continue. The conflict is mostly localized, but regional tensions in the Horn of Africa add risk.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 10, "intensityBoost": 8, "desc": "Increased regional military involvement shifts military dynamics." },
            "economicBlockade": { "spilloverBoost": 5, "intensityBoost": 5, "desc": "Piracy resurgence or shipping disruptions off the Horn of Africa." },
            "cyberWarfare": { "spilloverBoost": 1, "intensityBoost": 1, "desc": "Negligible digital impact." }
        }
    },
    {
        "id": "kashmir-conflict",
        "title": "India-Pakistan Border Conflict",
        "region": "South Asia",
        "coords": [34.0837, 74.7973],
        "baseIntensity": 50,
        "baseSpillover": "high",
        "description": "Ongoing territorial dispute over the Kashmir region between nuclear-armed nations India and Pakistan. Frequent artillery stand-offs and border incursions along the Line of Control (LoC) maintain elevated risks of escalation.",
        "sandboxModifiers": {
            "foreignInvolvement": { "spilloverBoost": 25, "intensityBoost": 15, "desc": "Superpower alignment shifts or military backing escalates tensions." },
            "economicBlockade": { "spilloverBoost": 15, "intensityBoost": 10, "desc": "Indus Water Treaty disputes or trade bans impact regional resource channels." },
            "cyberWarfare": { "spilloverBoost": 10, "intensityBoost": 5, "desc": "State-sponsored digital attacks targeting national energy grids." }
        }
    }
]

# Keywords mapping for RSS feed matching
keywords_map = {
    "russia-ukraine": ["ukraine", "russia", "kyiv", "moscow", "donbas", "zelensky", "putin"],
    "gaza-israel": ["gaza", "israel", "hamas", "palestinian", "netanyahu", "rafah"],
    "us-iran": ["iran", "hormuz", "tehran", "epic fury", "persian gulf"],
    "sudan-civil-war": ["sudan", "darfur", "khartoum", "rapid support forces", "rsf"],
    "myanmar-war": ["myanmar", "burma", "naypyidaw", "junta", "tatmadaw"],
    "taiwan-strait": ["taiwan", "taipei", "beijing", "china sea", "tsmc"],
    "yemen-red-sea": ["yemen", "houthi", "red sea", "bab-el-mandeb", "shipping"],
    "drc-insurgency": ["congo", "drc", "m23", "goma"],
    "sahel-insurgency": ["sahel", "niger", "mali", "burkina faso", "niamey"],
    "korean-peninsula": ["korea", "dmz", "pyongyang", "seoul", "kim jong"],
    "haiti-crisis": ["haiti", "port-au-prince", "gangs"],
    "mozambique-insurgency": ["mozambique", "cabo delgado", "pemba"],
    "syria-civil-war": ["syria", "damascus", "assad"],
    "libya-instability": ["libya", "tripoli", "benghazi"],
    "somalia-insurgency": ["somalia", "mogadishu", "al-shabaab"],
    "kashmir-conflict": ["kashmir", "loc", "india-pakistan", "srinagar", "indus water"]
}

def log(message):
    timestamp = datetime.now().isoformat()
    log_line = f"[{timestamp}] {message}\n"
    print(message)
    with open(LOG_FILE, "a") as f:
        f.write(log_line)

def load_current_conflicts():
    if os.path.exists(CONFLICTS_FILE):
        try:
            with open(CONFLICTS_FILE, "r") as f:
                return json.load(f)
        except Exception as e:
            log(f"Error reading existing json: {e}. Reverting to fallback.")
    return json.loads(json.dumps(default_conflicts))

def fetch_rss_headlines():
    # Fetch news feed securely with timeout
    rss_urls = [
        "https://feeds.bbci.co.uk/news/world/rss.xml",
        "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
    ]
    
    all_headlines = []
    
    for url in rss_urls:
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                xml_data = response.read()
                root = ET.fromstring(xml_data)
                for item in root.findall('.//item'):
                    title = item.find('title')
                    desc = item.find('description')
                    text = ""
                    if title is not None and title.text:
                        text += title.text.lower() + " "
                    if desc is not None and desc.text:
                        text += desc.text.lower()
                    if text:
                        all_headlines.append(text)
            log(f"Successfully fetched news headlines from: {url}")
        except Exception as e:
            log(f"Warning: Failed to fetch RSS from {url}: {e}")
            
    return all_headlines

def update_conflicts():
    log("Starting Geopolitical Conflict Crawler task...")
    
    # 1. Load conflicts
    conflicts = load_current_conflicts()
    
    # 2. Fetch news
    headlines = fetch_rss_headlines()
    
    # 3. Recalculate metrics
    matched_counts = {}
    
    if headlines:
        log(f"Analyzing {len(headlines)} recent global headlines for keyword correlations...")
        for cid, keywords in keywords_map.items():
            matched_counts[cid] = 0
            for text in headlines:
                if any(kw in text for kw in keywords):
                    matched_counts[cid] += 1
    else:
        log("No RSS headlines available. Generating minor dynamic variations.")

    for conflict in conflicts:
        cid = conflict["id"]
        # Base adjustments
        delta = 0
        
        if headlines:
            matches = matched_counts.get(cid, 0)
            if matches > 0:
                # Active conflict in the news - escalate intensity
                delta = min(5, matches) # +1 to +5 points
                log(f"Correlation: '{conflict['title']}' matches {matches} headlines. Escalation delta: +{delta}")
            else:
                # No news - subtle de-escalation index adjustment (decay)
                delta = random.choice([-1, 0])
        else:
            # Fallback simulated drift (+/- 1 or 2)
            delta = random.choice([-2, -1, 0, 1, 2])
            
        # Update Base Intensity
        conflict["baseIntensity"] = max(10, min(100, conflict["baseIntensity"] + delta))
        
        # Shift Base Spillover categories slightly based on intensity thresholds
        if conflict["baseIntensity"] >= 80:
            conflict["baseSpillover"] = "extreme"
        elif conflict["baseIntensity"] >= 60:
            conflict["baseSpillover"] = "high"
        elif conflict["baseIntensity"] >= 40:
            conflict["baseSpillover"] = "mild"
        else:
            conflict["baseSpillover"] = "local"

    # 4. Save to conflicts.json
    try:
        with open(CONFLICTS_FILE, "w") as f:
            json.dump(conflicts, f, indent=2)
        log("Successfully updated conflicts.json locally.")
    except Exception as e:
        log(f"Error saving conflicts.json: {e}")
        return

    # 5. Sync to GCP Bucket if configured
    try:
        # Determine active project ID which matches GCS bucket
        project_id = subprocess.check_output(
            ["gcloud", "config", "get-value", "project"], 
            stderr=subprocess.DEVNULL
        ).decode().strip()
        
        if project_id and project_id != "(unset)":
            log(f"Syncing updated conflicts.json to GCP Bucket: gs://{project_id}")
            subprocess.run(
                ["gcloud", "storage", "cp", CONFLICTS_FILE, f"gs://{project_id}/conflicts.json"],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            log("Sync complete.")
        else:
            log("No active GCP project configuration set in gcloud. Skipping bucket upload.")
    except Exception as e:
        log(f"GCP bucket sync skipped or failed: {e}")

if __name__ == "__main__":
    update_conflicts()
