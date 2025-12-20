// src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { translations } from '../i18n/translations';

const RegistrationPage = () => {
  const { formData, setFormData, language } = useStore();
  const navigate = useNavigate();
  const t = translations[language];

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) return language === 'uz' ? 'Bu maydon to\'ldirilishi shart' : 'Это поле обязательно';
    if (value.length < 2) return language === 'uz' ? 'Kamida 2 ta harf bo\'lishi kerak' : 'Минимум 2 буквы';
    if (!/^[a-zA-Zа-яА-ЯёЁўЎқҚғҒҳҲ\s'-]+$/.test(value)) {
      return language === 'uz' ? 'Faqat harflar kiritilishi mumkin' : 'Только буквы';
    }
    return '';
  };

  const validatePhone = (value, required = false) => {
    if (!required && !value) return '';
    if (!value.trim()) return language === 'uz' ? 'Bu maydon to\'ldirilishi shart' : 'Это поле обязательно';

    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');

    // Check if it's a valid Uzbek number (starts with 998 and has correct length)
    if (!/^998\d{9}$/.test(cleaned)) {
      return language === 'uz'
        ? 'To\'g\'ri telefon raqam kiriting (+998 XX XXX-XX-XX)'
        : 'Введите правильный номер телефона (+998 XX XXX-XX-XX)';
    }
    return '';
  };

  const validateRegion = (value) => {
    if (!value.trim()) return language === 'uz' ? 'Bu maydon to\'ldirilishi shart' : 'Это поле обязательно';
    if (value.length < 3) return language === 'uz' ? 'Kamida 3 ta harf bo\'lishi kerak' : 'Минимум 3 буквы';
    return '';
  };

  const validateSchoolNumber = (value) => {
    if (!value.trim()) return language === 'uz' ? 'Bu maydon to\'ldirilishi shart' : 'Это поле обязательно';
    if (value.length < 1) return language === 'uz' ? 'Maktab raqamini kiriting' : 'Введите номер школы';
    return '';
  };

  const validateQuestion = (value, questionNum) => {
    if (!value.trim()) return language === 'uz' ? 'Bu savolga javob bering' : 'Ответьте на этот вопрос';
    if (value.length < 3) {
      return language === 'uz'
        ? 'Kamida 3 ta belgi bo\'lishi kerak'
        : 'Минимум 3 символа';
    }
    if (value.length > 500) {
      return language === 'uz'
        ? 'Maksimum 500 ta belgi'
        : 'Максимум 500 символов';
    }
    return '';
  };

  const validateLanguageLevel = (value, fieldName) => {
    // Language levels are optional, no validation needed
    return '';
  };

  // Handle field blur (when user leaves the field)
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Validate individual field
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'first_name':
      case 'last_name':
      case 'father_name':
      case 'mother_name':
        error = validateName(value);
        break;
      case 'phone':
        error = validatePhone(value, true);
        break;
      case 'father_phone':
      case 'mother_phone':
        error = validatePhone(value, true);
        break;
      case 'region':
        error = validateRegion(value);
        break;
      case 'district':
        error = validateRegion(value);
        break;
      case 'school_number':
        error = validateSchoolNumber(value);
        break;
      case 'q1':
      case 'q2':
      case 'q3':
      case 'q4':
      case 'q5':
      case 'q6':
        error = validateQuestion(value, field);
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  // Handle input change with validation
  const handleChange = (field, value) => {
    setFormData(field, value);
    if (touched[field]) {
      validateField(field, value);
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';

    if (cleaned.startsWith('998')) {
      formatted = '+998';
      if (cleaned.length > 3) formatted += ' ' + cleaned.substring(3, 5);
      if (cleaned.length > 5) formatted += ' ' + cleaned.substring(5, 8);
      if (cleaned.length > 8) formatted += '-' + cleaned.substring(8, 10);
      if (cleaned.length > 10) formatted += '-' + cleaned.substring(10, 12);
    } else if (cleaned.length > 0) {
      formatted = '+998 ' + cleaned.substring(0, 2);
      if (cleaned.length > 2) formatted += ' ' + cleaned.substring(2, 5);
      if (cleaned.length > 5) formatted += '-' + cleaned.substring(5, 7);
      if (cleaned.length > 7) formatted += '-' + cleaned.substring(7, 9);
    } else {
      formatted = value;
    }

    return formatted;
  };

  const handlePhoneChange = (field, value) => {
    const formatted = formatPhoneNumber(value);
    setFormData(field, formatted);
    if (touched[field]) {
      validateField(field, formatted);
    }
  };

  // Validate all fields
  const validateAllFields = () => {
    const newErrors = {};
    const requiredFields = [
      'first_name', 'last_name', 'phone', 'region', 'district', 'school_number',
      'father_name', 'father_phone', 'mother_name', 'mother_phone',
      'q1', 'q2', 'q3', 'q4', 'q5', 'q6'
    ];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Mark all required fields as touched
    const newTouched = {};
    requiredFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(prev => ({ ...prev, ...newTouched }));

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateAllFields()) {
      navigate('/subjects');
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-300');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Helper to get error message
  const getError = (field) => touched[field] && errors[field] ? errors[field] : '';

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
                <label className="block font-medium text-gray-700 mb-2">
                  {t.firstName} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('first_name') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.first_name}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  onBlur={() => handleBlur('first_name')}
                  placeholder={language === 'uz' ? 'Ismingizni kiriting' : 'Введите ваше имя'}
                />
                {getError('first_name') && (
                  <p className="mt-1 text-sm text-red-600">{getError('first_name')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.lastName} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('last_name') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.last_name}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  onBlur={() => handleBlur('last_name')}
                  placeholder={language === 'uz' ? 'Familiyangizni kiriting' : 'Введите вашу фамилию'}
                />
                {getError('last_name') && (
                  <p className="mt-1 text-sm text-red-600">{getError('last_name')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.phone} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('phone') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                />
                {getError('phone') && (
                  <p className="mt-1 text-sm text-red-600">{getError('phone')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.region} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('region') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  onBlur={() => handleBlur('region')}
                  placeholder={language === 'uz' ? 'Viloyatingizni kiriting' : 'Введите вашу область'}
                />
                {getError('region') && (
                  <p className="mt-1 text-sm text-red-600">{getError('region')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.district} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('district') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  onBlur={() => handleBlur('district')}
                  placeholder={language === 'uz' ? 'Tumaningizni kiriting' : 'Введите ваш район'}
                />
                {getError('district') && (
                  <p className="mt-1 text-sm text-red-600">{getError('district')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.schoolNumber} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('school_number') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.school_number}
                  onChange={(e) => handleChange('school_number', e.target.value)}
                  onBlur={() => handleBlur('school_number')}
                  placeholder={language === 'uz' ? 'Raqamni kiriting' : 'Введите номер'}
                />
                {getError('school_number') && (
                  <p className="mt-1 text-sm text-red-600">{getError('school_number')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Parent Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">{t.parentInfoTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.fatherName} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('father_name') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.father_name}
                  onChange={(e) => handleChange('father_name', e.target.value)}
                  onBlur={() => handleBlur('father_name')}
                  placeholder={language === 'uz' ? 'Otangizning ismini kiriting' : 'Введите имя отца'}
                />
                {getError('father_name') && (
                  <p className="mt-1 text-sm text-red-600">{getError('father_name')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.fatherPhone} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('father_phone') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.father_phone}
                  onChange={(e) => handlePhoneChange('father_phone', e.target.value)}
                  onBlur={() => handleBlur('father_phone')}
                />
                {getError('father_phone') && (
                  <p className="mt-1 text-sm text-red-600">{getError('father_phone')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.motherName} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('mother_name') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.mother_name}
                  onChange={(e) => handleChange('mother_name', e.target.value)}
                  onBlur={() => handleBlur('mother_name')}
                  placeholder={language === 'uz' ? 'Onangizning ismini kiriting' : 'Введите имя матери'}
                />
                {getError('mother_name') && (
                  <p className="mt-1 text-sm text-red-600">{getError('mother_name')}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  {t.motherPhone} <span className="text-red-500">{t.required}</span>
                </label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getError('mother_phone') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData.mother_phone}
                  onChange={(e) => handlePhoneChange('mother_phone', e.target.value)}
                  onBlur={() => handleBlur('mother_phone')}
                />
                {getError('mother_phone') && (
                  <p className="mt-1 text-sm text-red-600">{getError('mother_phone')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">{t.surveyTitle}</h2>
            <p className="text-gray-600 italic">{t.surveySubtitle} <span className="text-red-500">{t.required}</span></p>

            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="space-y-2">
                <label className="block font-medium text-gray-700">
                  {num}. {t[`question${num}`]} <span className="text-red-500">{t.required}</span>
                </label>
                <textarea
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${getError(`q${num}`) ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  value={formData[`q${num}`]}
                  onChange={(e) => handleChange(`q${num}`, e.target.value)}
                  onBlur={() => handleBlur(`q${num}`)}
                  placeholder={language === 'uz' ? 'Javobingizni yozing...' : 'Напишите ваш ответ...'}
                  maxLength="500"
                />
                <div className="flex justify-between items-center">
                  {getError(`q${num}`) && (
                    <p className="text-sm text-red-600">{getError(`q${num}`)}</p>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData[`q${num}`]?.length || 0}/500
                  </p>
                </div>
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
              <span className="text-red-500">{t.required}</span> {t.requiredNote}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;