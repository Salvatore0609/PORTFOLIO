import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { useTranslations } from '../../i18n/utils';

const Timezone = ({ timezone, lang = 'it' }: any) => {
  const [dateTime, setDateTime] = useState('');
  // Per React, dobbiamo passare la lingua come prop o usare un hook globale.
  // Prendiamo la lingua dal tag html o da localStorage? Per semplicità passiamola come prop.
  // Ma meglio: leggiamo da window.__LANG__ impostato dal middleware? 
  // In alternativa, usiamo una prop. Aggiungiamo `lang` come prop.
  // Nel componente astro passeremo lang.
  const t = useTranslations(lang);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().tz(timezone);
      setDateTime(now.format('dddd, DD MMMM YYYY [a] h:mm:ss A'));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div>
      <p>{dateTime}</p>
      <p className="text-sm text-gray-500">{t('timezone.city')}</p>
    </div>
  );
};

export default Timezone;