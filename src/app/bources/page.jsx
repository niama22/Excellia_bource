"use client";

import React, { useState } from 'react';
import { FaSearch, FaDownload, FaUniversity, FaArrowLeft, FaEye, FaUserFriends, FaPaperPlane } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';
import { FaUsers, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const Bource = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('list');
  const [selectedBourse, setSelectedBourse] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [placesFilter, setPlacesFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  const mockBourses = [
    {
      id: 1,
      title: "Bourse d'excellence Eiffel",
      university: "Université de Paris",
      description: "Cette bourse prestigieuse est destinée aux étudiants internationaux souhaitant poursuivre leurs études supérieures en France.",
      places: "50 places disponibles",
      startDate: "1er septembre 2025",
      deadline: "30 septembre 2025",
      amount: "1 181 € / mois",
      duration: "12 à 24 mois pour un Master, 36 mois pour un Doctorat",
      pdfLink: "/images/conditions-bourse-1.pdf",
      requiredDocuments: ["CV", "Lettre de motivation", "Relevés de notes"],
      eligibilityCriteria: {
        highSchoolGraduationDate: "1er juin 2023",
        age: "Moins de 30 ans",
        financialLevel: "Situation financière stable",
        grades: "Moyenne minimum de 14/20",
        fieldOfStudy: "Sciences, Économie, Droit",
        schoolLevel: "Bac +3 minimum",
        repeatedYear: false,
      },
    },
    {
      id: 2,
      title: "Bourse Fulbright",
      university: "Harvard University",
      description: "Programme d'échanges éducatifs pour renforcer les relations entre les États-Unis et d'autres pays.",
      places: "25 places disponibles",
      startDate: "15 août 2025",
      deadline: "30 septembre 2025",
      amount: "Jusqu'à 30 000 $ par an",
      duration: "1 à 2 ans",
      pdfLink: "/images/conditions-bourse-2.pdf",
      requiredDocuments: ["Relevés de notes", "Lettre de recommandation", "Essai personnel"],
      eligibilityCriteria: {
        highSchoolGraduationDate: "1er juin 2022",
        age: "Moins de 35 ans",
        financialLevel: "Aide financière nécessaire",
        grades: "Moyenne minimum de 15/20",
        fieldOfStudy: "Tous les domaines",
        schoolLevel: "Bac +4 minimum",
        repeatedYear: false,
      },
    },
    {
      id: 3,
      title: "Bourse Chevening",
      university: "DAAD (Allemagne)",
      description: "Programme international de bourses pour futurs leaders.",
      places: "30 places disponibles",
      startDate: "10 juillet 2025",
      deadline: "30 septembre 2025",
      amount: "1 800 £ / mois + frais de scolarité couverts",
      duration: "1 an",
      pdfLink: "/images/conditions-bourse-3.pdf",
      requiredDocuments: ["CV", "Lettre de motivation", "Documents d'identité", "Preuve d’expérience professionnelle"],
      eligibilityCriteria: {
        highSchoolGraduationDate: "1er juin 2021",
        age: "Moins de 40 ans",
        financialLevel: "Situation financière stable",
        grades: "Moyenne minimum de 13/20",
        fieldOfStudy: "Tous les domaines",
        schoolLevel: "Bac +3 minimum",
        repeatedYear: true,
      },
    },
  ];

  const handleBourseSelect = (bourse) => {
    setSelectedBourse(bourse);
    setActiveView('detail');
    setShowPdf(false);
  };

  const filteredBourses = mockBourses.filter(bourse => {
    const matchesSearchTerm =
      searchTerm === '' ||
      bourse.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bourse.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlacesFilter = placesFilter === '' || bourse.places.includes(placesFilter);
    const matchesDurationFilter = durationFilter === '' || bourse.duration.includes(durationFilter);
    const matchesAmountFilter = amountFilter === '' || bourse.amount.includes(amountFilter);

    return matchesSearchTerm && matchesPlacesFilter && matchesDurationFilter && matchesAmountFilter;
  });

  const handleBackToList = () => {
    setActiveView('list');
    setShowPdf(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navLinks}>
          <a 
            href="#" 
            className={activeView === 'list' ? styles.active : ''} 
            onClick={handleBackToList}
          >
            Liste des bourses
          </a>
          <a 
            href="#" 
            className={activeView === 'myApplications' ? styles.active : ''} 
            onClick={() => {
              setActiveView('myApplications');
              setShowPdf(false);
            }}
          >
            Mes Bourses
          </a>
          {selectedBourse && (
            <a 
              href="#" 
              className={activeView === 'detail' ? styles.active : ''} 
              onClick={() => setActiveView('detail')}
            >
              Détails de la bourse
            </a>
          )}
        </div>
        <div className={styles.header}>
          {activeView === 'list' && (
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Rechercher par nom ou université"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <FaSearch />
              </button>
            </div>
          )}
        </div>
        {activeView === 'list' && (
          <div className={styles.filters}>
            <div className={styles.filter}>
              <FaUsers className={styles.filterIcon} />
              <select onChange={(e) => setPlacesFilter(e.target.value)} value={placesFilter}>
                <option value="">Nombre de places</option>
                <option value="50">50</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </div>

            <div className={styles.filter}>
              <FaClock className={styles.filterIcon} />
              <select onChange={(e) => setDurationFilter(e.target.value)} value={durationFilter}>
                <option value="">Durée</option>
                <option value="12">12 mois</option>
                <option value="24">24 mois</option>
                <option value="36">36 mois</option>
              </select>
            </div>

            <div className={styles.filter}>
              <FaMoneyBillWave className={styles.filterIcon} />
              <select onChange={(e) => setAmountFilter(e.target.value)} value={amountFilter}>
                <option value="">Montant</option>
                <option value="1181">1,181 €</option>
                <option value="30000">30,000 $</option>
                <option value="1800">1,800 £</option>
              </select>
            </div>
          </div>
        )}
        {activeView === 'list' ? (
          <div className={styles.bourseListContainer}>
            <div className={styles.bourseListHeader}>
              <h2>Bourses disponibles</h2>
              <span className={styles.bourseCount}>{filteredBourses.length} bourses trouvées</span>
            </div>

            <div className={styles.bourseGrid}>
              {filteredBourses.map((bourse) => (
                <div key={bourse.id} className={styles.bourseCard}>
                  <div className={styles.universityLabel}>
                    <FaUniversity className={styles.universityIcon} />
                    <span>{bourse.university}</span>
                  </div>
                  <h3>{bourse.title}</h3>
                  <p className={styles.bourseDescription}>{bourse.description}</p>
                  <div className={styles.placesInfo}>
                    <FaUserFriends />
                    <span>{bourse.places}</span>
                  </div>
                  <div className={styles.deadline}>
                    <span>Date limite: {bourse.deadline}</span>
                  </div>
                  <div className={styles.bourseActions}>
                    <button 
                      className={styles.detailsButton} 
                      onClick={() => handleBourseSelect(bourse)}
                    >
                      En savoir plus
                    </button>
                    <a 
                      href={bourse.pdfLink} 
                      className={styles.downloadLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaDownload /> Télécharger
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredBourses.length === 0 && (
              <div className={styles.noResults}>
                <p>Aucune bourse trouvée. Veuillez modifier votre recherche.</p>
              </div>
            )}
          </div>
        ) : (
          selectedBourse && (
            <div className={styles.bourseDetail}>
              <div className={styles.bourseDetailHeader}>
                <h2>{selectedBourse.title}</h2>
                <div className={styles.universityDetail}>
                  <FaUniversity />
                  <span>{selectedBourse.university}</span>
                </div>
              </div>
              
              <div className={styles.detailSections}>
                <div className={`${styles.detailSection} ${styles.descriptionSection}`}>
                  <h3>Description</h3>
                  <p>{selectedBourse.description}</p>
                </div>
                
                <div className={`${styles.detailSection} ${styles.placesSection}`}>
                  <h3>Nombre de places</h3>
                  <p><FaUserFriends className={styles.placesIcon} /> {selectedBourse.places}</p>
                </div>
                
                <div className={`${styles.detailSection} ${styles.deadlineSection}`}>
                  <h3>Date limite</h3>
                  <p>{selectedBourse.deadline}</p>
                </div>

                <div className={`${styles.detailSection} ${styles.amountSection}`}>
                  <h3>Montant</h3>
                  <p>{selectedBourse.amount}</p>
                </div>

                <div className={`${styles.detailSection} ${styles.durationSection}`}>
                  <h3>Durée</h3>
                  <p>{selectedBourse.duration}</p>
                </div>
              </div>
              
              <div className={styles.pdfViewerContainer}>
                <h3>Documents et critères d'éligibilité</h3>
                <p>Veuillez consulter le PDF pour les critères d'éligibilité, les documents requis et le processus de sélection complet.</p>
                <div className={styles.pdfActions}>
                  <button
                    className={styles.viewPdfButton}
                    onClick={() => setShowPdf(!showPdf)}
                  >
                    <FaEye /> {showPdf ? 'Masquer PDF' : 'Voir PDF'}
                  </button>
                  <a
                    href={selectedBourse.pdfLink}
                    className={styles.downloadLink}
                    download
                  >
                    <FaDownload /> Télécharger le PDF
                  </a>
                </div>
                {showPdf && (
                  <iframe
                    className={styles.pdfFrame}
                    src={selectedBourse.pdfLink}
                    width="100%"
                    height="600px"
                    title="PDF Viewer"
                  />
                )}
              </div>
              
              <Link href={`/bources/${selectedBourse.id}/postuler`} passHref>
                <button className={styles.applyButton}>
                  <FaPaperPlane /> Postuler maintenant
                </button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Bource;