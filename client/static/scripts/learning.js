// ==================== LEARNING PAGE INTERACTIVE SCRIPT ====================
console.log('Learning Page Initialized - Complete 14 Heart Parts');

// ==================== COMPREHENSIVE HEART DATA (14 PARTS) ====================

const heartData = {
    // 1. Right Atrium
    ra: {
        name: 'Right Atrium',
        nameThai: 'ห้องบนขวา',
        description: 'The right atrium is the upper right chamber of the heart that receives deoxygenated blood from the body through the superior and inferior vena cavae. Operating at low pressure (0-8 mmHg), it contracts during atrial systole to complete ventricular filling.',
        functions: [
            'Receives deoxygenated blood from the superior and inferior vena cavae',
            'Contains the sinoatrial (SA) node, the heart\'s natural pacemaker',
            'Contracts during atrial systole to pump blood into the right ventricle through the tricuspid valve',
            'Has thin walls adapted for low-pressure operations',
            'Contains the fossa ovalis, a remnant of the foramen ovale from fetal circulation'
        ],
        clinicalNote: 'Enlargement of the right atrium can indicate conditions such as tricuspid valve disease or pulmonary hypertension.'
    },
    
    // 2. Right Ventricle
    rv: {
        name: 'Right Ventricle',
        nameThai: 'ห้องล่างขวา',
        description: 'The right ventricle pumps deoxygenated blood to the lungs via the pulmonary artery. Its walls are thicker than the atria but thinner than the left ventricle, as it pumps against lower pulmonary vascular resistance.',
        functions: [
            'Receives deoxygenated blood from the right atrium during ventricular diastole',
            'Contracts during ventricular systole to pump blood through the pulmonary valve into the pulmonary artery',
            'Generates pressures of approximately 25/0-8 mmHg (systolic/diastolic)',
            'Has trabecular structure with muscular ridges to enhance contraction efficiency',
            'Contains the moderator band, conducting electrical signals rapidly across the ventricle'
        ],
        clinicalNote: 'Right ventricular failure can result from chronic lung disease or pulmonary embolism, leading to systemic venous congestion.'
    },
    
    // 3. Left Atrium
    la: {
        name: 'Left Atrium',
        nameThai: 'ห้องบนซ้าย',
        description: 'The left atrium receives oxygenated blood from the lungs through four pulmonary veins. It has slightly thicker walls than the right atrium due to higher pressure requirements for filling the muscular left ventricle.',
        functions: [
            'Receives oxygen-rich blood from four pulmonary veins (two from each lung)',
            'Serves as a reservoir during ventricular systole',
            'Contracts during atrial systole to complete left ventricular filling',
            'Maintains higher pressure than the right atrium',
            'Contains pressure receptors that help regulate blood volume'
        ],
        clinicalNote: 'Left atrial enlargement is common in mitral valve disease and can lead to atrial fibrillation, increasing stroke risk.'
    },
    
    // 4. Left Ventricle
    lv: {
        name: 'Left Ventricle',
        nameThai: 'ห้องล่างซ้าย',
        description: 'The left ventricle is the heart\'s most powerful chamber, with walls 8-12mm thick. It generates systolic pressures of 120 mmHg to pump oxygenated blood throughout the entire body via the aorta, making it essential for systemic circulation.',
        functions: [
            'Pumps oxygenated blood through the aortic valve into the aorta and systemic circulation',
            'Generates the highest pressures in the heart (approximately 120/0-12 mmHg)',
            'Has the thickest myocardial walls to handle systemic vascular resistance',
            'Contains papillary muscles that prevent mitral valve prolapse',
            'Ejects approximately 70mL of blood per beat (stroke volume) at rest'
        ],
        clinicalNote: 'Left ventricular hypertrophy develops in response to chronic hypertension and can lead to heart failure if untreated.'
    },
    
    // 6. Superior Vena Cava (NEW)
    svc: {
        name: 'Superior Vena Cava',
        nameThai: 'เส้นเลือดดำใหญ่ส่วนบน',
        description: 'A large vein approximately 2 cm in diameter and 7-8 cm long, carrying deoxygenated blood from the upper body (head, neck, shoulders, both arms, and upper thorax) back to the right atrium without any valves controlling flow.',
        functions: [
            'Collects blood from two brachiocephalic veins (formed by union of subclavian and internal jugular veins)',
            'Returns blood containing CO₂ and cellular waste products from upper body cells',
            'Flows into the right atrium at the upper posterior position',
            'Operates at low pressure (2-8 mmHg)',
            'Has no valves, allowing continuous venous return to the heart'
        ],
        clinicalNote: 'SVC obstruction or compression (SVC syndrome) can result from thoracic tumors, causing facial and neck swelling, arm edema, and visible venous distension.'
    },
    
    // 7. Inferior Vena Cava (NEW)
    ivc: {
        name: 'Inferior Vena Cava',
        nameThai: 'เส้นเลือดดำใหญ่ส่วนล่าง',
        description: 'The largest vein in the body, 2.5-3 cm in diameter and approximately 22-24 cm long. Formed by the union of two common iliac veins at L5 vertebra level, carrying deoxygenated blood from the lower body.',
        functions: [
            'Collects blood from both legs, pelvis, abdomen, and abdominal organs (liver, kidneys, spleen, intestines)',
            'Penetrates the diaphragm at T8 to enter the thoracic cavity',
            'Opens into the right atrium at the lower posterior position',
            'Contains Eustachian valve at entrance to right atrium (important during fetal development)',
            'Operates at very low pressure (0-5 mmHg)'
        ],
        clinicalNote: 'IVC obstruction can result from thrombosis, a medical emergency that may lead to pulmonary embolism, which is life-threatening.'
    },
    
    // 8. Aorta (NEW)
    aorta: {
        name: 'Aorta',
        nameThai: 'หลอดเลือดแดงใหญ่',
        description: 'The largest artery in the body, approximately 2.5-3.5 cm in diameter at origin, with walls about 2 mm thick. Arises from left ventricle distributing oxygenated blood throughout the entire body.',
        functions: [
            'Divided into 3 main parts: Ascending aorta (gives rise to coronary arteries), Aortic arch (branches to head/neck/arms), Descending aorta (supplies thorax/abdomen/legs)',
            'Withstands highest pressure in circulatory system (systolic ~120 mmHg, diastolic ~80 mmHg)',
            'Functions as "windkessel" - elastic walls store energy during systole and release during diastole',
            'Contains baroreceptors in aortic arch for blood pressure regulation',
            'Supplies all body organs and tissues with oxygenated blood'
        ],
        clinicalNote: 'Aortic aneurysm and aortic dissection are life-threatening emergencies, often caused by chronic hypertension, atherosclerosis, or genetic disorders like Marfan syndrome.'
    },
    
    // 9. Pulmonary Artery (NEW)
    pa: {
        name: 'Pulmonary Artery',
        nameThai: 'หลอดเลือดแดงปอด',
        description: 'The only artery carrying deoxygenated blood, approximately 3 cm in diameter and 5 cm long. Originates from right ventricle through pulmonary valve, dividing into left and right pulmonary arteries to each lung.',
        functions: [
            'Carries blood high in CO₂ and low in O₂ from right ventricle to lungs',
            'Divides into right pulmonary artery (shorter, wider) and left pulmonary artery (longer, narrower)',
            'Maintains much lower pressure than systemic circulation (systolic ~25 mmHg, diastolic ~8 mmHg)',
            'Each branch subdivides according to lung lobes, ultimately becoming capillaries around alveoli',
            'Connected to aortic arch by ligamentum arteriosum (remnant of fetal ductus arteriosus)'
        ],
        clinicalNote: 'Pulmonary embolism is a life-threatening emergency. Pulmonary hypertension causes right ventricle overwork and may lead to right heart failure.'
    },
    
    // 10. Pulmonary Vein (NEW)
    pv: {
        name: 'Pulmonary Veins',
        nameThai: 'เส้นเลือดดำปอด',
        description: 'The only veins carrying oxygenated blood. Four veins total (2 from each lung - superior and inferior pulmonary veins), approximately 1-1.5 cm in diameter, without valves.',
        functions: [
            'Carries blood high in O₂ (~95-100% saturation) and low in CO₂ from lungs to left atrium',
            'Collects blood from pulmonary capillaries surrounding alveoli after gas exchange',
            'Right superior pulmonary vein collects from upper and middle lobes of right lung',
            'Right inferior pulmonary vein collects from lower lobe of right lung',
            'Left superior and inferior pulmonary veins collect from respective lobes of left lung',
            'Opens into left atrium at posterior wall with low pressure (~5-8 mmHg)'
        ],
        clinicalNote: 'Pulmonary vein stenosis may occur after ablation treatment for atrial fibrillation. Anomalous pulmonary venous return (congenital defect) causes misdirected blood flow.'
    },
    
    // 11. Tricuspid Valve (NEW)
    tv: {
        name: 'Tricuspid Valve',
        nameThai: 'ลิ้นไตรคัสพิด',
        description: 'Atrioventricular (AV) valve between right atrium and right ventricle. Three cusps/leaflets: anterior (largest), posterior, and septal. Orifice area ~7-9 cm².',
        functions: [
            'Opens when right atrial pressure exceeds right ventricular pressure (during ventricular diastole)',
            'Closes during right ventricular contraction (ventricular systole) to prevent regurgitation',
            'Each cusp connects to papillary muscles (3 total) via chordae tendineae',
            'Chordae tendineae prevent prolapse, withstanding pressures up to 100-150 mmHg',
            'Closure produces S1 heart sound ("lub") at onset of ventricular systole',
            'Has annulus (ring) at base maintaining shape'
        ],
        clinicalNote: 'Tricuspid regurgitation often results from right ventricular dilation, pulmonary hypertension, or endocarditis. Tricuspid stenosis is rarer, usually from rheumatic heart disease.'
    },
    
    // 12. Mitral Valve (NEW)
    mv: {
        name: 'Mitral (Bicuspid) Valve',
        nameThai: 'ลิ้นไมทรัล',
        description: 'Atrioventricular (AV) valve between left atrium and left ventricle. Two leaflets: anterior (larger, covers 2/3 area) and posterior. Orifice area ~4-6 cm².',
        functions: [
            'Opens when left atrial pressure exceeds left ventricular pressure (during ventricular diastole)',
            'Closes during left ventricular contraction (ventricular systole) preventing regurgitation',
            'Each leaflet connects to papillary muscles (2: anterolateral and posteromedial) via chordae tendineae',
            'Mitral valve apparatus includes annulus, leaflets, chordae tendineae, papillary muscles',
            'Simultaneous closure with tricuspid valve produces S1 heart sound',
            'Anterior leaflet attaches to aortic valve, important for left ventricular outflow tract'
        ],
        clinicalNote: 'Mitral regurgitation results from myxomatous degeneration, ischemic heart disease, or rheumatic fever. Mitral stenosis from rheumatic disease causes left atrial enlargement with high atrial fibrillation risk. Mitral valve prolapse (MVP) is common, usually asymptomatic.'
    },
    
    // 13. Pulmonary Valve (NEW)
    'pv-valve': {
        name: 'Pulmonary Valve',
        nameThai: 'ลิ้นปอด',
        description: 'Semilunar valve between right ventricle and pulmonary artery. Three cusps: anterior, right, and left. No chordae tendineae or papillary muscles. Orifice area ~2-2.5 cm².',
        functions: [
            'Opens during right ventricular contraction when RV pressure exceeds pulmonary artery pressure (>25 mmHg)',
            'Closes during right ventricular relaxation preventing backflow from pulmonary artery',
            'Each cusp pocket-shaped, filling with blood when closed for tight coaptation',
            'Sinuses of Valsalva (3 sinuses) at cusp bases facilitate blood circulation and valve closure',
            'Simultaneous closure with aortic valve produces S2 heart sound ("dub")',
            'Opens-closes ~100,000 times/day'
        ],
        clinicalNote: 'Pulmonary stenosis (PS) usually congenital, forcing right ventricle to work harder, may lead to RV hypertrophy. Pulmonary regurgitation often results from pulmonary hypertension or post-surgical repair.'
    },
    
    // 14. Aortic Valve (NEW)
    av: {
        name: 'Aortic Valve',
        nameThai: 'ลิ้นเอออร์ติก',
        description: 'Semilunar valve between left ventricle and aorta. Three cusps: right coronary, left coronary, and non-coronary (named after adjacent sinuses of Valsalva). Orifice area ~3-4 cm².',
        functions: [
            'Opens during left ventricular contraction when LV pressure exceeds aortic pressure (>80 mmHg)',
            'Closes during left ventricular relaxation preventing backflow from aorta',
            'Withstands highest pressure in heart (~120 mmHg systolic)',
            'Sinuses of Valsalva give rise to coronary arteries: right and left cusps have coronary origins',
            'Backflow into sinuses facilitates valve closure and coronary perfusion during diastole',
            'Closure produces A2 component of S2 heart sound, louder than P2 due to higher pressure'
        ],
        clinicalNote: 'Aortic stenosis often from calcification in elderly, congenital bicuspid valve, or rheumatic disease, causing LV hypertrophy, heart failure, syncope, and angina. Aortic regurgitation from aortic root dilatation, endocarditis, or rheumatic disease causes LV volume overload.'
    },
    
    // 15. Pericardium (NEW)
    pericardium: {
        name: 'Pericardium',
        nameThai: 'เยื่อหุ้มหัวใจ',
        description: 'Double-walled sac surrounding heart and great vessel origins. Consists of outer fibrous pericardium (tough, inelastic) and inner serous pericardium divided into parietal and visceral (epicardium) layers.',
        functions: [
            'Fibrous pericardium: Strong outer layer anchoring heart in proper position, attached to diaphragm and sternum',
            'Pericardial cavity contains pericardial fluid (~15-50 mL) lubricating and reducing friction',
            'Protects heart from external injury and infection from adjacent organs',
            'Limits excessive heart expansion during acute volume overload',
            'Maintains ventricular interdependence - volume changes in one chamber affect the other',
            'Contains mesothelial cells producing fluid and lymphatics absorbing fluid'
        ],
        clinicalNote: 'Pericarditis causes sharp chest pain, better when sitting forward. Pericardial effusion, if rapid and large, may cause cardiac tamponade, a life-threatening emergency. Constrictive pericarditis from fibrosis limits heart expansion.'
    },
    
    // Keep the original "valves" and "vessels" for backward compatibility
    valves: {
        name: 'Cardiac Valves',
        nameThai: 'ลิ้นหัวใจ',
        description: 'The heart contains four valves ensuring unidirectional blood flow. Atrioventricular valves (tricuspid and mitral) prevent backflow from ventricles to atria, while semilunar valves (pulmonary and aortic) prevent backflow from arteries to ventricles.',
        functions: [
            'Tricuspid Valve: Three cusps between right atrium and right ventricle',
            'Mitral (Bicuspid) Valve: Two cusps between left atrium and left ventricle',
            'Pulmonary Valve: Three semilunar cusps between right ventricle and pulmonary artery',
            'Aortic Valve: Three semilunar cusps between left ventricle and aorta',
            'Open and close passively in response to pressure gradients',
            'Chordae tendineae and papillary muscles prevent AV valve prolapse'
        ],
        clinicalNote: 'Valvular heart diseases include stenosis (narrowing) and regurgitation (leaking), both compromising cardiac efficiency.'
    },
    
    vessels: {
        name: 'Major Blood Vessels',
        nameThai: 'หลอดเลือดหลัก',
        description: 'The heart connects to several major blood vessels: vena cavae bring deoxygenated blood to the right atrium, pulmonary arteries carry blood to the lungs, pulmonary veins return oxygenated blood to the left atrium, and the aorta distributes blood systemically.',
        functions: [
            'Superior Vena Cava: Returns blood from upper body to right atrium',
            'Inferior Vena Cava: Returns blood from lower body to right atrium',
            'Pulmonary Artery: Carries deoxygenated blood from right ventricle to lungs',
            'Pulmonary Veins: Return oxygenated blood from lungs to left atrium',
            'Aorta: Distributes oxygenated blood from left ventricle to entire body'
        ],
        clinicalNote: 'The pulmonary artery and pulmonary veins are unique in carrying opposite types of blood than typical arteries and veins.'
    }
};

