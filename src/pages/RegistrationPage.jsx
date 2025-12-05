// src/pages/RegistrationPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { translations } from '../i18n/translations';

const RegistrationPage = () => {
  const { formData, setFormData, completeRegistration, language } = useStore();
  const navigate = useNavigate();
  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (completeRegistration()) {
      navigate('/subjects');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {t.registrationTitle}
          </h1>
          <p className="text-gray-700 italic">
            {t.registrationSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">{t.personalInfoTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.firstName} {t.required}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.first_name}
                  onChange={(e) => setFormData('first_name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.lastName} {t.required}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.last_name}
                  onChange={(e) => setFormData('last_name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.phone}</label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData('phone', e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.region} {t.required}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.region}
                  onChange={(e) => setFormData('region', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.district}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.district}
                  onChange={(e) => setFormData('district', e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.schoolNumber} {t.required}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.school_number}
                  onChange={(e) => setFormData('school_number', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Parent Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">{t.parentInfoTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.fatherName}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.father_name}
                  onChange={(e) => setFormData('father_name', e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.fatherPhone}</label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.father_phone}
                  onChange={(e) => setFormData('father_phone', e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.motherName}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.mother_name}
                  onChange={(e) => setFormData('mother_name', e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">{t.motherPhone}</label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.mother_phone}
                  onChange={(e) => setFormData('mother_phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">{t.surveyTitle}</h2>
            <p className="text-gray-600 italic">{t.surveySubtitle} {t.required}</p>

            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="space-y-2">
                <label className="block font-medium text-gray-700">
                  {num}. {t[`question${num}`]} {t.required}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData[`q${num}`]}
                  onChange={(e) => setFormData(`q${num}`, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          {/* Language Proficiency */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">{t.languageProficiency}</h2>

            <div className="space-y-4">
              {['english_level', 'russian_level'].map((languageLevel) => (
                <div key={languageLevel} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">
                    {languageLevel === 'english_level' ? t.englishLevel : t.russianLevel}
                  </span>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {['none', 'medium', 'good'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={languageLevel}
                          value={level}
                          checked={formData[languageLevel] === level}
                          onChange={(e) => setFormData(languageLevel, e.target.value)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-gray-700">
                          {level === 'none' ? t.levelNone :
                            level === 'medium' ? t.levelMedium : t.levelGood}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg shadow-md hover:shadow-lg transition-all"
            >
              {t.nextToSubjects}
            </button>
            <p className="text-gray-600 text-sm mt-4">
              {t.required} {t.requiredNote}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;