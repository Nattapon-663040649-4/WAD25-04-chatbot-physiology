// ==================== LEARNING PAGE INTERACTIVE SCRIPT ====================
console.log('Learning Page Initialized');

// ==================== COMPREHENSIVE DATA ====================

const heartData = {
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
    septum: {
        name: 'Interventricular Septum',
        nameThai: 'ผนังกั้นหัวใจ',
        description: 'The interventricular septum is a thick muscular wall separating the left and right ventricles, preventing mixing of oxygenated and deoxygenated blood. It contains part of the cardiac conduction system.',
        functions: [
            'Separates the left and right ventricles anatomically and functionally',
            'Prevents mixing of oxygen-rich and oxygen-poor blood',
            'Contains conducting tissue including the bundle of His and bundle branches',
            'Contributes to ventricular contraction through coordinated septal movement',
            'Provides structural support to maintain ventricular geometry'
        ],
        clinicalNote: 'Ventricular septal defects (VSDs) are congenital heart defects allowing abnormal blood flow between ventricles.'
    },
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

// Switch between topics
function switchTopic(topic) {
    console.log('Switching to topic:', topic);
    
    // Update tabs
    document.querySelectorAll('.topic-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.topic-tab').classList.add('active');
    
    // Update content
    document.querySelectorAll('.topic-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${topic}-content`).classList.add('active');
    
    // Reset any active hotspots
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.classList.remove('active');
    });
}

// Show detailed information for selected part
function showInfo(part, data, infoElementId) {
    console.log('Showing info for:', part);
    
    const infoCard = document.getElementById(infoElementId);
    const infoContent = infoCard.querySelector('.info-content');
    
    const partData = data[part];
    if (!partData) {
        console.warn('No data found for part:', part);
        return;
    }
    
    // Build HTML content
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
    
    // Animate card
    infoCard.style.animation = 'none';
    setTimeout(() => {
        infoCard.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
    
    // Highlight active hotspot
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.classList.remove('active');
    });
    document.querySelector(`.hotspot[data-part="${part}"]`)?.classList.add('active');
}

// ==================== EVENT LISTENERS ====================

// Topic tab switching
document.querySelectorAll('.topic-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const topic = this.dataset.topic;
        switchTopic(topic);
    });
});

// Heart diagram hotspots
document.querySelectorAll('#heart-content .hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function() {
        const part = this.dataset.part;
        showInfo(part, heartData, 'heart-info');
    });
    
    // Add hover effect
    hotspot.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(74,151,130,0.3)';
    });
    
    hotspot.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.background = 'transparent';
        }
    });
});

// Brain diagram hotspots
document.querySelectorAll('#brain-content .hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function() {
        const part = this.dataset.part;
        showInfo(part, brainData, 'brain-info');
    });
    
    // Add hover effect
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

// Show default info on page load
setTimeout(() => {
    // Show general heart info first
    const heartInfo = document.getElementById('heart-info');
    if (heartInfo) {
        console.log('Page loaded - showing default heart information');
    }
}, 500);

// Smooth scrolling for internal links
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

// Log initialization
console.log('='.repeat(60));
console.log('Learning Page Interactive Features Initialized');
console.log('Heart parts available:', Object.keys(heartData).length);
console.log('Brain parts available:', Object.keys(brainData).length);
console.log('='.repeat(60));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Improve keyboard navigation visibility
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});