// ==================== BRAIN DATA (Keep original) ====================

const brainData = {
    frontal: {
        name: 'Frontal Lobe',
        nameThai: 'สมองส่วนหน้า',
        description: 'The frontal lobe, comprising approximately 40% of total cortical volume, is located anterior to the central sulcus. It is responsible for executive functions, motor control, language production, and personality expression.',
        functions: [
            'Primary Motor Cortex (M1): Initiates voluntary movements through upper motor neurons',
            'Prefrontal Cortex: Executive functions including planning, decision-making, and working memory',
            'Broca\'s Area: Speech production and grammatical processing in the dominant hemisphere',
            'Premotor Cortex: Motor planning and preparation, contains mirror neurons',
            'Dorsolateral Prefrontal Cortex: Cognitive flexibility and problem-solving',
            'Orbitofrontal Cortex: Emotional regulation and reward processing',
            'Frontal Eye Fields: Control of voluntary eye movements'
        ],
        clinicalNote: 'Damage to the frontal lobe can result in personality changes, impaired judgment, and motor deficits. The famous case of Phineas Gage demonstrated the role of frontal lobes in personality and behavior.'
    },
    parietal: {
        name: 'Parietal Lobe',
        nameThai: 'สมองส่วนข้าง',
        description: 'Located between the frontal and occipital lobes, posterior to the central sulcus, the parietal lobe integrates sensory information from various modalities and constructs spatial awareness.',
        functions: [
            'Primary Somatosensory Cortex (S1): Processes touch, pressure, temperature, and pain',
            'Posterior Parietal Cortex: Spatial awareness and visuomotor integration',
            'Superior Parietal Lobule: Spatial attention and reach-to-grasp movements',
            'Angular Gyrus: Reading, writing, and mathematical processing',
            'Supramarginal Gyrus: Phonological processing and language comprehension',
            'Sensory integration from multiple modalities',
            'Body schema and awareness of body position in space'
        ],
        clinicalNote: 'Parietal lobe lesions can cause contralateral neglect syndrome, where patients ignore one side of space, typically the left side following right parietal damage.'
    },
    temporal: {
        name: 'Temporal Lobe',
        nameThai: 'สมองส่วนขมับ',
        description: 'The temporal lobe, located ventral to the lateral sulcus, processes auditory information, forms and retrieves memories, recognizes faces and objects, and comprehends language.',
        functions: [
            'Primary Auditory Cortex (A1): Processes sound frequencies in tonotopic organization',
            'Wernicke\'s Area: Language comprehension in the dominant hemisphere',
            'Hippocampus: Critical for declarative memory formation and spatial navigation',
            'Amygdala: Processes emotional significance, particularly fear and threat detection',
            'Fusiform Gyrus: Face recognition (fusiform face area)',
            'Parahippocampal Cortex: Scene recognition and spatial memory',
            'Superior Temporal Sulcus: Social cognition and biological motion perception'
        ],
        clinicalNote: 'Temporal lobe epilepsy is the most common form of focal epilepsy. Bilateral hippocampal damage, as in patient H.M., causes severe anterograde amnesia.'
    },
    occipital: {
        name: 'Occipital Lobe',
        nameThai: 'สมองส่วนท้ายทอย',
        description: 'The occipital lobe, the smallest and most posterior lobe, is dedicated almost entirely to visual processing. It transforms retinal signals into conscious visual perception through hierarchical processing.',
        functions: [
            'Primary Visual Cortex (V1): Processes basic visual features including edges, orientations, and color',
            'V2-V5 Visual Association Areas: Progressively complex visual feature extraction',
            'Ventral Stream: Object recognition and color processing (what pathway)',
            'Dorsal Stream: Spatial location and motion detection (where pathway)',
            'Retinotopic mapping with disproportionate foveal representation',
            'Binocular vision and depth perception',
            'Visual field processing: left occipital processes right visual field and vice versa'
        ],
        clinicalNote: 'Damage to V1 causes cortical blindness in corresponding visual fields. Bilateral occipital damage can cause Anton syndrome, where patients deny their blindness.'
    },
    cerebellum: {
        name: 'Cerebellum',
        nameThai: 'สมองน้อย',
        description: 'The cerebellum, located posterior to the brainstem, contains approximately 50% of all brain neurons despite occupying only 10% of brain volume. It coordinates movement, maintains balance, and contributes to motor learning and cognitive functions.',
        functions: [
            'Motor Coordination: Fine-tunes movements through error correction signals',
            'Balance and Equilibrium: Integrates vestibular, proprioceptive, and visual inputs',
            'Motor Learning: Stores motor programs and enables skill acquisition',
            'Timing and Sequencing: Precise temporal control of movements',
            'Cognitive Functions: Attention, language processing, and working memory',
            'Vestibulocerebellum: Balance and eye movement control',
            'Spinocerebellum: Muscle tone and trunk/limb coordination',
            'Cerebrocerebellum: Motor planning and cognitive processing'
        ],
        clinicalNote: 'Cerebellar damage causes ataxia (incoordination), dysmetria (overshooting targets), intention tremor, and dysdiadochokinesia (impaired rapid alternating movements).'
    },
    brainstem: {
        name: 'Brainstem',
        nameThai: 'ก้านสมอง',
        description: 'The brainstem connects the cerebrum with the spinal cord, containing nuclei controlling vital autonomic functions. It comprises the midbrain, pons, and medulla oblongata, serving as a conduit for ascending and descending pathways.',
        functions: [
            'Cardiovascular Regulation: Controls heart rate and blood pressure',
            'Respiratory Control: Generates basic breathing rhythm',
            'Consciousness and Arousal: Reticular activating system maintains wakefulness',
            'Cranial Nerve Nuclei: Houses nuclei for cranial nerves III-XII',
            'Reflex Actions: Coughing, sneezing, swallowing, and vomiting reflexes',
            'Pain Modulation: Periaqueductal gray controls descending pain inhibition',
            'Motor Control: Substantia nigra and red nucleus contribute to movement',
            'Sleep-Wake Cycles: Regulates circadian rhythms and consciousness'
        ],
        clinicalNote: 'Brainstem strokes are particularly dangerous as they can affect vital functions. Locked-in syndrome results from ventral pontine lesions, preserving consciousness while paralyzing voluntary movement.'
    }
};

