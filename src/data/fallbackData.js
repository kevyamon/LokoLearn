// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/data/fallbackData.js

export const FALLBACK_SUBJECTS = [
  { name: "Algorithmique" },
  { name: "Base de données (SQL/NoSQL)" },
  { name: "Développement Web" },
  { name: "Mathématiques Générales" },
  { name: "Comptabilité" },
  { name: "Droit" },
  { name: "Marketing Digital" },
  { name: "Anglais Technique" },
  { name: "Communication" },
  { name: "Réseaux & Télécoms" },
  { name: "Physique / Chimie" },
  { name: "Biologie / Microbiologie" }
];

export const FALLBACK_FILIERES = [
  // ================= BTS (Niveaux BTS1, BTS2) =================
  // Pôle Tertiaire
  { name: "Gestion Commerciale (GC)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Finance Assurance (FA)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Tourisme Hôtellerie", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Logistique (LOG)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Finance Comptabilité et Gestion d'Entreprises (FCGE)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Ressources Humaines et Communication (RHC)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Assistanat de Direction (AD)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Gestion des Collectivités Territoriales", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  
  // Pôle Industriel
  { name: "Informatique Développeur d'Application (IDA)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Réseaux Informatiques et Télécoms (RIT)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Mines Géologie Pétrole", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Génie Civil : Option Bâtiment", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Agriculture Tropicale : Prod. Végétale", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Agriculture Tropicale : Prod. Animale", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Communication Visuelle", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Gestion de l'Environnement et Ressources Naturelles", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Maintenance des Systèmes de Production", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Electrotechnique", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Maintenance Systèmes Electroniques et Info.", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Industries Agro-alim. et Chimiques (Contrôle)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Industries Agro-alim. et Chimiques (Production)", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Génie Energétique et Environnement", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Cosmétologie", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Optique-Lunetterie", type: 'BTS', levels: ['BTS1', 'BTS2'] },
  { name: "Art, Aménagement et Cadre de Vie", type: 'BTS', levels: ['BTS1', 'BTS2'] },

  // ================= LMD : Géologie, Mines, Pétrole (GMPE) =================
  { name: "Tronc Commun GMPE (L1/L2)", type: 'LMD', levels: ['L1', 'L2'] },
  { name: "Sciences de la terre des Ressources Minérales (STRM)", type: 'LMD', levels: ['L3'] },
  { name: "Eau et Gestion de l'Environnement (EGE)", type: 'LMD', levels: ['L3'] },
  { name: "Génie Minier et Métallogénie (GMM)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Assainissement et Génie Sanitaire (AGS)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Pétrole et Génie du Raffinage (PGR)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Géorisques et Génie de l'Environnement (GGE)", type: 'LMD', levels: ['M1', 'M2'] },

  // ================= LMD : Génie Civil (GCV) =================
  { name: "Tronc Commun Génie Civil (L1/L2)", type: 'LMD', levels: ['L1', 'L2'] },
  { name: "Sciences et Techniques Bâtiment (STB)", type: 'LMD', levels: ['L3', 'M1', 'M2'] },

  // ================= LMD : Industrie Agro-Alimentaire (IAA) =================
  { name: "Tronc Commun IAA (L1/L2)", type: 'LMD', levels: ['L1', 'L2'] },
  { name: "Génie des Bio-productions Agro-alimentaires (GBPAA)", type: 'LMD', levels: ['L3'] },
  { name: "Sécurité Sanitaire des Aliments (SSA)", type: 'LMD', levels: ['L3'] },
  { name: "Maîtrise/Management Qualité IAA (MMQIAA)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Ingénierie des Produits et Procédés (IPP)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Gestion Risques Chimiques/Biologiques (GRCBE)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Microbiologie", type: 'LMD', levels: ['M2'] },

  // ================= LMD : Info, Com & RH (IC-RH) =================
  { name: "Tronc Commun IC-RH (L1/L2)", type: 'LMD', levels: ['L1', 'L2'] },
  { name: "Journalisme-Production/Multimédia (JPM)", type: 'LMD', levels: ['L3', 'M1', 'M2'] },
  { name: "Marketing-Publicité (MP)", type: 'LMD', levels: ['L3', 'M1', 'M2'] },
  { name: "GRH et Management des Organisations (GRHMO)", type: 'LMD', levels: ['L3', 'M1', 'M2'] },
  { name: "Communication Politique (CP)", type: 'LMD', levels: ['M1'] },

  // ================= LMD : Info, Télécoms, Elec (ITER) =================
  { name: "Tronc Commun ITER (L1/L2)", type: 'LMD', levels: ['L1', 'L2'] },
  { name: "Informatique (Générale)", type: 'LMD', levels: ['L3'] },
  { name: "Informatique-Microélectronique (IM)", type: 'LMD', levels: ['L3'] },
  { name: "Electronique-Electrotechnique Automatisme (EEA)", type: 'LMD', levels: ['L3'] },
  { name: "Génie Electrique (GE)", type: 'LMD', levels: ['L3'] },
  
  { name: "Informatique & Télécommunications", type: 'LMD', levels: ['M1'] },
  { name: "Systèmes Distribués (DS)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Multimédia, BDD et Intégration (MBDIS)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Electronique Embarquée & Télécom (ESET)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Conversion Energie, Syst. Electriques (CESE)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Master Informatique et Télécommunication (MIT)", type: 'LMD', levels: ['M1'] },
  { name: "Réseaux", type: 'LMD', levels: ['M2'] },

  // ================= LMD : Sciences Eco & Gestion (SEG) =================
  { name: "Tronc Commun SEG (L1/L2)", type: 'LMD', levels: ['L1', 'L2'] },
  { name: "Marketing Management (MM)", type: 'LMD', levels: ['L3', 'M1', 'M2'] },
  { name: "Comptabilité Contrôle et Audit (CCA)", type: 'LMD', levels: ['L3', 'M1', 'M2'] },
  { name: "Ingénierie Marketing (IM)", type: 'LMD', levels: ['M1', 'M2'] },
  { name: "Management de Projet (MP)", type: 'LMD', levels: ['M1', 'M2'] },

  // ================= LMD : Production Végétale et Animale (PVA) =================
  { name: "Tronc Commun PVA", type: 'LMD', levels: ['L1', 'L2'] },
  { name: "Production Végétale et Animale", type: 'LMD', levels: ['L3', 'M1', 'M2'] },
];