"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaPaperPlane, FaUniversity, FaFileUpload, FaUser } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

const ApplicationForm = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [bourse, setBourse] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    cne: '',
    documents: null,
  });

  useEffect(() => {
    const mockBourses = [
      {
        id: 1,
        title: "Bourse d'excellence Eiffel",
        university: "Université de Paris",
        requiredDocuments: ["CV", "Lettre de motivation", "Relevés de notes"],
        eligibilityCriteria: [
          { label: "Date d'obtention du bac", type: "date", key: "highSchoolGraduationDate" },
          { label: "Âge", type: "number", key: "age" },
          { label: "Niveau financier", type: "text", key: "financialLevel" },
          { label: "Note", type: "text", key: "grades" },
          { label: "Filière", type: "text", key: "fieldOfStudy" },
          { label: "Niveau scolaire", type: "text", key: "schoolLevel" },
          { label: "Redoublant", type: "select", key: "repeatedYear", options: ["Non", "Oui"] },
        ],
      },
      {
        id: 2,
        title: "Bourse Fulbright",
        university: "Harvard University",
        requiredDocuments: ["Relevés de notes", "Lettre de recommandation"],
        eligibilityCriteria: [
          { label: "Date d'obtention du bac", type: "date", key: "highSchoolGraduationDate" },
          { label: "Âge", type: "number", key: "age" },
          { label: "Niveau financier", type: "text", key: "financialLevel" },
        ],
      },
      {
        id: 3,
        title: "Bourse Chevening",
        university: "DAAD (Allemagne)",
        requiredDocuments: ["CV", "Lettre de motivation", "Documents d'identité"],
        eligibilityCriteria: [
          { label: "Date d'obtention du bac", type: "date", key: "highSchoolGraduationDate" },
          { label: "Âge", type: "number", key: "age" },
          { label: "Niveau financier", type: "text", key: "financialLevel" },
          { label: "Filière", type: "text", key: "fieldOfStudy" },
        ],
      },
    ];

    const foundBourse = mockBourses.find(b => b.id === parseInt(id));
    setBourse(foundBourse);
  }, [id]);



  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    console.log('Candidature soumise:', applicationData);
    alert('Votre candidature a été soumise avec succès!');

    // Add the application to the user's applications
    // Assuming you have a function to update the applications
    updateUserApplications(bourse); // Add the current bourse to the user's applications

    router.push('/bourses');
};
  const handleChange = (key, value) => {
    setApplicationData({ ...applicationData, [key]: value });
  };

  if (!bourse) {
    return <div className={styles.container}>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.applicationPageHeader}>
          <Link href="/bources" className={styles.backLink}>
            <FaArrowLeft /> Retour aux bourses
          </Link>
          <h1>Candidature pour {bourse.title}</h1>
          <div className={styles.universityDetail}>
            <FaUniversity />
            <span>{bourse.university}</span>
          </div>
        </div>

        <div className={styles.applicationFormContainer}>
          <h2>Formulaire de candidature</h2>
          <p className={styles.applicationDescription}>
            Veuillez remplir le formulaire ci-dessous pour postuler à cette bourse. 
            Assurez-vous de fournir tous les documents requis dans un fichier ZIP.
          </p>

          <form onSubmit={handleApplicationSubmit} className={styles.applicationForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name"><FaUser /> Nom complet:</label>
              <input
                type="text"
                id="name"
                value={applicationData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email"><FaUser /> Email:</label>
              <input
                type="email"
                id="email"
                value={applicationData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cne"><FaUser /> CNE:</label>
              <input
                type="text"
                id="cne"
                value={applicationData.cne}
                onChange={(e) => handleChange("cne", e.target.value)}
                required
                className={styles.formInput}
              />
            </div>

            {/* Dynamic eligibility criteria fields */}
            {bourse.eligibilityCriteria.map((criterion, index) => (
              <div key={index} className={styles.formGroup}>
                <label htmlFor={criterion.key}>{criterion.label}:</label>
                {criterion.type === "select" ? (
                  <select
                    id={criterion.key}
                    onChange={(e) => handleChange(criterion.key, e.target.value)}
                    required
                    className={styles.formInput}
                  >
                    {criterion.options.map((option, idx) => (
                      <option key={idx} value={option === "Oui"}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={criterion.type}
                    id={criterion.key}
                    value={applicationData[criterion.key] || ''}
                    onChange={(e) => handleChange(criterion.key, e.target.value)}
                    required
                    className={styles.formInput}
                  />
                )}
              </div>
            ))}

            <div className={styles.formGroup}>
              <label htmlFor="documents"><FaFileUpload /> Documents requis:</label>
              <div className={styles.documentsRequired}>
                <h4>Documents nécessaires pour cette bourse:</h4>
                <ul>
                  {bourse.requiredDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
                <p>Veuillez fournir tous les documents dans un seul fichier ZIP.</p>
              </div>
              <input
                type="file"
                id="documents"
                onChange={(e) => handleChange("documents", e.target.files[0])}
                required
                className={styles.formInput}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              <FaPaperPlane /> Soumettre ma candidature
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;