// ==================== FUNCTIONS ====================

function switchTopic(topic) {
    console.log('Switching to topic:', topic);
    
    document.querySelectorAll('.topic-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.topic-tab').classList.add('active');
    
    document.querySelectorAll('.topic-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${topic}-content`).classList.add('active');
    
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.classList.remove('active');
    });
}

function showInfo(part, data, infoElementId) {
    console.log('Showing info for:', part);
    
    const infoCard = document.getElementById(infoElementId);
    const infoContent = infoCard.querySelector('.info-content');
    
    const partData = data[part];
    if (!partData) {
        console.warn('No data found for part:', part);
        return;
    }
    
    let html = `
        <h4>${partData.name} (${partData.nameThai})</h4>
        <p class="intro-text">${partData.description}</p>
        
        <h4>Key Functions and Characteristics</h4>
        <div class="detail-section">
            <ul>
    `;
    
    partData.functions.forEach(func => {
        html += `<li>${func}</li>`;
    });
    
    html += `
            </ul>
        </div>
    `;
    
    if (partData.clinicalNote) {
        html += `
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <h4 style="color: #856404; margin-top: 0;">Clinical Significance</h4>
                <p style="margin: 0; color: #856404;">${partData.clinicalNote}</p>
            </div>
        `;
    }
    
    infoContent.innerHTML = html;
    
    infoCard.style.animation = 'none';
    setTimeout(() => {
        infoCard.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
    
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.classList.remove('active');
    });
    document.querySelector(`.hotspot[data-part="${part}"]`)?.classList.add('active');
}

// ==================== EVENT LISTENERS ====================

document.querySelectorAll('.topic-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const topic = this.dataset.topic;
        switchTopic(topic);
    });
});

document.querySelectorAll('#heart-content .hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function() {
        const part = this.dataset.part;
        showInfo(part, heartData, 'heart-info');
    });
    
    hotspot.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(74,151,130,0.3)';
    });
    
    hotspot.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.background = 'transparent';
        }
    });
});

document.querySelectorAll('#brain-content .hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function() {
        const part = this.dataset.part;
        showInfo(part, brainData, 'brain-info');
    });
    
    hotspot.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(74,151,130,0.3)';
    });
    
    hotspot.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.background = 'transparent';
        }
    });
});

// ==================== INITIALIZATION ====================

setTimeout(() => {
    const heartInfo = document.getElementById('heart-info');
    if (heartInfo) {
        console.log('Page loaded - showing default heart information');
    }
}, 500);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('='.repeat(60));
console.log('✅ Learning Page Complete - 14 Heart Parts Available');
console.log('Heart parts:', Object.keys(heartData).length);
console.log('Brain parts:', Object.keys(brainData).length);
console.log('='.repeat(60));

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});